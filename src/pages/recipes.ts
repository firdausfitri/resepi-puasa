import { getAllRecipes } from '../lib/data';
import { escapeHtml } from '../lib/utils';

export function renderRecipesPage(): string {
  const recipeLinks = getAllRecipes()
    .map(
      (recipe) =>
        `<a class="chip-link" href="#/recipes/${encodeURIComponent(recipe.code)}">${escapeHtml(
          recipe.code,
        )}</a>`,
    )
    .join('');

  return `
    <section class="page-card">
      <h1>Senarai Resepi</h1>
      <p>Pilih kod menu untuk buka halaman resepi.</p>
      <div class="chip-row">${recipeLinks}</div>
    </section>
  `;
}
