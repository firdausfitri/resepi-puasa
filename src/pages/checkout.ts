import type { Ingredient, MenuCode } from '../data/types';
import { getIngredientsForMenus, groupIngredientsByCategory } from '../lib/data';
import { copyTextToClipboard, downloadTextFile, toCsv } from '../lib/export';
import { getCheckedIngredientMap, getSelectedMenus } from '../lib/storage';
import { escapeHtml } from '../lib/utils';

let checkoutFeedback = '';
let checkoutFeedbackTimeoutId: number | null = null;

interface CheckoutGroup {
  category: string;
  ingredients: Ingredient[];
}

interface CheckoutViewData {
  selectedMenus: MenuCode[];
  checkedMap: Record<string, boolean>;
  groupedIngredients: CheckoutGroup[];
}

function getCheckoutViewData(): CheckoutViewData {
  const selectedMenus = getSelectedMenus();
  const checkedMap = getCheckedIngredientMap();
  const ingredients = getIngredientsForMenus(selectedMenus);
  const groupedIngredients = Object.entries(groupIngredientsByCategory(ingredients)).map(
    ([category, grouped]) => ({
      category,
      ingredients: grouped,
    }),
  );

  return {
    selectedMenus,
    checkedMap,
    groupedIngredients,
  };
}

function hasCheckoutItems(viewData: CheckoutViewData): boolean {
  return viewData.groupedIngredients.some((group) => group.ingredients.length > 0);
}

function getCheckoutCopyText(viewData: CheckoutViewData): string {
  const menuLine = viewData.selectedMenus.length > 0 ? viewData.selectedMenus.join(', ') : '-';
  const lines: string[] = ['Checklist', `Menu: ${menuLine}`, ''];

  if (!hasCheckoutItems(viewData)) {
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

function getCheckoutCsvContent(viewData: CheckoutViewData): string {
  const rows: string[][] = [['category', 'item', 'quantity', 'menuCodes', 'checked']];

  viewData.groupedIngredients.forEach((group) => {
    group.ingredients.forEach((ingredient) => {
      rows.push([
        group.category,
        ingredient.name,
        ingredient.quantity ?? '',
        ingredient.menuCodes.filter((code) => viewData.selectedMenus.includes(code)).join('|'),
        viewData.checkedMap[ingredient.id] === true ? 'TRUE' : 'FALSE',
      ]);
    });
  });

  return toCsv(rows);
}

function renderCheckoutIcon(tool: 'copy' | 'csv' | 'print'): string {
  if (tool === 'copy') {
    return `
      <svg class="checkout-tool-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9 9h10v12H9z" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    `;
  }

  if (tool === 'csv') {
    return `
      <svg class="checkout-tool-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 15h8M8 19h8" />
      </svg>
    `;
  }

  return `
    <svg class="checkout-tool-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v8H6z" />
    </svg>
  `;
}

export function renderCheckoutPage(): string {
  const viewData = getCheckoutViewData();
  const hasItems = hasCheckoutItems(viewData);
  const selectedLabel = viewData.selectedMenus.length > 0 ? viewData.selectedMenus.join(', ') : '-';

  return `
    <section class="page-card checkout-page" data-checkout-page>
      <h1>Checkout</h1>
      <p class="shopping-line">Menu: ${escapeHtml(selectedLabel)}</p>
      ${
        hasItems
          ? `
        <div class="checkout-actions" data-reveal style="--reveal-index:1;">
          <button type="button" class="checkout-tool-btn is-primary" data-checkout-tool="copy">
            ${renderCheckoutIcon('copy')}
            <span>Copy</span>
          </button>
          <button type="button" class="checkout-tool-btn" data-checkout-tool="csv">
            ${renderCheckoutIcon('csv')}
            <span>CSV</span>
          </button>
          <button type="button" class="checkout-tool-btn" data-checkout-tool="print">
            ${renderCheckoutIcon('print')}
            <span>Print</span>
          </button>
        </div>
      `
          : `
        <div class="shopping-empty-state">
          <p>Tiada bahan untuk checkout.</p>
        </div>
      `
      }
      <a class="btn btn-secondary checkout-back-btn" href="#/cart">Back</a>
      <p
        class="cart-checkout-feedback motion-toast ${checkoutFeedback ? 'is-visible' : ''}"
        data-checkout-feedback
        aria-live="polite"
      >
        ${escapeHtml(checkoutFeedback)}
      </p>
    </section>
  `;
}

function setCheckoutFeedbackWithReset(
  message: '' | 'Disalin ✓' | 'Gagal salin',
  container: HTMLElement,
): void {
  checkoutFeedback = message;
  const feedbackElement = container.querySelector<HTMLElement>('[data-checkout-feedback]');

  if (feedbackElement) {
    feedbackElement.textContent = message;
    feedbackElement.classList.toggle('is-visible', message.length > 0);
  }

  if (!message) {
    return;
  }

  if (checkoutFeedbackTimeoutId !== null) {
    window.clearTimeout(checkoutFeedbackTimeoutId);
  }

  checkoutFeedbackTimeoutId = window.setTimeout(() => {
    checkoutFeedback = '';
    checkoutFeedbackTimeoutId = null;
    const resetElement = container.querySelector<HTMLElement>('[data-checkout-feedback]');

    if (resetElement) {
      resetElement.textContent = '';
      resetElement.classList.remove('is-visible');
    }
  }, 1500);
}

export function setupCheckoutPageInteractions(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>('[data-checkout-tool]').forEach((button) => {
    button.addEventListener('click', async () => {
      const tool = button.dataset.checkoutTool;
      const viewData = getCheckoutViewData();

      if (!hasCheckoutItems(viewData)) {
        return;
      }

      if (tool === 'copy') {
        const success = await copyTextToClipboard(getCheckoutCopyText(viewData));
        setCheckoutFeedbackWithReset(success ? 'Disalin ✓' : 'Gagal salin', container);
        return;
      }

      if (tool === 'csv') {
        downloadTextFile(
          'shopping_list.csv',
          getCheckoutCsvContent(viewData),
          'text/csv;charset=utf-8;',
        );
        return;
      }

      if (tool === 'print') {
        window.location.hash = '/shopping';
        window.setTimeout(() => {
          window.print();
        }, 120);
      }
    });
  });
}
