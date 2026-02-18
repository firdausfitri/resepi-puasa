import { ingredients } from './ingredients';
import type { MenuCode, Recipe } from './types';

const recipeSeeds: Array<Omit<Recipe, 'ingredientIds'>> = [
  {
    code: 'PPT',
    title: 'Ayam Phat Phet Thai',
    summary: 'Ayam pedas gaya Thai dengan herba segar dan rasa masam manis.',
    tags: ['Thai', 'Pedas', 'Tumis'],
    stepsShort: [
      'Sediakan bahan kisar asas dan potong ayam.',
      'Tumis bahan sehingga naik bau.',
      'Masukkan ayam dan kacau hingga separuh masak.',
      'Tambah sos/perasa, sayur, dan siap dihidang.',
    ],
    stepsFull: [
      'Sediakan semua bahan ikut sukatan dan asingkan bahan herba, sos, dan sayur.',
      'Panaskan minyak, tumis bawang, halia, serai, dan cili hingga wangi.',
      'Masukkan ayam, gaul rata sehingga ayam bertukar warna dan separuh masak.',
      'Masukkan sos ikan, serbuk kunyit, garam, gula, dan perasa lain ikut citarasa.',
      'Akhir sekali masukkan daun limau purut, sayur, dan pelaras akhir sebelum hidang.',
    ],
  },
  {
    code: 'KCP',
    title: 'Ayam Kicap Pedas',
    summary: 'Ayam kicap dengan gabungan rasa manis, masin, dan pedas padu.',
    tags: ['Melayu', 'Pedas', 'Kicap'],
    stepsShort: [
      'Perap ayam dengan garam ringkas.',
      'Tumis bahan kisar hingga pecah minyak.',
      'Masukkan ayam dan kuah kicap.',
      'Masak hingga pekat dan seimbang rasa.',
    ],
    stepsFull: [
      'Sediakan bahan tumis seperti bawang, halia, cili, serai, dan daun kari.',
      'Panaskan minyak, tumis bahan sehingga naik bau dan pecah minyak.',
      'Masukkan ayam dan gaul sehingga ayam bersalut sambal.',
      'Tambah sos tiram, kicap manis, kicap manis pedas, dan perasa sokongan.',
      'Reneh atas api sederhana hingga kuah pekat dan ayam masak sepenuhnya.',
    ],
  },
  {
    code: 'HLA',
    title: 'Ayam Halia Air Fryer',
    summary: 'Ayam berempah halia yang rangup ringan menggunakan air fryer.',
    tags: ['Air Fryer', 'Ringkas', 'Halia'],
    stepsShort: [
      'Gaul ayam dengan halia dan sos.',
      'Tambahkan sedikit tepung jagung.',
      'Susun dalam bakul air fryer.',
      'Masak hingga garing keemasan.',
    ],
    stepsFull: [
      'Satukan ayam, bawang, bawang putih, halia, sos tiram, garam, dan minyak.',
      'Gaul dengan tepung jagung sehingga bersalut nipis untuk tekstur garing.',
      'Susun ayam dalam satu lapisan dan masak dalam air fryer mengikut suhu sesuai.',
      'Terbalikkan ayam di pertengahan masa untuk masak sekata.',
      'Siap apabila ayam masak penuh dan permukaan keperangan.',
    ],
  },
  {
    code: 'PKP',
    title: 'Pad Ka Prao',
    summary: 'Ayam tumis pedas wangi daun selasih dengan profil rasa Thai asli.',
    tags: ['Thai', 'Daun Selasih', 'Cepat'],
    stepsShort: [
      'Tumis bawang dan cili hingga wangi.',
      'Masukkan ayam dan kacau laju.',
      'Tuang campuran sos Thai asas.',
      'Akhiri dengan daun selasih.',
    ],
    stepsFull: [
      'Sediakan bahan tumis seperti bawang, cili padi, dan minyak secukupnya.',
      'Panaskan minyak, tumis bahan sehingga naik bau.',
      'Masukkan ayam dan kacau sehingga ayam hampir masak.',
      'Masukkan kicap manis, kicap cair, sos tiram, sos ikan, sos perasa Maggi, garam, dan gula.',
      'Masukkan daun selasih di akhir proses dan kacau ringkas sebelum hidang.',
    ],
  },
  {
    code: 'BLD',
    title: 'Ayam Balado Hijau',
    summary: 'Ayam balado pedas segar dengan cili hijau dan sentuhan limau.',
    tags: ['Indonesia', 'Balado', 'Pedas Hijau'],
    stepsShort: [
      'Goreng atau panggang ayam separuh masak.',
      'Kisar cili hijau dan bahan aromatik.',
      'Tumis pes hingga pecah minyak.',
      'Masukkan ayam dan perah limau nipis.',
    ],
    stepsFull: [
      'Sediakan ayam dan bahan balado hijau seperti cili padi hijau, cili hijau besar, bawang, halia, serai, dan daun limau purut.',
      'Tumis pes balado sehingga pecah minyak dan naik bau.',
      'Masukkan ayam dan gaul sehingga semua bahagian bersalut sambal.',
      'Perasakan dengan garam, gula, dan serbuk kunyit sehingga seimbang.',
      'Akhiri dengan perahan limau nipis untuk rasa segar sebelum hidang.',
    ],
  },
  {
    code: 'KRM',
    title: 'Ayam Masak Kurma',
    summary: 'Kurma ayam berkuah lemak sederhana dengan rempah aromatik.',
    tags: ['Kurma', 'Berkuah', 'Keluarga'],
    stepsShort: [
      'Tumis rempah tumis dan bahan kisar.',
      'Masukkan ayam bersama rempah kurma.',
      'Tambahkan santan dan sayur.',
      'Reneh hingga kuah pekat berlemak.',
    ],
    stepsFull: [
      'Panaskan minyak, tumis rempah tumis hingga wangi.',
      'Masukkan bawang, bawang putih, halia, dan tumis sehingga layu.',
      'Masukkan ayam bersama rempah kurma ayam dan gaul rata.',
      'Tambahkan santan pekat, air asam jawa, kentang, lobak merah, dan tomato.',
      'Perasakan dengan garam dan gula, kemudian reneh hingga ayam dan sayur masak lembut.',
    ],
  },
  {
    code: 'BPP',
    title: 'Ayam Black Pepper',
    summary: 'Ayam tumis lada hitam pekat dengan rasa berempah dan smoky.',
    tags: ['Black Pepper', 'Tumis', 'Pekat'],
    stepsShort: [
      'Perap ayam dengan lada hitam dan sos.',
      'Tumis bawang hingga layu.',
      'Masukkan ayam dan goreng seketika.',
      'Tambah slurry tepung jagung hingga kuah berkilat.',
    ],
    stepsFull: [
      'Gaul ayam dengan lada hitam, sos tiram, kicap manis, garam, dan sedikit minyak.',
      'Panaskan kuali dan tumis bawang serta halia sehingga wangi.',
      'Masukkan ayam, kacau sehingga ayam masak dan sos mula memekat.',
      'Tambah bancuhan tepung jagung untuk tekstur kuah berkilat.',
      'Laraskan rasa akhir dan hidang panas.',
    ],
  },
];

function ingredientIdsFor(code: MenuCode): string[] {
  return ingredients
    .filter((ingredient) => ingredient.menuCodes.includes(code))
    .map((ingredient) => ingredient.id);
}

export const recipes: Recipe[] = recipeSeeds.map((seed) => ({
  ...seed,
  ingredientIds: ingredientIdsFor(seed.code),
}));
