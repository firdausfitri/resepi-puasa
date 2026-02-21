import { ingredients } from './ingredients';
import type { MenuCode, Recipe } from './types';

const recipeSeeds: Array<Omit<Recipe, 'ingredientIds'>> = [
  {
    code: 'PPT',
    title: 'Ayam Phat Phet Thai',
    summary: 'Ayam pedas gaya Thai dengan herba segar dan rasa masam manis.',
    tags: ['Thai', 'Pedas', 'Tumis'],
    tiktokUrl:
      'https://www.tiktok.com/@khairulaming/video/7216196065475759387?is_from_webapp=1&sender_device=pc',
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
    tiktokUrl:
      'https://www.tiktok.com/@khairulaming/video/7348669467229949186?is_from_webapp=1&sender_device=pc',
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
    title: 'Ayam Masak Halia',
    summary: 'Ayam perap ringkas dimasak tumis halia dengan sentuhan cuka makan dan minyak bijan.',
    tags: ['Halia', 'Tumis', 'Che Sayang Kitchen'],
    tiktokUrl:
      'https://www.tiktok.com/@chesayang_kitchen/video/7383886475319889170?is_from_webapp=1&sender_device=pc',
    stepsShort: [
      'Perap ayam peha dengan sos tiram, kicap lemak manis, serbuk lada sulah/lada putih, dan tepung jagung.',
      'Panaskan minyak dan masak ayam perap hingga berubah warna serta hampir masak.',
      'Masukkan bawang putih, halia hiris, bawang holland, dan cili merah; tumis hingga wangi.',
      'Perasakan dengan sedikit sos tiram, kicap lemak manis, cuka makan, lada sulah, dan minyak bijan; akhir sekali tabur daun bawang.',
    ],
    stepsFull: [
      'Gaulkan 1/2 kilo ayam bahagian peha dengan 1 sudu sos tiram, sedikit kicap lemak manis, 1/2 sudu kecil serbuk lada sulah/lada putih, dan 1 sudu kecil tepung jagung.',
      'Perap seketika supaya bahan meresap pada ayam.',
      'Panaskan sedikit minyak dalam kuali, kemudian masukkan ayam perap dan masak hingga ayam hampir masak sepenuhnya.',
      'Masukkan 3-4 ulas bawang putih yang diracik, 3 inci halia hiris nipis, bawang holland, dan cili merah. Tumis hingga naik bau.',
      'Tambah sedikit lagi kicap lemak manis, sos tiram, cuka makan, serbuk lada sulah, dan sedikit minyak bijan. Gaul hingga kuah menyelaputi ayam.',
      'Akhir sekali masukkan daun bawang, kacau ringkas, dan terus angkat untuk dihidang.',
    ],
  },
  {
    code: 'PKP',
    title: 'Pad Ka Prao',
    summary: 'Ayam cincang tumis pedas dengan sos Thai dan daun selasih segar.',
    tags: ['Thai', 'Daun Selasih', 'Ayam Cincang'],
    tiktokUrl:
      'https://www.tiktok.com/@khairulaming/video/7345069344189107458?is_from_webapp=1&sender_device=pc&web_id=7516478617163154962',
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
    tiktokUrl:
      'https://www.tiktok.com/@khairulaming/video/6957216311709617410?is_from_webapp=1&sender_device=pc&web_id=7516478617163154962',
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
    tiktokUrl: 'https://www.tiktok.com/@khairulaming/video/7091922865506815258?is_from_webapp=1&sender_device=pc',
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
    tiktokUrl:
      'https://www.tiktok.com/@khairulaming/video/7068205108126829851?is_from_webapp=1&sender_device=pc&web_id=7516478617163154962',
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
