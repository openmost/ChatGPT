/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// The widget parameters only describe the report as first loaded: the search, sort, flattening
// and expanded rows change in the DataTable afterwards, so they are read when an insight is asked.

// set by assets/js/app.js on the element of each widget with an insight trigger
export const WIDGET_ATTRIBUTE = 'data-ai-insight-widget';

export const MAX_EXPANDED_SUBTABLES = 5;

const TABLE_PARAMS = [
  'filter_column',
  'filter_pattern',
  'filter_column_recursive',
  'filter_pattern_recursive',
  'filter_sort_column',
  'filter_sort_order',
  'flat',
];

interface DataTableControl {
  param?: Record<string, unknown>;
}

interface JQueryLike {
  (element: Element): { data(key: string): unknown };
}

// a collapsed row only hides its subtable container, the rows inside keep their expanded class
function isShown(row: Element, table: Element): boolean {
  let node: Element | null = row.parentElement;
  while (node && node !== table) {
    if (node instanceof HTMLElement && node.style.display === 'none') {
      return false;
    }
    node = node.parentElement;
  }
  return true;
}

export function readReportState(trigger: Element): Record<string, unknown> {
  const widget = trigger.closest(`[${WIDGET_ATTRIBUTE}]`);
  const table = widget?.querySelector('div.dataTable:not(.subDataTable)');
  if (!table) {
    return {};
  }

  const state: Record<string, unknown> = {};
  const jquery = (window as unknown as { $?: JQueryLike }).$;
  const control = jquery
    ? jquery(table).data('uiControlObject') as DataTableControl | undefined
    : undefined;
  TABLE_PARAMS.forEach((name) => {
    const value = control?.param?.[name];
    if ((typeof value === 'string' && value !== '') || typeof value === 'number') {
      state[name] = value;
    }
  });

  const expanded = Array.from(table.querySelectorAll('tr.subDataTable.expanded'))
    .filter((row) => isShown(row, table))
    .map((row) => row.id)
    .filter((id) => /^\d+$/.test(id))
    .map(Number)
    .slice(0, MAX_EXPANDED_SUBTABLES);
  if (expanded.length) {
    state.expandedSubtables = expanded;
  }

  return state;
}
