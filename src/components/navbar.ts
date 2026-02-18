import type { RouteName } from '../lib/router';

type NavKey = 'plan' | 'shopping' | 'recipes';

function routeToNavKey(route: RouteName): NavKey {
  return route === 'recipe' ? 'recipes' : route;
}

export function renderNavbar(): string {
  return `
    <nav class="navbar" aria-label="Navigasi utama">
      <a class="nav-link" data-nav="plan" href="#/plan">Plan 7 Hari</a>
      <a class="nav-link" data-nav="shopping" href="#/shopping">Shopping List</a>
      <a class="nav-link" data-nav="recipes" href="#/recipes">Resepi</a>
    </nav>
  `;
}

export function setActiveNav(route: RouteName): void {
  const activeNav = routeToNavKey(route);

  document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
    if (link.dataset.nav === activeNav) {
      link.setAttribute('aria-current', 'page');
      return;
    }

    link.removeAttribute('aria-current');
  });
}
