import { ingredients } from '../data/ingredients';
import { recipes } from '../data/recipes';
import type { Ingredient, MenuCode, Recipe } from '../data/types';

export function getRecipe(code: MenuCode): Recipe | undefined {
  return recipes.find((recipe) => recipe.code === code);
}

export function getAllRecipes(): Recipe[] {
  return [...recipes];
}

export function getAllIngredients(): Ingredient[] {
  return [...ingredients];
}

export function getIngredientsForMenus(menuCodes: MenuCode[]): Ingredient[] {
  const selectedMenus = new Set(menuCodes);
  const deduped = new Map<string, Ingredient>();

  ingredients.forEach((ingredient) => {
    if (ingredient.menuCodes.some((menuCode) => selectedMenus.has(menuCode))) {
      deduped.set(ingredient.id, ingredient);
    }
  });

  return Array.from(deduped.values());
}

export function groupIngredientsByCategory(
  ingredientList: Ingredient[],
): Record<string, Ingredient[]> {
  return ingredientList.reduce<Record<string, Ingredient[]>>((grouped, ingredient) => {
    if (!grouped[ingredient.category]) {
      grouped[ingredient.category] = [];
    }

    grouped[ingredient.category].push(ingredient);
    return grouped;
  }, {});
}
