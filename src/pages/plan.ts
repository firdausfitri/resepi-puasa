import { MENU_CODES, type MenuCode } from '../data/types';
import { getRecipe } from '../lib/data';
import { addSelectedMenu, getSelectedMenus } from '../lib/storage';
import { escapeHtml } from '../lib/utils';

interface WeekPlanItem {
  dayLabel: string;
  code: MenuCode;
}

interface MalaysiaDateParts {
  year: number;
  month: number;
  day: number;
}

const WEEK_PLAN: WeekPlanItem[] = [
  { dayLabel: 'Isnin', code: 'PPT' },
  { dayLabel: 'Selasa', code: 'KCP' },
  { dayLabel: 'Rabu', code: 'HLA' },
  { dayLabel: 'Khamis', code: 'PKP' },
  { dayLabel: 'Jumaat', code: 'BLD' },
  { dayLabel: 'Sabtu', code: 'KRM' },
  { dayLabel: 'Ahad', code: 'BPP' },
];

const WEEKDAY_KEYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const MALAYSIA_TIMEZONE = 'Asia/Kuala_Lumpur';

function isMenuCode(code: string): code is MenuCode {
  return MENU_CODES.includes(code as MenuCode);
}

function getMalaysiaWeekIndex(): number {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: MALAYSIA_TIMEZONE,
    weekday: 'short',
  }).format(new Date());

  const index = WEEKDAY_KEYS.indexOf(weekday as (typeof WEEKDAY_KEYS)[number]);
  return index >= 0 ? index : 0;
}

function getMalaysiaDateParts(): MalaysiaDateParts {
  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: MALAYSIA_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const year = Number(dateParts.find((part) => part.type === 'year')?.value ?? '0');
  const month = Number(dateParts.find((part) => part.type === 'month')?.value ?? '0');
  const day = Number(dateParts.find((part) => part.type === 'day')?.value ?? '0');

  return { year, month, day };
}

function toUtcDayNumber(date: MalaysiaDateParts): number {
  return Math.floor(Date.UTC(date.year, date.month - 1, date.day) / 86400000);
}

function getRamadanMessage(): string {
  const malaysiaToday = getMalaysiaDateParts();
  const ramadanStartDate: MalaysiaDateParts = {
    year: malaysiaToday.year,
    month: 2,
    day: 19,
  };
  const dayDiff = toUtcDayNumber(malaysiaToday) - toUtcDayNumber(ramadanStartDate);

  if (dayDiff < 0) {
    return 'Ramadan belum bermula (1 Ramadan: 19 Februari, Malaysia).';
  }

  return `Hari ke-${dayDiff + 1} Ramadan di Malaysia.`;
}

export function renderPlanPage(): string {
  const selectedMenus = new Set(getSelectedMenus());
  const todayIndex = getMalaysiaWeekIndex();
  const todayPlan = WEEK_PLAN[todayIndex] ?? WEEK_PLAN[0];
  const todayRecipe = getRecipe(todayPlan.code);
  const todayTitle = todayRecipe?.title ?? `Menu ${todayPlan.code}`;
  const todaySelected = selectedMenus.has(todayPlan.code);

  const cards = WEEK_PLAN.map((item, index) => {
    const recipe = getRecipe(item.code);
    const isSelected = selectedMenus.has(item.code);
    const isToday = index === todayIndex;
    const title = recipe?.title ?? `Menu ${item.code}`;

    return `
      <article class="plan-card ${isToday ? 'is-today' : ''}" data-menu="${escapeHtml(item.code)}">
        <div class="plan-card-head">
          <p class="day-label">${escapeHtml(item.dayLabel)}</p>
          <div class="plan-chip-group">
            ${isToday ? '<span class="today-badge">Hari ini</span>' : ''}
            <span class="menu-code-chip">${escapeHtml(item.code)}</span>
          </div>
        </div>
        <h2 class="plan-card-title">${escapeHtml(title)}</h2>
        <p class="plan-meta">Prep 15 min • Masak 25 min</p>
        <div class="plan-actions">
          <a class="btn btn-secondary" href="#/recipes/${encodeURIComponent(item.code)}">Buka Resepi</a>
          <button
            type="button"
            class="btn btn-primary"
            data-add-menu="${escapeHtml(item.code)}"
            ${isSelected ? 'disabled' : ''}
          >
            ${isSelected ? 'Ditambah ✓' : 'Tambah ke Shopping List'}
          </button>
        </div>
        <p
          class="plan-added-note ${isSelected ? 'is-visible' : ''}"
          data-added-note
          data-added-menu="${escapeHtml(item.code)}"
        >
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

      <section class="today-plan-card" data-menu="${escapeHtml(todayPlan.code)}" aria-label="Menu hari ini">
        <p class="today-plan-kicker">Menu Hari Ini</p>
        <h2 class="today-plan-title">${escapeHtml(todayPlan.dayLabel)}: ${escapeHtml(todayTitle)}</h2>
        <p class="today-plan-meta">${escapeHtml(getRamadanMessage())}</p>
        <div class="plan-actions">
          <a class="btn btn-secondary" href="#/recipes/${encodeURIComponent(todayPlan.code)}">Buka Resepi</a>
          <button
            type="button"
            class="btn btn-primary"
            data-add-menu="${escapeHtml(todayPlan.code)}"
            ${todaySelected ? 'disabled' : ''}
          >
            ${todaySelected ? 'Ditambah ✓' : 'Tambah ke Shopping List'}
          </button>
        </div>
        <p
          class="plan-added-note ${todaySelected ? 'is-visible' : ''}"
          data-added-note
          data-added-menu="${escapeHtml(todayPlan.code)}"
        >
          Ditambah ✓ Menu ini sudah ada dalam Shopping List.
        </p>
      </section>

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

      container.querySelectorAll<HTMLButtonElement>(`[data-add-menu="${code}"]`).forEach((targetButton) => {
        targetButton.disabled = true;
        targetButton.textContent = 'Ditambah ✓';
      });

      container
        .querySelectorAll<HTMLElement>(`[data-added-note][data-added-menu="${code}"]`)
        .forEach((addedNoteElement) => {
          addedNoteElement.classList.add('is-visible');
        });

      if (feedbackElement) {
        feedbackElement.classList.add('is-visible');
        feedbackElement.textContent = `Ditambah ✓ ${code}. Jumlah menu dipilih: ${updatedMenus.length}.`;
      }
    });
  });
}
