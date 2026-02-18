import { MENU_CODES, type MenuCode } from '../data/types';
import { getRecipe } from '../lib/data';
import { clearSelectedMenus, getSelectedMenus, removeSelectedMenu } from '../lib/storage';
import { escapeHtml } from '../lib/utils';

function renderRemoveIcon(): string {
  return `
    <svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 7h12" />
      <path d="M9 7V5h6v2" />
      <path d="M8 7l1 12h6l1-12" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  `;
}

function renderCartItems(selectedMenus: MenuCode[]): string {
  if (selectedMenus.length === 0) {
    return `
      <div class="shopping-empty-state">
        <p>Cart kosong. Tambah menu dari halaman Menu.</p>
        <a class="btn btn-primary" href="#/plan">Buka Menu</a>
      </div>
    `;
  }

  const itemsMarkup = selectedMenus
    .map((code) => {
      const recipe = getRecipe(code);
      const title = recipe?.title ?? `Menu ${code}`;

      return `
        <article class="cart-item">
          <div class="cart-item-main">
            <span class="menu-code-chip">${escapeHtml(code)}</span>
            <h2 class="cart-item-title">${escapeHtml(title)}</h2>
          </div>
          <div class="cart-item-actions">
            <a class="btn btn-secondary cart-open-btn" href="#/recipes/${encodeURIComponent(code)}">Buka</a>
            <button
              type="button"
              class="icon-btn cart-remove-btn"
              data-remove-menu="${escapeHtml(code)}"
              aria-label="Buang ${escapeHtml(code)} dari cart"
            >
              ${renderRemoveIcon()}
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  return `<div class="cart-list">${itemsMarkup}</div>`;
}

export function renderCartPage(): string {
  const selectedMenus = getSelectedMenus();
  const hasItems = selectedMenus.length > 0;

  return `
    <section class="page-card cart-page" data-cart-page>
      <h1>Cart</h1>
      <p class="shopping-line">${hasItems ? `${selectedMenus.length} menu dipilih` : 'Belum ada menu dipilih'}</p>
      <div class="pill-row" aria-label="Ringkasan cart">
        <span class="pill is-accent">Menu: ${selectedMenus.length}</span>
      </div>

      <div class="cart-actions">
        <button
          type="button"
          class="btn btn-secondary"
          data-cart-action="clear-all"
          ${hasItems ? '' : 'disabled'}
        >
          Clear
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-cart-action="go-checkout"
          ${hasItems ? '' : 'disabled'}
        >
          Checkout
        </button>
      </div>

      ${renderCartItems(selectedMenus)}
    </section>
  `;
}

function isMenuCode(value: string): value is MenuCode {
  return MENU_CODES.includes(value as MenuCode);
}

function rerenderCartPage(container: HTMLElement): void {
  container.innerHTML = renderCartPage();
  setupCartPageInteractions(container);
}

export function setupCartPageInteractions(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>('[data-remove-menu]').forEach((button) => {
    button.addEventListener('click', () => {
      const menuCode = button.dataset.removeMenu;

      if (!menuCode || !isMenuCode(menuCode)) {
        return;
      }

      removeSelectedMenu(menuCode);
      rerenderCartPage(container);
    });
  });

  container.querySelectorAll<HTMLButtonElement>('[data-cart-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.cartAction;

      if (action === 'clear-all') {
        clearSelectedMenus();
        rerenderCartPage(container);
        return;
      }

      if (action === 'go-checkout') {
        window.location.hash = '/checkout';
      }
    });
  });
}
