import { MENU_CODES, type Ingredient, type MenuCode } from '../data/types';
import { getAllIngredients, getRecipe } from '../lib/data';
import {
  getKitchenMode,
  getSelectedMenus,
  setKitchenMode,
  toggleSelectedMenu,
} from '../lib/storage';
import { escapeHtml } from '../lib/utils';

function isMenuCode(code: string): code is MenuCode {
  return MENU_CODES.some((menuCode) => menuCode === code);
}

function ingredientLookup(): Map<string, Ingredient> {
  return new Map(getAllIngredients().map((ingredient) => [ingredient.id, ingredient]));
}

function toggleKitchenModeOnBody(isEnabled: boolean): void {
  document.body.classList.toggle('kitchen-mode', isEnabled);
}

function renderRecipeNotFound(code: string): string {
  return `
    <section class="page-card">
      <h1>Halaman Resepi</h1>
      <p class="recipe-code">Resepi: ${escapeHtml(code || '-')}</p>
      <p>Resepi tidak dijumpai.</p>
      <p><a class="chip-link" href="#/plan">Kembali ke Plan 7 Hari</a></p>
    </section>
  `;
}

function renderCartIcon(isSelected: boolean): string {
  if (isSelected) {
    return `
      <svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6l-2-3H1" />
        <path d="M9 20a1.5 1.5 0 1 0 0.001 0zM18 20a1.5 1.5 0 1 0 0.001 0z" />
        <path d="M10 12.8l1.8 1.8 3.3-3.3" />
      </svg>
    `;
  }

  return `
    <svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6l-2-3H1" />
      <path d="M9 20a1.5 1.5 0 1 0 0.001 0zM18 20a1.5 1.5 0 1 0 0.001 0z" />
      <path d="M13 11v4M11 13h4" />
    </svg>
  `;
}

export function renderRecipePage(code: string): string {
  const normalizedCode = code.trim().toUpperCase();

  if (!isMenuCode(normalizedCode)) {
    return renderRecipeNotFound(normalizedCode);
  }

  const recipe = getRecipe(normalizedCode);

  if (!recipe) {
    return renderRecipeNotFound(normalizedCode);
  }

  const ingredientsById = ingredientLookup();
  const ingredients = recipe.ingredientIds
    .map((ingredientId) => ingredientsById.get(ingredientId))
    .filter((ingredient): ingredient is Ingredient => ingredient !== undefined);

  const selectedMenus = new Set(getSelectedMenus());
  const alreadySelected = selectedMenus.has(recipe.code);
  const kitchenMode = getKitchenMode();

  const ingredientsMarkup = ingredients
    .map(
      (ingredient) =>
        `<li>${escapeHtml(ingredient.name)}${
          ingredient.quantity ? ` <span class="ingredient-qty">(${escapeHtml(ingredient.quantity)})</span>` : ''
        }</li>`,
    )
    .join('');

  const tagsMarkup = recipe.tags
    .map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`)
    .join('');

  const stepsShortMarkup = recipe.stepsShort.map((step) => `<li>${escapeHtml(step)}</li>`).join('');
  const stepsFullMarkup = recipe.stepsFull.map((step) => `<li>${escapeHtml(step)}</li>`).join('');

  return `
    <article class="page-card recipe-page" data-recipe-page data-menu-code="${escapeHtml(recipe.code)}">
      <header class="recipe-header" data-reveal style="--reveal-index:0;">
        <div class="recipe-head-row">
          <h1 class="recipe-title">${escapeHtml(recipe.title)}</h1>
          <span class="menu-code-chip">${escapeHtml(recipe.code)}</span>
        </div>
        <p class="recipe-meta">Prep 15 min • Masak 25 min</p>
        <p class="recipe-summary">${escapeHtml(recipe.summary)}</p>
        <div class="recipe-tags" aria-label="Tag resepi">${tagsMarkup}</div>
        <div class="pill-row" aria-label="Ringkasan resepi">
          <span class="pill is-accent">Bahan: ${ingredients.length}</span>
          <span class="pill">Ringkas: ${recipe.stepsShort.length} langkah</span>
          <span class="pill">Penuh: ${recipe.stepsFull.length} langkah</span>
        </div>
        <div class="recipe-tools print-hidden">
          <button
            type="button"
            class="icon-btn cart-btn ${alreadySelected ? 'is-added' : ''}"
            data-add-shopping
            aria-pressed="${alreadySelected}"
            aria-label="${
              alreadySelected
                ? `Buang ${escapeHtml(recipe.code)} dari cart`
                : `Tambah ${escapeHtml(recipe.code)} ke cart`
            }"
          >
            ${renderCartIcon(alreadySelected)}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-kitchen-toggle
            aria-pressed="${kitchenMode}"
          >
            ${kitchenMode ? 'Dapur Mode: ON' : 'Dapur Mode'}
          </button>
          <button type="button" class="btn btn-secondary" data-print-recipe>Print</button>
        </div>
        <p
          class="recipe-feedback motion-toast ${alreadySelected ? 'is-visible' : ''}"
          data-recipe-feedback
          aria-live="polite"
        >
          ${alreadySelected ? 'Dalam cart.' : ''}
        </p>
      </header>

      <nav
        class="recipe-jump-nav print-hidden"
        aria-label="Pautan pantas"
        data-reveal
        style="--reveal-index:1;"
      >
        <a class="jump-link" href="#bahan" data-jump-link="bahan">Bahan</a>
        <a class="jump-link" href="#langkah" data-jump-link="langkah">Langkah</a>
        <a class="jump-link" href="#nota" data-jump-link="nota">Nota</a>
      </nav>

      <section id="bahan" class="recipe-section" data-reveal style="--reveal-index:2;">
        <h2 class="section-title">Bahan</h2>
        <ul class="ingredient-list">${ingredientsMarkup}</ul>
      </section>

      <section id="langkah" class="recipe-section" data-reveal style="--reveal-index:3;">
        <h2 class="section-title">Langkah</h2>
        <h3 class="recipe-subtitle">Langkah Ringkas</h3>
        <ul class="step-list step-list-short">${stepsShortMarkup}</ul>
        <button type="button" class="btn btn-secondary print-hidden" data-toggle-steps>
          Tunjuk Langkah Penuh
        </button>
        <div class="steps-full-wrap" data-full-steps hidden>
          <h3 class="recipe-subtitle">Langkah Penuh</h3>
          <ol class="step-list step-list-full">${stepsFullMarkup}</ol>
        </div>
      </section>

      <section id="nota" class="recipe-section" data-reveal style="--reveal-index:4;">
        <h2 class="section-title">Nota</h2>
        <p>Tambah nota sendiri nanti.</p>
      </section>
    </article>
  `;
}

export function setupRecipePageInteractions(container: HTMLElement): void {
  const recipePage = container.querySelector<HTMLElement>('[data-recipe-page]');

  if (!recipePage) {
    return;
  }

  const kitchenButton = recipePage.querySelector<HTMLButtonElement>('[data-kitchen-toggle]');
  const printButton = recipePage.querySelector<HTMLButtonElement>('[data-print-recipe]');
  const addShoppingButton = recipePage.querySelector<HTMLButtonElement>('[data-add-shopping]');
  const feedbackElement = recipePage.querySelector<HTMLElement>('[data-recipe-feedback]');
  const fullStepsWrap = recipePage.querySelector<HTMLElement>('[data-full-steps]');
  const toggleStepsButton = recipePage.querySelector<HTMLButtonElement>('[data-toggle-steps]');

  const applyKitchenButtonLabel = (isKitchenMode: boolean): void => {
    if (kitchenButton) {
      kitchenButton.textContent = isKitchenMode ? 'Dapur Mode: ON' : 'Dapur Mode';
      kitchenButton.setAttribute('aria-pressed', String(isKitchenMode));
    }
  };

  const applyCartButtonState = (
    isSelected: boolean,
    code: MenuCode,
    shouldAnimate: boolean = false,
  ): void => {
    if (!addShoppingButton) {
      return;
    }

    addShoppingButton.classList.toggle('is-added', isSelected);
    addShoppingButton.setAttribute('aria-pressed', String(isSelected));
    addShoppingButton.setAttribute(
      'aria-label',
      isSelected ? `Buang ${code} dari cart` : `Tambah ${code} ke cart`,
    );
    addShoppingButton.innerHTML = renderCartIcon(isSelected);

    if (shouldAnimate) {
      addShoppingButton.classList.remove('is-flash');
      void addShoppingButton.offsetWidth;
      addShoppingButton.classList.add('is-flash');
    }

    if (feedbackElement) {
      feedbackElement.classList.toggle('is-visible', isSelected);
      feedbackElement.textContent = isSelected ? 'Dalam cart.' : '';
    }
  };

  const kitchenMode = getKitchenMode();
  toggleKitchenModeOnBody(kitchenMode);
  applyKitchenButtonLabel(kitchenMode);

  if (kitchenButton) {
    kitchenButton.addEventListener('click', () => {
      const nextMode = !getKitchenMode();
      setKitchenMode(nextMode);
      toggleKitchenModeOnBody(nextMode);
      applyKitchenButtonLabel(nextMode);
    });
  }

  if (printButton) {
    printButton.addEventListener('click', () => {
      window.print();
    });
  }

  if (addShoppingButton) {
    addShoppingButton.addEventListener('click', () => {
      const code = recipePage.dataset.menuCode;

      if (!code || !isMenuCode(code)) {
        return;
      }

      const updatedMenus = toggleSelectedMenu(code);
      applyCartButtonState(updatedMenus.includes(code), code, true);
    });
  }

  if (toggleStepsButton && fullStepsWrap) {
    toggleStepsButton.addEventListener('click', () => {
      const isHidden = fullStepsWrap.hasAttribute('hidden');

      if (isHidden) {
        fullStepsWrap.removeAttribute('hidden');
        toggleStepsButton.textContent = 'Sorok Langkah Penuh';
        return;
      }

      fullStepsWrap.setAttribute('hidden', 'true');
      toggleStepsButton.textContent = 'Tunjuk Langkah Penuh';
    });
  }

  recipePage.querySelectorAll<HTMLAnchorElement>('[data-jump-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.dataset.jumpLink;
      const target = targetId ? recipePage.querySelector<HTMLElement>(`#${targetId}`) : null;

      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
