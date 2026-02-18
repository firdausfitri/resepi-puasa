# Changelog

Semua perubahan penting untuk projek ini direkodkan di sini.

Format ini berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) dan projek ini guna versi semantik ringkas.

## [Unreleased]

Tiada perubahan buat masa ini.

## [0.3.1] - 2026-02-19

### Added
- Motion polish untuk rasa UI lebih moden:
  - page enter transition (fade + slide ringan)
  - stagger reveal untuk kad/list utama
  - animasi pop pada floating cart badge bila bilangan menu berubah
  - animasi check/toggle untuk item checklist
- Respect `prefers-reduced-motion` untuk aksesibiliti.

### Changed
- Halaman Checklist dipermudah:
  - buang butang `Cart` dalam halaman (guna floating cart sahaja)
  - tukar butang `Reset Tanda` kepada `Untick All`
  - kemas semula susun atur controls supaya lebih ringkas untuk pengguna baru
- Micro-interactions diperhalus pada butang, chip, kad, dan row checklist (hover/press/feedback).

## [0.3.0] - 2026-02-19

### Added
- Auto deploy GitHub Pages melalui GitHub Actions (`deploy-pages.yml`) untuk build + publish `dist` pada setiap push ke `main`.
- Route baru `#/cart` dan `#/checkout` dalam hash router.
- Floating cart button (kanan bawah) dengan badge kiraan menu dipilih.
- Halaman `Cart` khusus untuk semak/buang menu sebelum checkout.
- Halaman `Checkout` khusus dengan 3 utiliti utama: `Copy`, `CSV`, `Print`.
- Event sync `selectedmenuschange` dalam storage untuk pastikan badge cart sentiasa terkini.

### Changed
- Dokumentasi deployment dalam `README.md` ditukar daripada aliran manual `docs/` kepada aliran auto deploy GitHub Actions.
- Navbar dipermudah kepada 3 tab utama: `Menu`, `Checklist`, `Resepi`.
- Aliran belian dipisahkan supaya `Checklist` fokus pada semakan bahan, manakala utiliti export/copy/print dipindah ke `Checkout`.
- UI tindakan tambah menu pada Plan/Resepi ditukar kepada ikon cart (kurang teks, lebih cepat dibaca di mobile).
- Gaya global dikemas semula untuk konsistensi kad, butang, chip, cart, dan halaman checkout.

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
