import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base supaya build statik berfungsi di root domain
  // atau subpath (contoh GitHub Pages /<repo>/) tanpa ubah router hash.
  base: './',
});
