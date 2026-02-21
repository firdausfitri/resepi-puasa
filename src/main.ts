import { renderNavbar, setActiveNav } from './components/navbar';
import { resolveHashRoute, type RouteMatch } from './lib/router';
import { getSelectedMenus } from './lib/storage';
import { renderCartPage, setupCartPageInteractions } from './pages/cart';
import { renderCheckoutPage, setupCheckoutPageInteractions } from './pages/checkout';
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
    <a class="floating-cart print-hidden" href="#/cart" data-floating-cart aria-label="Buka cart menu">
      <svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6l-2-3H1" />
        <path d="M9 20a1.5 1.5 0 1 0 0.001 0zM18 20a1.5 1.5 0 1 0 0.001 0z" />
      </svg>
      <span class="floating-cart-badge" data-floating-cart-badge>0</span>
    </a>
  </div>
`;

const routeView = appElement.querySelector<HTMLElement>('#route-view');

if (!routeView) {
  throw new Error('Elemen #route-view tidak ditemui.');
}

const routeViewElement: HTMLElement = routeView;
const floatingCartElement = appElement.querySelector<HTMLElement>('[data-floating-cart]');
const floatingCartBadgeElement = appElement.querySelector<HTMLElement>('[data-floating-cart-badge]');
let previousSelectedMenusCount: number | null = null;
let routeAnimationFrameId: number | null = null;
let routeEnterResetTimeoutId: number | null = null;

function triggerRouteEnterAnimation(): void {
  routeViewElement.classList.remove('is-route-entering');

  if (routeAnimationFrameId !== null) {
    window.cancelAnimationFrame(routeAnimationFrameId);
  }

  routeAnimationFrameId = window.requestAnimationFrame(() => {
    routeViewElement.classList.add('is-route-entering');

    if (routeEnterResetTimeoutId !== null) {
      window.clearTimeout(routeEnterResetTimeoutId);
    }

    routeEnterResetTimeoutId = window.setTimeout(() => {
      routeViewElement.classList.remove('is-route-entering');
      routeEnterResetTimeoutId = null;
    }, 380);

    routeAnimationFrameId = null;
  });
}

function updateFloatingCart(routeName: RouteMatch['name']): void {
  const selectedMenusCount = getSelectedMenus().length;
  const shouldAnimateCount =
    previousSelectedMenusCount !== null && previousSelectedMenusCount !== selectedMenusCount;

  if (floatingCartBadgeElement) {
    floatingCartBadgeElement.textContent = selectedMenusCount > 99 ? '99+' : String(selectedMenusCount);
    floatingCartBadgeElement.classList.toggle('is-hidden', selectedMenusCount === 0);

    if (shouldAnimateCount) {
      floatingCartBadgeElement.classList.remove('is-bump');
      void floatingCartBadgeElement.offsetWidth;
      floatingCartBadgeElement.classList.add('is-bump');
    }
  }

  if (floatingCartElement) {
    floatingCartElement.classList.toggle('is-active', routeName === 'cart' || routeName === 'checkout');

    if (shouldAnimateCount) {
      floatingCartElement.classList.remove('is-bump');
      void floatingCartElement.offsetWidth;
      floatingCartElement.classList.add('is-bump');
    }
  }

  previousSelectedMenusCount = selectedMenusCount;
}

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

  if (match.name === 'cart') {
    return renderCartPage();
  }

  if (match.name === 'checkout') {
    return renderCheckoutPage();
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
  updateFloatingCart(routeMatch.name);

  if (routeMatch.name !== 'recipe') {
    document.body.classList.remove('kitchen-mode');
  }

  routeViewElement.innerHTML = pageForRoute(routeMatch);
  triggerRouteEnterAnimation();

  if (routeMatch.name === 'plan') {
    setupPlanPageInteractions(routeViewElement);
  }

  if (routeMatch.name === 'shopping') {
    setupShoppingPageInteractions(routeViewElement);
  }

  if (routeMatch.name === 'cart') {
    setupCartPageInteractions(routeViewElement);
  }

  if (routeMatch.name === 'checkout') {
    setupCheckoutPageInteractions(routeViewElement);
  }

  if (routeMatch.name === 'recipe') {
    setupRecipePageInteractions(routeViewElement);
  }
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('selectedmenuschange', () => {
  const routeMatch = resolveHashRoute(window.location.hash);

  if (!routeMatch) {
    return;
  }

  updateFloatingCart(routeMatch.name);
});

if (!window.location.hash || !resolveHashRoute(window.location.hash)) {
  window.location.hash = '/plan';
} else {
  renderRoute();
}
