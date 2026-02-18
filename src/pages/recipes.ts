import { getAllRecipes } from '../lib/data';
import { escapeHtml } from '../lib/utils';

export function renderRecipesPage(): string {
  const recipeCards = getAllRecipes()
    .map((recipe) => {
      return `
        <a class="recipe-list-card" href="#/recipes/${encodeURIComponent(recipe.code)}">
          <div class="recipe-list-head">
            <span class="menu-code-chip">${escapeHtml(recipe.code)}</span>
            <span class="recipe-list-arrow" aria-hidden="true">→</span>
          </div>
          <h2 class="recipe-list-title">${escapeHtml(recipe.title)}</h2>
          <p class="recipe-list-summary">${escapeHtml(recipe.summary)}</p>
        </a>
      `;
    })
    .join('');

  return `
    <section class="page-card">
      <h1>Senarai Resepi</h1>
      <p class="page-subline">Tap resepi untuk buka mod dapur, langkah ringkas, dan print.</p>
      <div class="recipe-list-grid">${recipeCards}</div>
    </section>
  `;
}
