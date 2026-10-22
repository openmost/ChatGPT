/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { MAX_EXPANDED_SUBTABLES, readReportState, WIDGET_ATTRIBUTE } from './reportState';

const controls = new Map<Element, { param: Record<string, unknown> }>();

function mountWidget(html: string): { trigger: Element, table: Element } {
  document.body.innerHTML = `<div ${WIDGET_ATTRIBUTE}><div class="trigger"></div>${html}</div>`;
  return {
    trigger: document.querySelector('.trigger')!,
    table: document.querySelector('div.dataTable:not(.subDataTable)')!,
  };
}

describe('readReportState', () => {
  beforeEach(() => {
    (window as unknown as { $: unknown }).$ = (element: Element) => ({
      data: (key: string) => (key === 'uiControlObject' ? controls.get(element) : undefined),
    });
  });

  afterEach(() => {
    controls.clear();
    document.body.innerHTML = '';
    delete (window as unknown as { $?: unknown }).$;
  });

  it('reads the search, sort and flattening of the table', () => {
    const { trigger, table } = mountWidget('<div class="dataTable"><table></table></div>');
    controls.set(table, {
      param: {
        filter_column: 'label',
        filter_pattern: 'spring',
        filter_sort_column: 'nb_visits',
        filter_sort_order: 'desc',
        flat: 0,
        filter_limit: 10,
        filter_offset: 20,
        filter_pattern_recursive: '',
      },
    });

    expect(readReportState(trigger)).toEqual({
      filter_column: 'label',
      filter_pattern: 'spring',
      filter_sort_column: 'nb_visits',
      filter_sort_order: 'desc',
      flat: 0,
    });
  });

  it('lists the expanded rows that are shown, up to the cap', () => {
    const rows = Array.from(
      { length: MAX_EXPANDED_SUBTABLES + 2 },
      (_, index) => `<tr class="subDataTable expanded" id="${index + 10}"></tr>`,
    ).join('');
    const { trigger } = mountWidget(`<div class="dataTable"><table><tbody>
      <tr class="subDataTable expanded" id="3"></tr>
      <tr class="subDataTable" id="4"></tr>
      <tr class="subDataTableContainer" style="display: none"><td>
        <div class="dataTable subDataTable"><table><tbody>
          <tr class="subDataTable expanded" id="5"></tr>
        </tbody></table></div>
      </td></tr>
      ${rows}
    </tbody></table></div>`);

    expect(readReportState(trigger).expandedSubtables).toEqual([3, 10, 11, 12, 13]);
  });

  it('returns nothing outside a widget or without a table', () => {
    document.body.innerHTML = '<div class="trigger"></div>';
    expect(readReportState(document.querySelector('.trigger')!)).toEqual({});

    const { trigger } = mountWidget('<div class="sparklines"></div>');
    expect(readReportState(trigger)).toEqual({});
  });
});
