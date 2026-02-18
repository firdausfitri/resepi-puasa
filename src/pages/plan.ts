import { MENU_CODES, type MenuCode } from '../data/types';
import { getRecipe } from '../lib/data';
import { addSelectedMenu, getSelectedMenus } from '../lib/storage';
import { escapeHtml } from '../lib/utils';

const PLAN_ORDER: MenuCode[] = ['PPT', 'KCP', 'HLA', 'PKP', 'BLD', 'KRM', 'BPP'];

function isMenuCode(code: string): code is MenuCode {
  return MENU_CODES.includes(code as MenuCode);
}

export function renderPlanPage(): string {
  const selectedMenus = new Set(getSelectedMenus());
  const cards = PLAN_ORDER.map((code, index) => {
    const recipe = getRecipe(code);
    const isSelected = selectedMenus.has(code);
    const title = recipe?.title ?? `Menu ${code}`;

    return `
      <article class="plan-card" data-menu="${escapeHtml(code)}">
        <div class="plan-card-head">
          <p class="day-label">Hari ${index + 1}</p>
          <span class="menu-code-chip">${escapeHtml(code)}</span>
        </div>
        <h2 class="plan-card-title">${escapeHtml(title)}</h2>
        <p class="plan-meta">Prep 15 min • Masak 25 min</p>
        <div class="plan-actions">
          <a class="btn btn-secondary" href="#/recipes/${encodeURIComponent(code)}">Buka Resepi</a>
          <button
            type="button"
            class="btn btn-primary"
            data-add-menu="${escapeHtml(code)}"
            ${isSelected ? 'disabled' : ''}
          >
            ${isSelected ? 'Ditambah ✓' : 'Tambah ke Shopping List'}
          </button>
        </div>
        <p class="plan-added-note ${isSelected ? 'is-visible' : ''}" data-added-note>
          Ditambah ✓ Menu ini sudah ada dalam Shopping List.
        </p>
      </article>
    `;
  }).join('');

  const selectedCount = selectedMenus.size;
  const headerNote =
    selectedCount > 0
      ? `${selectedCount} menu telah ditambah ke Shopping List.`
      : 'Tekan "Tambah ke Shopping List" untuk simpan menu dipilih.';

  return `
    <section class="page-card">
      <h1>Plan 7 Hari</h1>
      <p class="plan-intro">Susun menu harian dan terus simpan ke senarai shopping.</p>
      <p class="plan-feedback ${selectedCount > 0 ? 'is-visible' : ''}" data-plan-feedback aria-live="polite">
        ${escapeHtml(headerNote)}
      </p>
      <div class="plan-grid">${cards}</div>
    </section>
  `;
}

export function setupPlanPageInteractions(container: HTMLElement): void {
  const feedbackElement = container.querySelector<HTMLElement>('[data-plan-feedback]');

  container.querySelectorAll<HTMLButtonElement>('[data-add-menu]').forEach((button) => {
    button.addEventListener('click', () => {
      const code = button.dataset.addMenu;

      if (!code || !isMenuCode(code)) {
        return;
      }

      const updatedMenus = addSelectedMenu(code);

      button.disabled = true;
      button.textContent = 'Ditambah ✓';

      const cardElement = button.closest<HTMLElement>('.plan-card');
      const addedNoteElement = cardElement?.querySelector<HTMLElement>('[data-added-note]');

      if (addedNoteElement) {
        addedNoteElement.classList.add('is-visible');
      }

      if (feedbackElement) {
        feedbackElement.classList.add('is-visible');
        feedbackElement.textContent = `Ditambah ✓ ${code}. Jumlah menu dipilih: ${updatedMenus.length}.`;
      }
    });
  });
}
