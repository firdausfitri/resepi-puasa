import type { Ingredient, MenuCode } from '../data/types';
import { MENU_CODES } from '../data/types';
import { getIngredientsForMenus, groupIngredientsByCategory } from '../lib/data';
import { copyTextToClipboard, downloadTextFile, toCsv } from '../lib/export';
import {
  clearCheckedIngredients,
  clearSelectedMenus,
  getCheckedIngredientMap,
  getSelectedMenus,
  setSelectedMenus,
  toggleCheckedIngredient,
} from '../lib/storage';
import { escapeHtml } from '../lib/utils';

let showUncheckedOnly = false;
let copyStatus: 'idle' | 'success' | 'error' = 'idle';
let copyStatusTimeoutId: number | null = null;

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
  const checkedIngredientsCount = aggregatedIngredients.filter((ingredient) => checkedMap[ingredient.id] === true)
    .length;
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

function getCopyText(viewData: ShoppingViewData): string {
  const menuLine = viewData.selectedMenus.length > 0 ? viewData.selectedMenus.join(', ') : '-';
  const lines: string[] = ['Shopping List', `Menu: ${menuLine}`, ''];

  if (!hasVisibleItems(viewData)) {
    lines.push('Tiada bahan untuk dipaparkan.');
    return lines.join('\n');
  }

  viewData.groupedIngredients.forEach((group, groupIndex) => {
    lines.push(`[${group.category}]`);

    group.ingredients.forEach((ingredient) => {
      const isChecked = viewData.checkedMap[ingredient.id] === true;
      const prefix = isChecked ? '✅ ' : '☐ ';
      const quantitySuffix = ingredient.quantity ? ` (${ingredient.quantity})` : '';
      lines.push(`${prefix}${ingredient.name}${quantitySuffix}`);
    });

    if (groupIndex < viewData.groupedIngredients.length - 1) {
      lines.push('');
    }
  });

  return lines.join('\n');
}

function getCsvContent(viewData: ShoppingViewData): string {
  const rows: string[][] = [['category', 'item', 'quantity', 'menuCodes', 'checked']];

  viewData.groupedIngredients.forEach((group) => {
    group.ingredients.forEach((ingredient) => {
      rows.push([
        group.category,
        ingredient.name,
        ingredient.quantity ?? '',
        getVisibleMenuCodes(ingredient, viewData.selectedMenus).join('|'),
        viewData.checkedMap[ingredient.id] === true ? 'TRUE' : 'FALSE',
      ]);
    });
  });

  return toCsv(rows);
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

function renderIngredientRow(ingredient: Ingredient, viewData: ShoppingViewData): string {
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
        <p>${showUncheckedOnly ? 'Semua bahan telah ditanda dibeli.' : 'Tiada bahan untuk pilihan menu semasa.'}</p>
      </div>
    `;
  }

  return viewData.groupedIngredients
    .map((group) => {
      const rows = group.ingredients.map((ingredient) => renderIngredientRow(ingredient, viewData)).join('');

      return `
        <section class="shopping-category">
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
  const selectedLabel =
    hasMenus ? viewData.selectedMenus.join(', ') : 'Belum ada menu dipilih.';
  const hasItems = hasVisibleItems(viewData);
  const copyFeedbackMessage =
    copyStatus === 'success' ? 'Disalin ✓' : copyStatus === 'error' ? 'Gagal salin' : '';
  const showProgress = hasMenus && viewData.totalIngredientsCount > 0;
  const progressMax = Math.max(viewData.totalIngredientsCount, 1);
  const progressValue = Math.min(viewData.checkedIngredientsCount, progressMax);
  const progressLabel = showProgress ? `${viewData.checkedIngredientsCount}/${viewData.totalIngredientsCount} ditanda` : '';

  const content =
    viewData.selectedMenus.length === 0
      ? `
        <div class="shopping-empty-state">
          <p>Belum ada menu dipilih. Pilih menu dahulu untuk jana senarai bahan.</p>
          <button type="button" class="btn btn-primary" data-shopping-action="select-all-empty">
            Pilih Semua (7)
          </button>
        </div>
      `
      : renderGroupedIngredients(viewData);

  return `
    <section class="page-card shopping-page" data-shopping-page>
      <h1>Shopping List</h1>
      <p class="shopping-line">Menu dipilih: ${escapeHtml(selectedLabel)}</p>
      <div class="pill-row" aria-label="Ringkasan shopping">
        <span class="pill is-accent">Bahan: ${viewData.totalIngredientsCount}</span>
        <span class="pill">Ditanda: ${viewData.checkedIngredientsCount}</span>
        ${showUncheckedOnly ? '<span class="pill is-warn">Filter: Belum dibeli</span>' : ''}
      </div>
      ${
        hasMenus
          ? `
        <div class="shopping-progress" aria-label="Kemajuan shopping">
          <progress class="progress" value="${progressValue}" max="${progressMax}">
            ${escapeHtml(progressLabel)}
          </progress>
          <p class="progress-meta ${showProgress ? '' : 'print-hidden'}">${escapeHtml(progressLabel)}</p>
        </div>
      `
          : ''
      }

      <div class="menu-filter-row print-hidden">${renderMenuFilterChips(viewData.selectedMenus)}</div>

      <div class="shopping-actions print-hidden">
        <button type="button" class="btn btn-primary" data-shopping-action="select-all">
          Pilih Semua (7)
        </button>
        <button type="button" class="btn btn-secondary" data-shopping-action="clear-menu">
          Clear Menu
        </button>
        <button type="button" class="btn btn-secondary" data-shopping-action="reset-checks">
          Reset Tanda
        </button>
      </div>

      <div class="shopping-tools print-hidden">
        <button type="button" class="btn btn-secondary" data-shopping-tool="copy" ${hasItems ? '' : 'disabled'}>
          Copy
        </button>
        <button type="button" class="btn btn-secondary" data-shopping-tool="csv" ${hasItems ? '' : 'disabled'}>
          Export CSV
        </button>
        <button type="button" class="btn btn-secondary" data-shopping-tool="print" ${hasItems ? '' : 'disabled'}>
          Print
        </button>
      </div>

      <p
        class="shopping-copy-feedback print-hidden ${copyStatus !== 'idle' ? 'is-visible' : ''}"
        data-copy-feedback
        aria-live="polite"
      >
        ${escapeHtml(copyFeedbackMessage)}
      </p>

      <label class="shopping-toggle print-hidden">
        <input type="checkbox" data-show-unchecked ${showUncheckedOnly ? 'checked' : ''} />
        <span>Tunjuk belum dibeli sahaja</span>
      </label>

      <div class="shopping-content">${content}</div>
    </section>
  `;
}

function isShoppingPageMounted(container: HTMLElement): boolean {
  return container.querySelector('[data-shopping-page]') !== null;
}

function rerenderShoppingPage(container: HTMLElement): void {
  if (!isShoppingPageMounted(container)) {
    return;
  }

  container.innerHTML = renderShoppingPage();
  setupShoppingPageInteractions(container);
}

function setCopyStatusWithReset(status: 'success' | 'error', container: HTMLElement): void {
  copyStatus = status;
  updateCopyFeedbackElement(container);

  if (copyStatusTimeoutId !== null) {
    window.clearTimeout(copyStatusTimeoutId);
  }

  copyStatusTimeoutId = window.setTimeout(() => {
    copyStatus = 'idle';
    copyStatusTimeoutId = null;
    updateCopyFeedbackElement(container);
  }, 1500);
}

function updateCopyFeedbackElement(container: HTMLElement): void {
  if (!isShoppingPageMounted(container)) {
    return;
  }

  const feedbackElement = container.querySelector<HTMLElement>('[data-copy-feedback]');

  if (!feedbackElement) {
    return;
  }

  const text = copyStatus === 'success' ? 'Disalin ✓' : copyStatus === 'error' ? 'Gagal salin' : '';
  feedbackElement.textContent = text;
  feedbackElement.classList.toggle('is-visible', copyStatus !== 'idle');
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

      if (action === 'select-all' || action === 'select-all-empty') {
        setSelectedMenus([...MENU_CODES]);
        rerenderShoppingPage(container);
        return;
      }

      if (action === 'clear-menu') {
        clearSelectedMenus();
        rerenderShoppingPage(container);
        return;
      }

      if (action === 'reset-checks') {
        clearCheckedIngredients();
        rerenderShoppingPage(container);
      }
    });
  });

  container.querySelectorAll<HTMLButtonElement>('[data-shopping-tool]').forEach((button) => {
    button.addEventListener('click', async () => {
      const tool = button.dataset.shoppingTool;
      const viewData = getShoppingViewData();

      if (!hasVisibleItems(viewData)) {
        return;
      }

      if (tool === 'copy') {
        const copyText = getCopyText(viewData);
        const isCopied = await copyTextToClipboard(copyText);
        setCopyStatusWithReset(isCopied ? 'success' : 'error', container);
        return;
      }

      if (tool === 'csv') {
        const csvContent = getCsvContent(viewData);
        downloadTextFile('shopping_list.csv', csvContent, 'text/csv;charset=utf-8');
        return;
      }

      if (tool === 'print') {
        window.print();
      }
    });
  });

  const uncheckedToggle = container.querySelector<HTMLInputElement>('[data-show-unchecked]');

  if (uncheckedToggle) {
    uncheckedToggle.addEventListener('change', () => {
      showUncheckedOnly = uncheckedToggle.checked;
      rerenderShoppingPage(container);
    });
  }

  container.querySelectorAll<HTMLButtonElement>('[data-ingredient-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const ingredientId = button.dataset.ingredientId;

      if (!ingredientId) {
        return;
      }

      toggleCheckedIngredient(ingredientId);
      rerenderShoppingPage(container);
    });
  });
}
