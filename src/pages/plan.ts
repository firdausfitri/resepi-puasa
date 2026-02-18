import { MENU_CODES, type MenuCode } from '../data/types';
import { getRecipe } from '../lib/data';
import { getSelectedMenus, toggleSelectedMenu } from '../lib/storage';
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

export function renderPlanPage(): string {
  const selectedMenus = new Set(getSelectedMenus());
  const todayIndex = getMalaysiaWeekIndex();
  const todayPlan = WEEK_PLAN[todayIndex] ?? WEEK_PLAN[0];
  const todayRecipe = getRecipe(todayPlan.code);
  const todayTitle = todayRecipe?.title ?? `Menu ${todayPlan.code}`;
  const todaySelected = selectedMenus.has(todayPlan.code);
  const selectedCount = selectedMenus.size;
  const ramadanMessage = getRamadanMessage();

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
            class="icon-btn cart-btn ${isSelected ? 'is-added' : ''}"
            data-toggle-menu="${escapeHtml(item.code)}"
            aria-pressed="${isSelected}"
            aria-label="${
              isSelected
                ? `Buang ${escapeHtml(item.code)} dari cart`
                : `Tambah ${escapeHtml(item.code)} ke cart`
            }"
          >
            ${renderCartIcon(isSelected)}
          </button>
        </div>
      </article>
    `;
  }).join('');

  return `
    <section class="page-card">
      <h1>Plan 7 Hari</h1>
      <p class="page-subline">Pilih menu ikut hari, kemudian semak di Cart.</p>
      <div class="pill-row" aria-label="Ringkasan plan">
        <span class="pill is-accent">Dipilih: ${selectedCount}/7</span>
        <span class="pill">${escapeHtml(ramadanMessage)}</span>
      </div>

      <section class="today-plan-card" data-menu="${escapeHtml(todayPlan.code)}" aria-label="Menu hari ini">
        <p class="today-plan-kicker">Menu Hari Ini</p>
        <h2 class="today-plan-title">${escapeHtml(todayPlan.dayLabel)}: ${escapeHtml(todayTitle)}</h2>
        <p class="today-plan-meta">${escapeHtml(ramadanMessage)}</p>
        <div class="plan-actions">
          <a class="btn btn-secondary" href="#/recipes/${encodeURIComponent(todayPlan.code)}">Buka Resepi</a>
          <button
            type="button"
            class="icon-btn cart-btn ${todaySelected ? 'is-added' : ''}"
            data-toggle-menu="${escapeHtml(todayPlan.code)}"
            aria-pressed="${todaySelected}"
            aria-label="${
              todaySelected
                ? `Buang ${escapeHtml(todayPlan.code)} dari cart`
                : `Tambah ${escapeHtml(todayPlan.code)} ke cart`
            }"
          >
            ${renderCartIcon(todaySelected)}
          </button>
        </div>
      </section>
      <div class="plan-grid">${cards}</div>
    </section>
  `;
}

export function setupPlanPageInteractions(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>('[data-toggle-menu]').forEach((button) => {
    button.addEventListener('click', () => {
      const code = button.dataset.toggleMenu;

      if (!code || !isMenuCode(code)) {
        return;
      }

      toggleSelectedMenu(code);
      container.innerHTML = renderPlanPage();
      setupPlanPageInteractions(container);
    });
  });
}
