export const MENU_CODES = ['PPT', 'KCP', 'HLA', 'PKP', 'BLD', 'KRM', 'BPP'] as const;

export type MenuCode = (typeof MENU_CODES)[number];

export type IngredientCategory =
  | 'Ayam'
  | 'Bawang & Halia'
  | 'Cili'
  | 'Herba & Aromatik'
  | 'Sayur Tambahan'
  | 'Santan & Tenusu'
  | 'Sos & Perasa'
  | 'Minuman'
  | 'Lain-lain';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  menuCodes: MenuCode[];
  quantity?: string;
  notes?: string;
}

export interface Recipe {
  code: MenuCode;
  title: string;
  summary: string;
  tags: string[];
  tiktokUrl?: string;
  ingredientIds: string[];
  stepsShort: string[];
  stepsFull: string[];
}
