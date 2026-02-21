import { MENU_CODES, type MenuCode } from '../data/types';
import { getRecipe } from '../lib/data';
import { getSelectedMenus, toggleSelectedMenu } from '../lib/storage';
import { escapeHtml } from '../lib/utils';

interface WeekPlanItem {
  dayLabel: string;
  code: MenuCode;
}

interface MalaysiaHijriDateParts {
  day: number;
  month: string;
  year: number;
}

interface MalaysiaGregorianDateParts {
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
const KNOWN_RAMADAN_START_BY_GREGORIAN_YEAR: Record<number, string> = {
  // Tarikh rasmi Malaysia (MABIMS) untuk 2026.
  2026: '2026-02-19',
};

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

function getMalaysiaHijriDateParts(): MalaysiaHijriDateParts | null {
  const dateParts = new Intl.DateTimeFormat('ms-MY-u-ca-islamic', {
    timeZone: MALAYSIA_TIMEZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatToParts(new Date());

  const day = Number(dateParts.find((part) => part.type === 'day')?.value?.replace(/[^\d]/g, '') ?? '0');
  const month = dateParts.find((part) => part.type === 'month')?.value?.trim() ?? '';
  const year = Number(dateParts.find((part) => part.type === 'year')?.value?.replace(/[^\d]/g, '') ?? '0');

  if (!Number.isFinite(day) || day <= 0 || !month || !Number.isFinite(year) || year <= 0) {
    return null;
  }

  return { day, month, year };
}

function getMalaysiaGregorianDateParts(): MalaysiaGregorianDateParts | null {
  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: MALAYSIA_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(new Date());

  const year = Number(dateParts.find((part) => part.type === 'year')?.value ?? '0');
  const month = Number(dateParts.find((part) => part.type === 'month')?.value ?? '0');
  const day = Number(dateParts.find((part) => part.type === 'day')?.value ?? '0');

  if (!Number.isFinite(year) || year <= 0 || !Number.isFinite(month) || month <= 0 || month > 12) {
    return null;
  }

  if (!Number.isFinite(day) || day <= 0 || day > 31) {
    return null;
  }

  return { year, month, day };
}

function getKnownRamadanDayInMalaysia(): number | null {
  const malaysiaDate = getMalaysiaGregorianDateParts();

  if (!malaysiaDate) {
    return null;
  }

  const startDateIso = KNOWN_RAMADAN_START_BY_GREGORIAN_YEAR[malaysiaDate.year];

  if (!startDateIso) {
    return null;
  }

  const [startYear, startMonth, startDay] = startDateIso.split('-').map((value) => Number(value));

  if (!startYear || !startMonth || !startDay) {
    return null;
  }

  const dayInMs = 24 * 60 * 60 * 1000;
  const malaysiaDayStamp = Date.UTC(malaysiaDate.year, malaysiaDate.month - 1, malaysiaDate.day);
  const ramadanStartStamp = Date.UTC(startYear, startMonth - 1, startDay);
  const dayDiff = Math.floor((malaysiaDayStamp - ramadanStartStamp) / dayInMs);

  if (dayDiff < 0 || dayDiff > 29) {
    return null;
  }

  return dayDiff + 1;
}

function getRamadanMessage(): string {
  const hijriDate = getMalaysiaHijriDateParts();
  const knownRamadanDay = getKnownRamadanDayInMalaysia();

  if (knownRamadanDay !== null) {
    if (!hijriDate) {
      return `${knownRamadanDay} Ramadan`;
    }

    return `${knownRamadanDay} Ramadan ${hijriDate.year}H`;
  }

  if (!hijriDate) {
    return 'Tarikh Hijri';
  }

  return `${hijriDate.day} ${hijriDate.month} ${hijriDate.year}H`;
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
  const totalMenus = WEEK_PLAN.length;
  const ramadanMessage = getRamadanMessage();

  const cards = WEEK_PLAN.map((item, index) => {
    const recipe = getRecipe(item.code);
    const isSelected = selectedMenus.has(item.code);
    const isToday = index === todayIndex;
    const title = recipe?.title ?? `Menu ${item.code}`;
    const revealIndex = Math.min(index + 2, 10);

    return `
      <article
        class="plan-card ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}"
        data-menu="${escapeHtml(item.code)}"
        data-reveal
        style="--reveal-index:${revealIndex};"
      >
        <div class="plan-card-head">
          <p class="day-label">${escapeHtml(item.dayLabel)}</p>
          <div class="plan-chip-group">
            ${isToday ? '<span class="today-badge">Hari ini</span>' : ''}
            ${isSelected ? '<span class="plan-cart-status">Dalam cart</span>' : ''}
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
    <section class="page-card plan-page">
      <h1>Plan 7 Hari</h1>
      <p class="page-subline">Pilih menu ikut hari, kemudian semak di Cart.</p>
      <div class="pill-row" aria-label="Ringkasan plan">
        <span class="pill is-accent">Dipilih: ${selectedCount}/${totalMenus}</span>
        <span class="pill">${escapeHtml(ramadanMessage)}</span>
      </div>

      <section
        class="today-plan-card"
        data-menu="${escapeHtml(todayPlan.code)}"
        aria-label="Menu hari ini"
        data-reveal
        style="--reveal-index:1;"
      >
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
