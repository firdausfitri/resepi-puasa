import { renderNavbar, setActiveNav } from './components/navbar';
import { resolveHashRoute, type RouteMatch } from './lib/router';
import { renderPlanPage, setupPlanPageInteractions } from './pages/plan';
import { renderRecipePage, setupRecipePageInteractions } from './pages/recipe';
import { renderRecipesPage } from './pages/recipes';
import { renderShoppingPage, setupShoppingPageInteractions } from './pages/shopping';
import './styles/global.css';

const appElement = document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
  throw new Error('Elemen #app tidak ditemui.');
}

appElement.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <p class="brand">Resepi Puasa</p>
      ${renderNavbar()}
    </header>
    <main id="route-view" class="route-view" aria-live="polite"></main>
  </div>
`;

const routeView = appElement.querySelector<HTMLElement>('#route-view');

if (!routeView) {
  throw new Error('Elemen #route-view tidak ditemui.');
}

const routeViewElement: HTMLElement = routeView;

function pageForRoute(match: RouteMatch): string {
  if (match.name === 'plan') {
    return renderPlanPage();
  }

  if (match.name === 'shopping') {
    return renderShoppingPage();
  }

  if (match.name === 'recipes') {
    return renderRecipesPage();
  }

  return renderRecipePage(match.params.code ?? '');
}

function renderRoute(): void {
  const routeMatch = resolveHashRoute(window.location.hash);

  if (!routeMatch) {
    window.location.hash = '/plan';
    return;
  }

  setActiveNav(routeMatch.name);
  routeViewElement.innerHTML = pageForRoute(routeMatch);

  if (routeMatch.name === 'plan') {
    setupPlanPageInteractions(routeViewElement);
  }

  if (routeMatch.name === 'shopping') {
    setupShoppingPageInteractions(routeViewElement);
  }

  if (routeMatch.name === 'recipe') {
    setupRecipePageInteractions(routeViewElement);
  }
}

window.addEventListener('hashchange', renderRoute);

if (!window.location.hash || !resolveHashRoute(window.location.hash)) {
  window.location.hash = '/plan';
} else {
  renderRoute();
}
