# Resepi Puasa (Static Vite App)

Aplikasi statik mobile-first untuk:
- rancang menu 7 hari,
- semak resepi ikut kod,
- jana shopping list berasaskan menu dipilih.

Projek ini guna hash routing (`#/...`) supaya boleh deploy di static hosting tanpa rewrite rules.

## Stack
- Vite + Vanilla TypeScript
- Custom hash router (tanpa framework/router library)
- Data statik dalam `src/data`
- State setempat guna `localStorage`

## Route
- `#/plan`
- `#/shopping`
- `#/recipes/:code`

## Jalankan Secara Lokal
```bash
npm install
npm run dev
```

Build production:
```bash
npm run build
```

Preview build:
```bash
npm run preview
```

## Struktur Penting
- `src/data/types.ts`: type shared (`MenuCode`, `Ingredient`, `Recipe`)
- `src/data/ingredients.ts`: master ingredients
- `src/data/recipes.ts`: 7 resepi + `stepsShort` / `stepsFull`
- `src/lib/data.ts`: helper data aggregation
- `src/lib/storage.ts`: helper persistence localStorage
- `src/pages/plan.ts`: plan 7 hari
- `src/pages/recipe.ts`: paparan resepi + dapur mode
- `src/pages/shopping.ts`: aggregation shopping + checkbox + copy/csv

## Cara Edit Data
### Edit resepi
Fail: `src/data/recipes.ts`
- Setiap resepi ada:
  - `code`
  - `title`
  - `summary`
  - `tags`
  - `stepsShort`
  - `stepsFull`
- `ingredientIds` dijana automatik daripada mapping `menuCodes` di ingredients.

### Edit ingredients
Fail: `src/data/ingredients.ts`
- Gunakan `id` stabil format kebab-case (contoh `bawang-putih`)
- Tetapkan `menuCodes` supaya aggregation shopping betul.
- `quantity` dan `notes` opsyenal.

### Panduan tambah resepi baru (ringkas)
1. Tambah `code` baru dalam `src/data/types.ts` (`MENU_CODES`) jika perlu.
2. Tambah resepi dalam `src/data/recipes.ts`.
3. Kemaskini `menuCodes` ingredients berkaitan dalam `src/data/ingredients.ts`.
4. Jika code baharu perlu masuk plan 7 hari, kemaskini urutan di `src/pages/plan.ts`.

## LocalStorage Keys
Diurus oleh `src/lib/storage.ts`:
- `selectedMenusV1`: menu yang dipilih untuk shopping list
- `checkedIngredientsV1`: tanda bahan yang sudah dibeli
- `kitchenModeV1`: status Dapur Mode (ON/OFF)

## Deployment
### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Tiada rewrite rules diperlukan sebab route guna hash (`#/...`).

### GitHub Pages
1. Jalankan `npm run build`
2. Publish kandungan `dist` ke branch/pages source pilihan anda.
3. Hash route kekal berfungsi tanpa rewrite.

Nota base path:
- `vite.config.ts` guna `base: './'` supaya asset path relatif dan selamat untuk root atau subpath (`/<repo>/`).

## QA Ringkas Selepas Edit
1. `npm run build` mesti lulus.
2. `npm run preview` dan uji:
   - `#/plan`: tambah menu.
   - `#/shopping`: menu muncul, checkbox persist selepas refresh, copy/csv ikut filter.
   - `#/recipes/KCP`: dapur mode persist, print preview bersih.
