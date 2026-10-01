/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// A dark theme plugin such as DarkTheme sets dark values in the Matomo theme variables while
// [data-theme-mode] stays "light": CSS cannot tell, so the page gets this class when the surface
// the chat sits on is dark, and theme.less applies its dark tokens.
export const DARK_SURFACE_CLASS = 'ai-chat-dark-surface';

let watching = false;

function isSurfaceDark(): boolean {
  const probe = document.createElement('span');
  probe.style.color = 'var(--theme-color-background-contrast)';
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const channels = (window.getComputedStyle(probe).color.match(/[\d.]+/g) || []).map(Number);
  probe.remove();

  if (channels.length < 3) {
    return false;
  }
  const [red, green, blue] = channels;
  return (0.299 * red + 0.587 * green + 0.114 * blue) / 255 < 0.5;
}

function updateDarkSurface(): void {
  document.documentElement.classList.toggle(DARK_SURFACE_CLASS, isSurfaceDark());
}

/**
 * Checks the surface once per page, and again when the automatic theme mode follows the system.
 */
export default function watchDarkSurface(): void {
  if (watching || typeof window === 'undefined' || !document.body) {
    return;
  }
  watching = true;
  updateDarkSurface();

  if (typeof window.matchMedia === 'function') {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', updateDarkSurface);
    }
  }
}
