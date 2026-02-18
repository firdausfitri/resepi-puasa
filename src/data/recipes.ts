import { ingredients } from './ingredients';
import type { MenuCode, Recipe } from './types';

const recipeSeeds: Array<Omit<Recipe, 'ingredientIds'>> = [
  {
    code: 'PPT',
    title: 'Ayam Phat Phet Thai',
    summary: 'Ayam pedas gaya Thai dengan herba segar dan rasa masam manis.',
    tags: ['Thai', 'Pedas', 'Tumis'],
    stepsShort: [
      'Lumurkan ayam dengan garam dan serbuk kunyit, kemudian goreng hingga garing.',
      'Kisar bawang merah, bawang putih, halia, dan kunyit hidup; tumis hingga pecah minyak bersama serai.',
      'Masukkan cili padi, daun limau purut, sos ikan, dan air asam jawa.',
      'Masukkan ayam goreng bersama baby corn & kacang panjang, tambah sedikit air jika mahu berkuah.',
    ],
    stepsFull: [
      'Bersihkan ayam dan lumurkan dengan garam serta serbuk kunyit.',
      'Goreng ayam sehingga garing, kemudian angkat dan ketepikan.',
      'Dalam kuali yang sama, tumis bahan blender: bawang merah, bawang putih, halia, dan kunyit hidup hingga naik bau.',
      'Masukkan serai dan teruskan tumis sehingga pecah minyak.',
      'Masukkan cili padi, daun limau purut, sos ikan, dan air asam jawa. Kacau hingga sebati.',
      'Masukkan ayam yang digoreng bersama baby corn dan kacang panjang. Gaul rata.',
      'Jika inginkan lebih kuah, tambahkan sedikit air. Laraskan rasa (garam/gula/serbuk perasa) dan siap dihidang.',
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
    summary: 'Ayam perap sos tiram-kicap manis dengan sos halia tumis ringkas.',
    tags: ['Air Fryer', 'Halia', 'Khairul Aming'],
    stepsShort: [
      'Perap ayam dengan sos tiram, kicap manis, garam, dan minyak.',
      'Bakar ayam dalam air fryer/oven pada 180-200C selama 20 minit.',
      'Tumis bawang, halia, cili padi, dan bawang holland hingga naik bau.',
      'Masukkan sos tiram dan bancuhan air tepung jagung, kemudian curah atas ayam.',
    ],
    stepsFull: [
      'Satukan ayam, sos tiram, kicap manis, garam, dan minyak masak. Lumur rata pada semua ketul ayam.',
      'Susun ayam dalam air fryer atau oven, kemudian bakar pada suhu 180-200C selama kira-kira 20 minit sehingga masak.',
      'Untuk sos halia, tumis bawang putih, bawang merah, bawang holland, halia, dan cili padi merah hingga wangi dan sedikit garing.',
      'Masukkan sos tiram dan gaul seketika supaya sebati.',
      'Tuang campuran 1/2 cawan air + 1 sudu kecil tepung jagung, tambah garam dan gula secukup rasa, biar mendidih hingga sos memekat.',
      'Curahkan sos halia panas ke atas ayam bakar sebelum dihidang.',
    ],
  },
  {
    code: 'PKP',
    title: 'Pad Ka Prao',
    summary: 'Ayam cincang tumis pedas dengan sos Thai dan daun selasih segar.',
    tags: ['Thai', 'Daun Selasih', 'Ayam Cincang'],
    stepsShort: [
      'Tumis cili padi dengan sedikit minyak sehingga wangi.',
      'Masukkan ayam cincang dan kacau hingga hampir masak.',
      'Masukkan sos tiram, kicap cair, sos ikan, kicap manis, sos Maggi, dan gula.',
      'Akhiri dengan daun selasih, kacau ringkas dan siap.',
    ],
    stepsFull: [
      'Panaskan sedikit minyak dalam kuali dan tumis cili padi mengikut tahap pedas yang dikehendaki.',
      'Masukkan ayam cincang, kacau dan pecahkan ayam supaya masak sekata.',
      'Masukkan sos tiram, kicap cair, sos ikan, kicap manis, sos perasa Maggi, dan gula.',
      'Tambah sedikit air jika mahu kuah lebih lembap, kemudian reneh seketika hingga semua rasa sebati.',
      'Perasakan dengan garam jika perlu, akhir sekali masukkan daun selasih dan kacau cepat sebelum tutup api.',
    ],
  },
  {
    code: 'BLD',
    title: 'Ayam Balado Hijau',
    summary: 'Ayam goreng bersambal hijau dengan rasa pedas segar limau nipis.',
    tags: ['Indonesia', 'Balado', 'Pedas Hijau'],
    stepsShort: [
      'Gaul ayam dengan garam dan serbuk kunyit, kemudian goreng hingga masak.',
      'Kisar bawang, halia, cili hijau, dan serai menjadi sambal hijau kasar.',
      'Tumis sambal bersama daun limau purut hingga naik bau.',
      'Masukkan ayam goreng, gaul dengan garam, gula, dan perahan limau nipis.',
    ],
    stepsFull: [
      'Gaulkan ayam dengan garam, limau nipis, dan serbuk kunyit. Perap ringkas untuk naikkan rasa.',
      'Goreng ayam hingga keemasan dan masak, kemudian ketepikan.',
      'Kisar bawang putih, bawang merah, halia, cili hijau besar, dan serai secara kasar.',
      'Tumis bahan kisar hingga naik bau, kemudian masukkan daun limau purut dan teruskan tumis sehingga sambal sedikit garing.',
      'Masukkan ayam goreng, gaul rata, dan perasakan dengan garam serta gula mengikut rasa.',
      'Akhiri dengan sedikit lagi perahan limau nipis sebelum hidang.',
    ],
  },
  {
    code: 'KRM',
    title: 'Ayam Masak Kurma',
    summary: 'Ayam kurma berempah dengan santan pekat, kentang, lobak, dan tomato.',
    tags: ['Kurma', 'Santan', 'Berempah'],
    stepsShort: [
      'Panaskan minyak, tumis bahan kisar bersama rempah tumis dan rempah kurma hingga pecah minyak.',
      'Masukkan ayam dan kacau seketika hingga sebati.',
      'Masukkan kentang, lobak merah, dan sedikit air asam jawa hingga sayur empuk.',
      'Tuang santan, didihkan, kemudian masukkan tomato dan perasakan dengan garam gula.',
    ],
    stepsFull: [
      'Panaskan minyak dalam periuk.',
      'Masukkan bahan kisar (bawang putih, bawang merah, halia), rempah tumis, dan rempah kurma ayam. Kacau hingga pecah minyak dan naik bau.',
      'Masukkan ayam, gaul rata, dan biarkan masak seketika supaya rempah menyerap.',
      'Masukkan kentang, lobak merah, dan sedikit air asam jawa. Reneh sehingga kentang dan lobak mula empuk.',
      'Tuangkan santan pekat, kacau perlahan, dan biarkan mendidih atas api sederhana.',
      'Akhir sekali masukkan tomato, kemudian perasakan dengan garam dan gula secukup rasa.',
    ],
  },
  {
    code: 'BPP',
    title: 'Ayam Black Pepper',
    summary: 'Ayam perap lada hitam dimasak dengan kuah kicap manis sos tiram.',
    tags: ['Black Pepper', 'Perap', 'Kuah Pekat'],
    stepsShort: [
      'Perap ayam dengan kicap manis, sos tiram, dan lada hitam selama 30 minit.',
      'Goreng atau panggang ayam hingga masak.',
      'Tumis bawang merah, bawang putih, halia, dan lada hitam hingga naik bau.',
      'Masukkan sos tiram, kicap manis, air, dan bancuhan tepung jagung.',
      'Masukkan ayam, gaul sebati, kemudian perasakan dengan garam gula.',
    ],
    stepsFull: [
      'Gaul ayam dengan bahan perapan: kicap manis, sos tiram, dan lada hitam. Perap sekitar 30 minit.',
      'Goreng atau panggang ayam hingga masak sepenuhnya, kemudian ketepikan.',
      'Panaskan sedikit minyak dan tumis bawang merah, bawang putih, halia, serta lada hitam sehingga wangi.',
      'Masukkan sos tiram, kicap manis, dan 1/2 cawan air. Kacau hingga sekata.',
      'Tuangkan bancuhan tepung jagung dan kacau sehingga kuah mula memekat.',
      'Masukkan ayam yang telah dimasak, gaul rata, dan akhir sekali laraskan rasa dengan garam serta gula secukupnya.',
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
