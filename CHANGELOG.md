# Changelog

Semua perubahan penting untuk projek ini direkodkan di sini.

Format ini berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) dan projek ini guna versi semantik ringkas.

## [Unreleased]

### Added
- Auto deploy GitHub Pages melalui GitHub Actions (`deploy-pages.yml`) untuk build + publish `dist` pada setiap push ke `main`.

### Changed
- Dokumentasi deployment dalam `README.md` ditukar daripada aliran manual `docs/` kepada aliran auto deploy GitHub Actions.

## [0.2.0] - 2026-02-18

### Added
- Kad "Menu Hari Ini" pada halaman Plan dengan tindakan pantas ke resepi atau tambah ke Shopping List.
- Paparan "Hari ke-X Ramadan di Malaysia" berdasarkan tarikh mula 1 Ramadan pada 19 Februari (zon masa `Asia/Kuala_Lumpur`).
- Penanda visual "Hari ini" pada kad menu mingguan.

### Changed
- Label pelan mingguan ditukar daripada `Hari 1-7` kepada `Isnin-Ahad`.
- Interaksi "Tambah ke Shopping List" kini menyegerak status untuk semua butang/kad menu kod yang sama.
- Kemas kini data bahan untuk ketepatan sukatan dan padanan menu:
  - tambah `kunyit-hidup` untuk PPT
  - kemas kini kuantiti beberapa bahan (contoh: `bawang-holland`, `cili-kisar`, `limau-nipis`, `rempah-kurma-ayam`, `air-asam-jawa`)
  - kemas kini pemetaan `menuCodes` (contoh: `cili-padi-merah`, `kicap-manis`, `gula`)
  - buang bahan `cili-padi-hijau` daripada senarai induk
- Kemas kini kandungan resepi (ringkasan, tag, langkah ringkas, langkah penuh):
  - HLA (Ayam Halia Air Fryer)
  - PKP (Pad Ka Prao)
  - BLD (Ayam Balado Hijau)
  - KRM (Ayam Masak Kurma)
  - BPP (Ayam Black Pepper)
