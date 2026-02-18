import type { RouteName } from '../lib/router';

type NavKey = 'plan' | 'shopping' | 'recipes';

function routeToNavKey(route: RouteName): NavKey | null {
  if (route === 'recipe') {
    return 'recipes';
  }

  if (route === 'cart' || route === 'checkout') {
    return null;
  }

  return route;
}

export function renderNavbar(): string {
  return `
    <nav class="navbar" aria-label="Navigasi utama">
      <a class="nav-link" data-nav="plan" href="#/plan">
        <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M7 3v2M17 3v2M3 9h18" />
          <path d="M6 5h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" />
          <path d="M7 13h4M7 17h3M13 13h4M13 17h4" />
        </svg>
        <span class="nav-label">Menu</span>
      </a>
      <a class="nav-link" data-nav="shopping" href="#/shopping">
        <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M8 6h11" />
          <path d="M8 12h11" />
          <path d="M8 18h11" />
          <path d="M4 6h.01M4 12h.01M4 18h.01" />
        </svg>
        <span class="nav-label">Checklist</span>
      </a>
      <a class="nav-link" data-nav="recipes" href="#/recipes">
        <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 3h14v18H6a3 3 0 0 0-3 3V6a3 3 0 0 1 3-3z" />
          <path d="M20 21H6" />
          <path d="M8 7h8M8 11h8M8 15h6" />
        </svg>
        <span class="nav-label">Resepi</span>
      </a>
    </nav>
  `;
}

export function setActiveNav(route: RouteName): void {
  const activeNav = routeToNavKey(route);

  document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
    if (activeNav && link.dataset.nav === activeNav) {
      link.setAttribute('aria-current', 'page');
      return;
    }

    link.removeAttribute('aria-current');
  });
}
