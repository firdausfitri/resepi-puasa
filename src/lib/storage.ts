import { MENU_CODES, type MenuCode } from '../data/types';

const STORAGE_KEY = 'selectedMenusV1';
const KITCHEN_MODE_KEY = 'kitchenModeV1';
const CHECKED_INGREDIENTS_KEY = 'checkedIngredientsV1';

let memoryMenus: MenuCode[] = [];
let memoryKitchenMode = false;
let memoryCheckedIngredients: Record<string, boolean> = {};

function isMenuCode(value: unknown): value is MenuCode {
  return typeof value === 'string' && MENU_CODES.includes(value as MenuCode);
}

function normalizeMenus(value: unknown): MenuCode[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const dedupedMenus = new Set<MenuCode>();

  value.forEach((item) => {
    if (isMenuCode(item)) {
      dedupedMenus.add(item);
    }
  });

  return Array.from(dedupedMenus);
}

function getMenusFromStorage(): MenuCode[] | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (rawValue === null) {
      return null;
    }

    return normalizeMenus(JSON.parse(rawValue));
  } catch {
    return null;
  }
}

function writeMenusToStorage(menus: MenuCode[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  } catch {
    // localStorage tidak tersedia; fallback kekal dalam memori.
  }
}

function normalizeCheckedIngredientMap(value: unknown): Record<string, boolean> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return {};
  }

  const normalizedMap: Record<string, boolean> = {};

  Object.entries(value).forEach(([key, itemValue]) => {
    if (typeof key === 'string' && key.trim() && typeof itemValue === 'boolean') {
      normalizedMap[key] = itemValue;
    }
  });

  return normalizedMap;
}

function getCheckedMapFromStorage(): Record<string, boolean> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(CHECKED_INGREDIENTS_KEY);

    if (rawValue === null) {
      return null;
    }

    return normalizeCheckedIngredientMap(JSON.parse(rawValue));
  } catch {
    return null;
  }
}

function writeCheckedMapToStorage(map: Record<string, boolean>): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CHECKED_INGREDIENTS_KEY, JSON.stringify(map));
  } catch {
    // Fallback memori sahaja.
  }
}

export function getSelectedMenus(): MenuCode[] {
  const storedMenus = getMenusFromStorage();

  if (storedMenus !== null) {
    memoryMenus = storedMenus;
    return [...storedMenus];
  }

  return [...memoryMenus];
}

export function setSelectedMenus(menus: MenuCode[]): void {
  const normalizedMenus = normalizeMenus(menus);
  memoryMenus = normalizedMenus;
  writeMenusToStorage(normalizedMenus);
}

export function addSelectedMenu(code: MenuCode): MenuCode[] {
  const updatedMenus = normalizeMenus([...getSelectedMenus(), code]);
  setSelectedMenus(updatedMenus);
  return updatedMenus;
}

export function clearSelectedMenus(): void {
  memoryMenus = [];

  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fallback memori sahaja.
  }
}

export function getKitchenMode(): boolean {
  if (typeof window === 'undefined') {
    return memoryKitchenMode;
  }

  try {
    const rawValue = window.localStorage.getItem(KITCHEN_MODE_KEY);

    if (rawValue === null) {
      return memoryKitchenMode;
    }

    const parsedValue = JSON.parse(rawValue);
    memoryKitchenMode = parsedValue === true;
    return memoryKitchenMode;
  } catch {
    return memoryKitchenMode;
  }
}

export function setKitchenMode(isEnabled: boolean): void {
  memoryKitchenMode = isEnabled;

  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(KITCHEN_MODE_KEY, JSON.stringify(isEnabled));
  } catch {
    // Fallback memori sahaja.
  }
}

export function getCheckedIngredientMap(): Record<string, boolean> {
  const storedMap = getCheckedMapFromStorage();

  if (storedMap !== null) {
    memoryCheckedIngredients = storedMap;
    return { ...storedMap };
  }

  return { ...memoryCheckedIngredients };
}

export function setCheckedIngredientMap(map: Record<string, boolean>): void {
  const normalizedMap = normalizeCheckedIngredientMap(map);
  memoryCheckedIngredients = normalizedMap;
  writeCheckedMapToStorage(normalizedMap);
}

export function toggleCheckedIngredient(id: string): Record<string, boolean> {
  const currentMap = getCheckedIngredientMap();
  const updatedMap = {
    ...currentMap,
    [id]: !currentMap[id],
  };

  setCheckedIngredientMap(updatedMap);
  return updatedMap;
}

export function clearCheckedIngredients(): void {
  memoryCheckedIngredients = {};

  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(CHECKED_INGREDIENTS_KEY);
  } catch {
    // Fallback memori sahaja.
  }
}
