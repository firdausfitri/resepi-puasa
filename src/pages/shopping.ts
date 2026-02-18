import type { Ingredient, MenuCode } from '../data/types';
import { MENU_CODES } from '../data/types';
import { getIngredientsForMenus, groupIngredientsByCategory } from '../lib/data';
import {
  clearCheckedIngredients,
  getCheckedIngredientMap,
  getSelectedMenus,
  setSelectedMenus,
  toggleCheckedIngredient,
} from '../lib/storage';
import { escapeHtml } from '../lib/utils';

let showUncheckedOnly = false;

interface ShoppingGroup {
  category: string;
  ingredients: Ingredient[];
}

interface ShoppingViewData {
  selectedMenus: MenuCode[];
  checkedMap: Record<string, boolean>;
  groupedIngredients: ShoppingGroup[];
  totalIngredientsCount: number;
  checkedIngredientsCount: number;
}

interface RerenderOptions {
  toggledIngredientId?: string;
  toggledCheckedState?: boolean;
}

function normalizeSelectedMenus(menus: MenuCode[]): MenuCode[] {
  const selectedSet = new Set(menus);
  return MENU_CODES.filter((code) => selectedSet.has(code));
}

function getVisibleMenuCodes(ingredient: Ingredient, selectedMenus: MenuCode[]): MenuCode[] {
  const selectedSet = new Set(selectedMenus);
  return ingredient.menuCodes.filter((code) => selectedSet.has(code));
}

function getShoppingViewData(): ShoppingViewData {
  const selectedMenus = normalizeSelectedMenus(getSelectedMenus());
  const checkedMap = getCheckedIngredientMap();
  const aggregatedIngredients = getIngredientsForMenus(selectedMenus);
  const checkedIngredientsCount = aggregatedIngredients.filter(
    (ingredient) => checkedMap[ingredient.id] === true,
  ).length;
  const visibleIngredients = showUncheckedOnly
    ? aggregatedIngredients.filter((ingredient) => checkedMap[ingredient.id] !== true)
    : aggregatedIngredients;
  const groupedIngredients = Object.entries(groupIngredientsByCategory(visibleIngredients)).map(
    ([category, ingredients]) => ({
      category,
      ingredients,
    }),
  );

  return {
    selectedMenus,
    checkedMap,
    groupedIngredients,
    totalIngredientsCount: aggregatedIngredients.length,
    checkedIngredientsCount,
  };
}

function hasVisibleItems(viewData: ShoppingViewData): boolean {
  return viewData.groupedIngredients.some((group) => group.ingredients.length > 0);
}

function renderMenuFilterChips(selectedMenus: MenuCode[]): string {
  const selectedSet = new Set(selectedMenus);

  return MENU_CODES.map((code) => {
    const isSelected = selectedSet.has(code);

    return `
      <button
        type="button"
        class="menu-filter-chip ${isSelected ? 'is-selected' : ''}"
        data-menu-filter="${escapeHtml(code)}"
        aria-pressed="${isSelected}"
      >
        ${escapeHtml(code)}
      </button>
    `;
  }).join('');
}

function renderIngredientRow(
  ingredient: Ingredient,
  viewData: ShoppingViewData,
  revealIndex: number,
): string {
  const isChecked = viewData.checkedMap[ingredient.id] === true;
  const statusLabel = isChecked ? 'sudah dibeli' : 'belum dibeli';
  const menuTags = getVisibleMenuCodes(ingredient, viewData.selectedMenus)
    .map((code) => `<span class="menu-mini-chip">${escapeHtml(code)}</span>`)
    .join('');

  return `
    <button
      type="button"
      class="ingredient-row ${isChecked ? 'is-checked' : ''}"
      data-ingredient-id="${escapeHtml(ingredient.id)}"
      data-reveal
      style="--reveal-index:${revealIndex};"
      role="checkbox"
      aria-checked="${isChecked}"
      aria-label="${escapeHtml(ingredient.name)} (${statusLabel})"
    >
      <span class="ingredient-check ${isChecked ? 'is-checked' : ''}" aria-hidden="true">
        ${isChecked ? '✓' : ''}
      </span>
      <span class="sr-only">${escapeHtml(statusLabel)}</span>
      <span class="ingredient-main">
        <span class="ingredient-name-line">
          <span class="ingredient-name">${escapeHtml(ingredient.name)}</span>
          ${
            ingredient.quantity
              ? `<span class="shopping-ingredient-qty">${escapeHtml(ingredient.quantity)}</span>`
              : ''
          }
        </span>
        <span class="ingredient-subline">
          <span class="menu-mini-row">${menuTags}</span>
          ${
            ingredient.notes
              ? `<span class="shopping-ingredient-note">${escapeHtml(ingredient.notes)}</span>`
              : ''
          }
        </span>
      </span>
    </button>
  `;
}

function renderGroupedIngredients(viewData: ShoppingViewData): string {
  if (!hasVisibleItems(viewData)) {
    return `
      <div class="shopping-empty-state">
        <p>${showUncheckedOnly ? 'Semua bahan sudah ditanda.' : 'Tiada bahan untuk pilihan menu semasa.'}</p>
      </div>
    `;
  }

  return viewData.groupedIngredients
    .map((group, groupIndex) => {
      const groupRevealIndex = Math.min(groupIndex + 1, 8);
      const rows = group.ingredients
        .map((ingredient, rowIndex) => {
          const rowRevealIndex = Math.min(groupRevealIndex + rowIndex + 1, 10);
          return renderIngredientRow(ingredient, viewData, rowRevealIndex);
        })
        .join('');

      return `
        <section class="shopping-category" data-reveal style="--reveal-index:${groupRevealIndex};">
          <h2 class="shopping-category-title">${escapeHtml(group.category)}</h2>
          <div class="ingredient-group-list">${rows}</div>
        </section>
      `;
    })
    .join('');
}

export function renderShoppingPage(): string {
  const viewData = getShoppingViewData();
  const hasMenus = viewData.selectedMenus.length > 0;
  const showProgress = hasMenus && viewData.totalIngredientsCount > 0;
  const progressMax = Math.max(viewData.totalIngredientsCount, 1);
  const progressValue = Math.min(viewData.checkedIngredientsCount, progressMax);
  const progressLabel = showProgress
    ? `${viewData.checkedIngredientsCount}/${viewData.totalIngredientsCount} selesai`
    : '';

  const content = hasMenus
    ? renderGroupedIngredients(viewData)
    : `
      <div class="shopping-empty-state">
        <p>Belum ada menu dipilih. Pilih kod menu pada chip di atas.</p>
      </div>
    `;

  return `
    <section class="page-card shopping-page" data-shopping-page>
      <h1>Checklist</h1>
      <p class="shopping-line">Tap bahan untuk tanda sudah beli.</p>
      <div class="pill-row" aria-label="Ringkasan checklist">
        <span class="pill is-accent">Menu: ${viewData.selectedMenus.length}</span>
        <span class="pill">Bahan: ${viewData.totalIngredientsCount}</span>
        <span class="pill">Selesai: ${viewData.checkedIngredientsCount}</span>
        ${showUncheckedOnly ? '<span class="pill is-warn">Belum dibeli sahaja</span>' : ''}
      </div>

      ${
        showProgress
          ? `
        <div class="shopping-progress" aria-label="Kemajuan checklist">
          <progress class="progress" value="${progressValue}" max="${progressMax}">
            ${escapeHtml(progressLabel)}
          </progress>
          <p class="progress-meta">${escapeHtml(progressLabel)}</p>
        </div>
      `
          : ''
      }

      <div class="menu-filter-row print-hidden">${renderMenuFilterChips(viewData.selectedMenus)}</div>

      <div class="shopping-controls print-hidden" data-reveal style="--reveal-index:1;">
        <label class="shopping-toggle">
          <input type="checkbox" data-show-unchecked ${showUncheckedOnly ? 'checked' : ''} />
          <span>Tunjuk belum dibeli sahaja</span>
        </label>
        <button
          type="button"
          class="btn btn-secondary shopping-untick-btn"
          data-shopping-action="untick-all"
          ${viewData.checkedIngredientsCount > 0 ? '' : 'disabled'}
        >
          Untick All
        </button>
      </div>

      <div class="shopping-content">${content}</div>
    </section>
  `;
}

function isShoppingPageMounted(container: HTMLElement): boolean {
  return container.querySelector('[data-shopping-page]') !== null;
}

function rerenderShoppingPage(container: HTMLElement, options?: RerenderOptions): void {
  if (!isShoppingPageMounted(container)) {
    return;
  }

  container.innerHTML = renderShoppingPage();
  setupShoppingPageInteractions(container);

  if (!options?.toggledIngredientId) {
    return;
  }

  const row = Array.from(container.querySelectorAll<HTMLElement>('[data-ingredient-id]')).find(
    (element) => element.dataset.ingredientId === options.toggledIngredientId,
  );

  if (!row) {
    return;
  }

  row.classList.add('is-just-toggled');

  if (options.toggledCheckedState) {
    row.classList.add('is-just-checked');
  }

  window.setTimeout(() => {
    row.classList.remove('is-just-toggled');
    row.classList.remove('is-just-checked');
  }, 340);
}

function toggleMenuSelection(menuCode: MenuCode): void {
  const selectedSet = new Set(getSelectedMenus());

  if (selectedSet.has(menuCode)) {
    selectedSet.delete(menuCode);
  } else {
    selectedSet.add(menuCode);
  }

  setSelectedMenus(normalizeSelectedMenus(Array.from(selectedSet)));
}

export function setupShoppingPageInteractions(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>('[data-menu-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const menuCode = button.dataset.menuFilter;

      if (!menuCode || !MENU_CODES.includes(menuCode as MenuCode)) {
        return;
      }

      toggleMenuSelection(menuCode as MenuCode);
      rerenderShoppingPage(container);
    });
  });

  container.querySelectorAll<HTMLButtonElement>('[data-shopping-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.shoppingAction;

      if (action === 'untick-all') {
        clearCheckedIngredients();
        rerenderShoppingPage(container);
      }
    });
  });

  const showUncheckedInput = container.querySelector<HTMLInputElement>('[data-show-unchecked]');

  if (showUncheckedInput) {
    showUncheckedInput.addEventListener('change', () => {
      showUncheckedOnly = showUncheckedInput.checked;
      rerenderShoppingPage(container);
    });
  }

  container.querySelectorAll<HTMLButtonElement>('[data-ingredient-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const ingredientId = button.dataset.ingredientId;

      if (!ingredientId) {
        return;
      }

      const checkedBefore = getCheckedIngredientMap()[ingredientId] === true;
      toggleCheckedIngredient(ingredientId);
      rerenderShoppingPage(container, {
        toggledIngredientId: ingredientId,
        toggledCheckedState: !checkedBefore,
      });
    });
  });
}
