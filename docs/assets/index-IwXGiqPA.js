(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function na(a){return a==="recipe"?"recipes":a}function ta(){return`
    <nav class="navbar" aria-label="Navigasi utama">
      <a class="nav-link" data-nav="plan" href="#/plan">Plan 7 Hari</a>
      <a class="nav-link" data-nav="shopping" href="#/shopping">Shopping List</a>
      <a class="nav-link" data-nav="recipes" href="#/recipes">Resepi</a>
    </nav>
  `}function ia(a){const e=na(a);document.querySelectorAll(".nav-link").forEach(n=>{if(n.dataset.nav===e){n.setAttribute("aria-current","page");return}n.removeAttribute("aria-current")})}function sa(a){const e=a.replace(/^#/,"").trim();return e?e.startsWith("/")?e:`/${e}`:"/plan"}function x(a){const e=sa(a);if(e==="/plan")return{name:"plan",params:{}};if(e==="/shopping")return{name:"shopping",params:{}};if(e==="/recipes")return{name:"recipes",params:{}};const n=e.match(/^\/recipes\/([^/]+)$/);return n?{name:"recipe",params:{code:decodeURIComponent(n[1])}}:null}const m=["PPT","KCP","HLA","PKP","BLD","KRM","BPP"],T=[{id:"ayam",name:"Ayam",category:"Ayam",menuCodes:["PPT","KCP","HLA","PKP","BLD","KRM","BPP"],quantity:"±3–3.5 kg"},{id:"bawang-merah",name:"Bawang merah",category:"Bawang & Halia",menuCodes:["PPT","KCP","HLA","BLD","KRM","BPP"],quantity:"25–30 biji"},{id:"bawang-putih",name:"Bawang putih",category:"Bawang & Halia",menuCodes:["PPT","KCP","HLA","BLD","KRM","BPP"],quantity:"4–5 labu"},{id:"halia",name:"Halia",category:"Bawang & Halia",menuCodes:["PPT","KCP","HLA","BLD","KRM","BPP"],quantity:"6–7 inci"},{id:"kunyit-hidup",name:"Kunyit hidup",category:"Bawang & Halia",menuCodes:["PPT"],quantity:"Sebesar ibu jari"},{id:"bawang-holland",name:"Bawang holland",category:"Bawang & Halia",menuCodes:["HLA"],quantity:"1/2 biji"},{id:"cili-padi-merah",name:"Cili padi merah",category:"Cili",menuCodes:["PPT","KCP","HLA","PKP"]},{id:"cili-hijau-besar",name:"Cili hijau besar",category:"Cili",menuCodes:["BLD"],quantity:"15 biji"},{id:"cili-kisar",name:"Cili kisar",category:"Cili",menuCodes:["KCP"],quantity:"2 sudu"},{id:"serai",name:"Serai",category:"Herba & Aromatik",menuCodes:["PPT","KCP","BLD"],quantity:"8–10 batang"},{id:"daun-limau-purut",name:"Daun limau purut",category:"Herba & Aromatik",menuCodes:["PPT","BLD"]},{id:"daun-kari",name:"Daun kari",category:"Herba & Aromatik",menuCodes:["KCP"],quantity:"5 tangkai"},{id:"daun-selasih",name:"Daun selasih",category:"Herba & Aromatik",menuCodes:["PKP"],notes:"Thai basil"},{id:"baby-corn",name:"Baby corn",category:"Sayur Tambahan",menuCodes:["PPT"]},{id:"kacang-panjang",name:"Kacang panjang",category:"Sayur Tambahan",menuCodes:["PPT"]},{id:"kentang",name:"Kentang",category:"Sayur Tambahan",menuCodes:["KRM"],quantity:"2–3 biji"},{id:"lobak-merah",name:"Lobak merah",category:"Sayur Tambahan",menuCodes:["KRM"],quantity:"1 biji"},{id:"tomato",name:"Tomato",category:"Sayur Tambahan",menuCodes:["KRM"],quantity:"2 biji"},{id:"limau-nipis",name:"Limau nipis",category:"Sayur Tambahan",menuCodes:["BLD"],quantity:"1 biji"},{id:"lemon",name:"Lemon",category:"Sayur Tambahan",menuCodes:[],quantity:"1–2 biji"},{id:"santan-pekat",name:"Santan pekat",category:"Santan & Tenusu",menuCodes:["KRM"],quantity:"2 kotak"},{id:"sos-tiram",name:"Sos tiram",category:"Sos & Perasa",menuCodes:["KCP","HLA","PKP","BPP"],quantity:"botol besar",notes:"KCP: 2 sudu (Mahsuri)"},{id:"kicap-manis",name:"Kicap manis",category:"Sos & Perasa",menuCodes:["HLA","PKP","BPP"],quantity:"botol besar"},{id:"kicap-manis-pedas",name:"Kicap manis pedas",category:"Sos & Perasa",menuCodes:["KCP"],quantity:"1.5 cawan",notes:"Mahsuri"},{id:"kicap-cair",name:"Kicap cair / light soy sauce",category:"Sos & Perasa",menuCodes:["PKP"]},{id:"sos-ikan",name:"Sos ikan",category:"Sos & Perasa",menuCodes:["PPT","PKP"]},{id:"sos-perasa-maggi",name:"Sos perasa Maggi",category:"Sos & Perasa",menuCodes:["PKP"]},{id:"rempah-kurma-ayam",name:"Rempah kurma ayam",category:"Sos & Perasa",menuCodes:["KRM"],quantity:"4 sudu besar"},{id:"rempah-tumis",name:"Rempah tumis",category:"Sos & Perasa",menuCodes:["KRM"],notes:"Kulit kayu manis, bunga lawang, buah pelaga"},{id:"serbuk-kunyit",name:"Serbuk kunyit",category:"Sos & Perasa",menuCodes:["PPT","KCP","BLD"]},{id:"lada-hitam",name:"Lada hitam",category:"Sos & Perasa",menuCodes:["BPP"]},{id:"tepung-jagung",name:"Tepung jagung",category:"Sos & Perasa",menuCodes:["HLA","BPP"]},{id:"garam",name:"Garam",category:"Sos & Perasa",menuCodes:["PPT","KCP","HLA","PKP","BLD","KRM","BPP"]},{id:"gula",name:"Gula",category:"Sos & Perasa",menuCodes:["PPT","HLA","PKP","BLD","KRM","BPP"]},{id:"serbuk-perasa",name:"Serbuk perasa",category:"Sos & Perasa",menuCodes:["PPT"]},{id:"minyak-masak",name:"Minyak masak",category:"Lain-lain",menuCodes:["PPT","KCP","HLA","PKP","BLD","KRM","BPP"]},{id:"air-asam-jawa",name:"Air asam jawa",category:"Lain-lain",menuCodes:["PPT","KRM"],quantity:"Sedikit"}],ra=[{code:"PPT",title:"Ayam Phat Phet Thai",summary:"Ayam pedas gaya Thai dengan herba segar dan rasa masam manis.",tags:["Thai","Pedas","Tumis"],stepsShort:["Sediakan bahan kisar asas dan potong ayam.","Tumis bahan sehingga naik bau.","Masukkan ayam dan kacau hingga separuh masak.","Tambah sos/perasa, sayur, dan siap dihidang."],stepsFull:["Sediakan semua bahan ikut sukatan dan asingkan bahan herba, sos, dan sayur.","Panaskan minyak, tumis bawang, halia, serai, dan cili hingga wangi.","Masukkan ayam, gaul rata sehingga ayam bertukar warna dan separuh masak.","Masukkan sos ikan, serbuk kunyit, garam, gula, dan perasa lain ikut citarasa.","Akhir sekali masukkan daun limau purut, sayur, dan pelaras akhir sebelum hidang."]},{code:"KCP",title:"Ayam Kicap Pedas",summary:"Ayam kicap dengan gabungan rasa manis, masin, dan pedas padu.",tags:["Melayu","Pedas","Kicap"],stepsShort:["Perap ayam dengan garam ringkas.","Tumis bahan kisar hingga pecah minyak.","Masukkan ayam dan kuah kicap.","Masak hingga pekat dan seimbang rasa."],stepsFull:["Sediakan bahan tumis seperti bawang, halia, cili, serai, dan daun kari.","Panaskan minyak, tumis bahan sehingga naik bau dan pecah minyak.","Masukkan ayam dan gaul sehingga ayam bersalut sambal.","Tambah sos tiram, kicap manis, kicap manis pedas, dan perasa sokongan.","Reneh atas api sederhana hingga kuah pekat dan ayam masak sepenuhnya."]},{code:"HLA",title:"Ayam Halia Air Fryer",summary:"Ayam perap sos tiram-kicap manis dengan sos halia tumis ringkas.",tags:["Air Fryer","Halia","Khairul Aming"],stepsShort:["Perap ayam dengan sos tiram, kicap manis, garam, dan minyak.","Bakar ayam dalam air fryer/oven pada 180-200C selama 20 minit.","Tumis bawang, halia, cili padi, dan bawang holland hingga naik bau.","Masukkan sos tiram dan bancuhan air tepung jagung, kemudian curah atas ayam."],stepsFull:["Satukan ayam, sos tiram, kicap manis, garam, dan minyak masak. Lumur rata pada semua ketul ayam.","Susun ayam dalam air fryer atau oven, kemudian bakar pada suhu 180-200C selama kira-kira 20 minit sehingga masak.","Untuk sos halia, tumis bawang putih, bawang merah, bawang holland, halia, dan cili padi merah hingga wangi dan sedikit garing.","Masukkan sos tiram dan gaul seketika supaya sebati.","Tuang campuran 1/2 cawan air + 1 sudu kecil tepung jagung, tambah garam dan gula secukup rasa, biar mendidih hingga sos memekat.","Curahkan sos halia panas ke atas ayam bakar sebelum dihidang."]},{code:"PKP",title:"Pad Ka Prao",summary:"Ayam cincang tumis pedas dengan sos Thai dan daun selasih segar.",tags:["Thai","Daun Selasih","Ayam Cincang"],stepsShort:["Tumis cili padi dengan sedikit minyak sehingga wangi.","Masukkan ayam cincang dan kacau hingga hampir masak.","Masukkan sos tiram, kicap cair, sos ikan, kicap manis, sos Maggi, dan gula.","Akhiri dengan daun selasih, kacau ringkas dan siap."],stepsFull:["Panaskan sedikit minyak dalam kuali dan tumis cili padi mengikut tahap pedas yang dikehendaki.","Masukkan ayam cincang, kacau dan pecahkan ayam supaya masak sekata.","Masukkan sos tiram, kicap cair, sos ikan, kicap manis, sos perasa Maggi, dan gula.","Tambah sedikit air jika mahu kuah lebih lembap, kemudian reneh seketika hingga semua rasa sebati.","Perasakan dengan garam jika perlu, akhir sekali masukkan daun selasih dan kacau cepat sebelum tutup api."]},{code:"BLD",title:"Ayam Balado Hijau",summary:"Ayam goreng bersambal hijau dengan rasa pedas segar limau nipis.",tags:["Indonesia","Balado","Pedas Hijau"],stepsShort:["Gaul ayam dengan garam dan serbuk kunyit, kemudian goreng hingga masak.","Kisar bawang, halia, cili hijau, dan serai menjadi sambal hijau kasar.","Tumis sambal bersama daun limau purut hingga naik bau.","Masukkan ayam goreng, gaul dengan garam, gula, dan perahan limau nipis."],stepsFull:["Gaulkan ayam dengan garam, limau nipis, dan serbuk kunyit. Perap ringkas untuk naikkan rasa.","Goreng ayam hingga keemasan dan masak, kemudian ketepikan.","Kisar bawang putih, bawang merah, halia, cili hijau besar, dan serai secara kasar.","Tumis bahan kisar hingga naik bau, kemudian masukkan daun limau purut dan teruskan tumis sehingga sambal sedikit garing.","Masukkan ayam goreng, gaul rata, dan perasakan dengan garam serta gula mengikut rasa.","Akhiri dengan sedikit lagi perahan limau nipis sebelum hidang."]},{code:"KRM",title:"Ayam Masak Kurma",summary:"Ayam kurma berempah dengan santan pekat, kentang, lobak, dan tomato.",tags:["Kurma","Santan","Berempah"],stepsShort:["Panaskan minyak, tumis bahan kisar bersama rempah tumis dan rempah kurma hingga pecah minyak.","Masukkan ayam dan kacau seketika hingga sebati.","Masukkan kentang, lobak merah, dan sedikit air asam jawa hingga sayur empuk.","Tuang santan, didihkan, kemudian masukkan tomato dan perasakan dengan garam gula."],stepsFull:["Panaskan minyak dalam periuk.","Masukkan bahan kisar (bawang putih, bawang merah, halia), rempah tumis, dan rempah kurma ayam. Kacau hingga pecah minyak dan naik bau.","Masukkan ayam, gaul rata, dan biarkan masak seketika supaya rempah menyerap.","Masukkan kentang, lobak merah, dan sedikit air asam jawa. Reneh sehingga kentang dan lobak mula empuk.","Tuangkan santan pekat, kacau perlahan, dan biarkan mendidih atas api sederhana.","Akhir sekali masukkan tomato, kemudian perasakan dengan garam dan gula secukup rasa."]},{code:"BPP",title:"Ayam Black Pepper",summary:"Ayam perap lada hitam dimasak dengan kuah kicap manis sos tiram.",tags:["Black Pepper","Perap","Kuah Pekat"],stepsShort:["Perap ayam dengan kicap manis, sos tiram, dan lada hitam selama 30 minit.","Goreng atau panggang ayam hingga masak.","Tumis bawang merah, bawang putih, halia, dan lada hitam hingga naik bau.","Masukkan sos tiram, kicap manis, air, dan bancuhan tepung jagung.","Masukkan ayam, gaul sebati, kemudian perasakan dengan garam gula."],stepsFull:["Gaul ayam dengan bahan perapan: kicap manis, sos tiram, dan lada hitam. Perap sekitar 30 minit.","Goreng atau panggang ayam hingga masak sepenuhnya, kemudian ketepikan.","Panaskan sedikit minyak dan tumis bawang merah, bawang putih, halia, serta lada hitam sehingga wangi.","Masukkan sos tiram, kicap manis, dan 1/2 cawan air. Kacau hingga sekata.","Tuangkan bancuhan tepung jagung dan kacau sehingga kuah mula memekat.","Masukkan ayam yang telah dimasak, gaul rata, dan akhir sekali laraskan rasa dengan garam serta gula secukupnya."]}];function oa(a){return T.filter(e=>e.menuCodes.includes(a)).map(e=>e.id)}const N=ra.map(a=>({...a,ingredientIds:oa(a.code)}));function $(a){return N.find(e=>e.code===a)}function da(){return[...N]}function ua(){return[...T]}function ca(a){const e=new Set(a),n=new Map;return T.forEach(t=>{t.menuCodes.some(i=>e.has(i))&&n.set(t.id,t)}),Array.from(n.values())}function la(a){return a.reduce((e,n)=>(e[n.category]||(e[n.category]=[]),e[n.category].push(n),e),{})}const K="selectedMenusV1",F="kitchenModeV1",A="checkedIngredientsV1";let S=[],k=!1,M={};function pa(a){return typeof a=="string"&&m.includes(a)}function j(a){if(!Array.isArray(a))return[];const e=new Set;return a.forEach(n=>{pa(n)&&e.add(n)}),Array.from(e)}function ma(){if(typeof window>"u")return null;try{const a=window.localStorage.getItem(K);return a===null?null:j(JSON.parse(a))}catch{return null}}function ha(a){if(!(typeof window>"u"))try{window.localStorage.setItem(K,JSON.stringify(a))}catch{}}function O(a){if(typeof a!="object"||a===null||Array.isArray(a))return{};const e={};return Object.entries(a).forEach(([n,t])=>{typeof n=="string"&&n.trim()&&typeof t=="boolean"&&(e[n]=t)}),e}function ga(){if(typeof window>"u")return null;try{const a=window.localStorage.getItem(A);return a===null?null:O(JSON.parse(a))}catch{return null}}function ka(a){if(!(typeof window>"u"))try{window.localStorage.setItem(A,JSON.stringify(a))}catch{}}function b(){const a=ma();return a!==null?(S=a,[...a]):[...S]}function E(a){const e=j(a);S=e,ha(e)}function U(a){const e=j([...b(),a]);return E(e),e}function ya(){if(S=[],!(typeof window>"u"))try{window.localStorage.removeItem(K)}catch{}}function B(){if(typeof window>"u")return k;try{const a=window.localStorage.getItem(F);return a===null||(k=JSON.parse(a)===!0),k}catch{return k}}function ba(a){if(k=a,!(typeof window>"u"))try{window.localStorage.setItem(F,JSON.stringify(a))}catch{}}function V(){const a=ga();return a!==null?(M=a,{...a}):{...M}}function fa(a){const e=O(a);M=e,ka(e)}function Pa(a){const e=V(),n={...e,[a]:!e[a]};return fa(n),n}function Sa(){if(M={},!(typeof window>"u"))try{window.localStorage.removeItem(A)}catch{}}const Ma={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function r(a){return a.replace(/[&<>"']/g,e=>Ma[e]??e)}const v=[{dayLabel:"Isnin",code:"PPT"},{dayLabel:"Selasa",code:"KCP"},{dayLabel:"Rabu",code:"HLA"},{dayLabel:"Khamis",code:"PKP"},{dayLabel:"Jumaat",code:"BLD"},{dayLabel:"Sabtu",code:"KRM"},{dayLabel:"Ahad",code:"BPP"}],wa=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],G="Asia/Kuala_Lumpur";function Ca(a){return m.includes(a)}function La(){const a=new Intl.DateTimeFormat("en-US",{timeZone:G,weekday:"short"}).format(new Date),e=wa.indexOf(a);return e>=0?e:0}function va(){const a=new Intl.DateTimeFormat("en-US",{timeZone:G,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),e=Number(a.find(i=>i.type==="year")?.value??"0"),n=Number(a.find(i=>i.type==="month")?.value??"0"),t=Number(a.find(i=>i.type==="day")?.value??"0");return{year:e,month:n,day:t}}function I(a){return Math.floor(Date.UTC(a.year,a.month-1,a.day)/864e5)}function $a(){const a=va(),e={year:a.year,month:2,day:19},n=I(a)-I(e);return n<0?"Ramadan belum bermula (1 Ramadan: 19 Februari, Malaysia).":`Hari ke-${n+1} Ramadan di Malaysia.`}function Ta(){const a=new Set(b()),e=La(),n=v[e]??v[0],i=$(n.code)?.title??`Menu ${n.code}`,s=a.has(n.code),d=v.map((u,o)=>{const L=$(u.code),h=a.has(u.code),y=o===e,ea=L?.title??`Menu ${u.code}`;return`
      <article class="plan-card ${y?"is-today":""}" data-menu="${r(u.code)}">
        <div class="plan-card-head">
          <p class="day-label">${r(u.dayLabel)}</p>
          <div class="plan-chip-group">
            ${y?'<span class="today-badge">Hari ini</span>':""}
            <span class="menu-code-chip">${r(u.code)}</span>
          </div>
        </div>
        <h2 class="plan-card-title">${r(ea)}</h2>
        <p class="plan-meta">Prep 15 min • Masak 25 min</p>
        <div class="plan-actions">
          <a class="btn btn-secondary" href="#/recipes/${encodeURIComponent(u.code)}">Buka Resepi</a>
          <button
            type="button"
            class="btn btn-primary"
            data-add-menu="${r(u.code)}"
            ${h?"disabled":""}
          >
            ${h?"Ditambah ✓":"Tambah ke Shopping List"}
          </button>
        </div>
        <p
          class="plan-added-note ${h?"is-visible":""}"
          data-added-note
          data-added-menu="${r(u.code)}"
        >
          Ditambah ✓ Menu ini sudah ada dalam Shopping List.
        </p>
      </article>
    `}).join(""),c=a.size,l=c>0?`${c} menu telah ditambah ke Shopping List.`:'Tekan "Tambah ke Shopping List" untuk simpan menu dipilih.';return`
    <section class="page-card">
      <h1>Plan 7 Hari</h1>

      <section class="today-plan-card" data-menu="${r(n.code)}" aria-label="Menu hari ini">
        <p class="today-plan-kicker">Menu Hari Ini</p>
        <h2 class="today-plan-title">${r(n.dayLabel)}: ${r(i)}</h2>
        <p class="today-plan-meta">${r($a())}</p>
        <div class="plan-actions">
          <a class="btn btn-secondary" href="#/recipes/${encodeURIComponent(n.code)}">Buka Resepi</a>
          <button
            type="button"
            class="btn btn-primary"
            data-add-menu="${r(n.code)}"
            ${s?"disabled":""}
          >
            ${s?"Ditambah ✓":"Tambah ke Shopping List"}
          </button>
        </div>
        <p
          class="plan-added-note ${s?"is-visible":""}"
          data-added-note
          data-added-menu="${r(n.code)}"
        >
          Ditambah ✓ Menu ini sudah ada dalam Shopping List.
        </p>
      </section>

      <p class="plan-intro">Susun menu harian dan terus simpan ke senarai shopping.</p>
      <p class="plan-feedback ${c>0?"is-visible":""}" data-plan-feedback aria-live="polite">
        ${r(l)}
      </p>
      <div class="plan-grid">${d}</div>
    </section>
  `}function Ka(a){const e=a.querySelector("[data-plan-feedback]");a.querySelectorAll("[data-add-menu]").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.addMenu;if(!t||!Ca(t))return;const i=U(t);a.querySelectorAll(`[data-add-menu="${t}"]`).forEach(s=>{s.disabled=!0,s.textContent="Ditambah ✓"}),a.querySelectorAll(`[data-added-note][data-added-menu="${t}"]`).forEach(s=>{s.classList.add("is-visible")}),e&&(e.classList.add("is-visible"),e.textContent=`Ditambah ✓ ${t}. Jumlah menu dipilih: ${i.length}.`)})})}function _(a){return m.some(e=>e===a)}function Aa(){return new Map(ua().map(a=>[a.id,a]))}function q(a){document.body.classList.toggle("kitchen-mode",a)}function H(a){return`
    <section class="page-card">
      <h1>Halaman Resepi</h1>
      <p class="recipe-code">Resepi: ${r(a||"-")}</p>
      <p>Resepi tidak dijumpai.</p>
      <p><a class="chip-link" href="#/plan">Kembali ke Plan 7 Hari</a></p>
    </section>
  `}function ja(a){const e=a.trim().toUpperCase();if(!_(e))return H(e);const n=$(e);if(!n)return H(e);const t=Aa(),i=n.ingredientIds.map(o=>t.get(o)).filter(o=>o!==void 0),d=new Set(b()).has(n.code),c=i.map(o=>`<li>${r(o.name)}${o.quantity?` <span class="ingredient-qty">(${r(o.quantity)})</span>`:""}</li>`).join(""),l=n.stepsShort.map(o=>`<li>${r(o)}</li>`).join(""),u=n.stepsFull.map(o=>`<li>${r(o)}</li>`).join("");return`
    <article class="page-card recipe-page" data-recipe-page data-menu-code="${r(n.code)}">
      <header class="recipe-header">
        <div class="recipe-head-row">
          <h1 class="recipe-title">${r(n.title)}</h1>
          <span class="menu-code-chip">${r(n.code)}</span>
        </div>
        <p class="recipe-meta">Prep 15 min • Masak 25 min</p>
        <p class="recipe-summary">${r(n.summary)}</p>
        <div class="recipe-tools print-hidden">
          <button
            type="button"
            class="btn btn-primary"
            data-add-shopping
            ${d?"disabled":""}
          >
            ${d?"Ditambah ✓":"Tambah ke Shopping List"}
          </button>
          <button type="button" class="btn btn-secondary" data-kitchen-toggle>Dapur Mode</button>
          <button type="button" class="btn btn-secondary" data-print-recipe>Print</button>
        </div>
        <p class="recipe-feedback ${d?"is-visible":""}" data-recipe-feedback aria-live="polite">
          ${d?"Ditambah ✓ Menu ini sudah ada dalam Shopping List.":""}
        </p>
      </header>

      <nav class="recipe-jump-nav print-hidden" aria-label="Pautan pantas">
        <a class="jump-link" href="#bahan" data-jump-link="bahan">Bahan</a>
        <a class="jump-link" href="#langkah" data-jump-link="langkah">Langkah</a>
        <a class="jump-link" href="#nota" data-jump-link="nota">Nota</a>
      </nav>

      <section id="bahan" class="recipe-section">
        <h2 class="section-title">Bahan</h2>
        <ul class="ingredient-list">${c}</ul>
      </section>

      <section id="langkah" class="recipe-section">
        <h2 class="section-title">Langkah</h2>
        <h3 class="recipe-subtitle">Langkah Ringkas</h3>
        <ul class="step-list step-list-short">${l}</ul>
        <button type="button" class="btn btn-secondary print-hidden" data-toggle-steps>
          Tunjuk Langkah Penuh
        </button>
        <div class="steps-full-wrap" data-full-steps hidden>
          <h3 class="recipe-subtitle">Langkah Penuh</h3>
          <ol class="step-list step-list-full">${u}</ol>
        </div>
      </section>

      <section id="nota" class="recipe-section">
        <h2 class="section-title">Nota</h2>
        <p>Tambah nota sendiri nanti.</p>
      </section>
    </article>
  `}function Ea(a){const e=a.querySelector("[data-recipe-page]");if(!e)return;const n=e.querySelector("[data-kitchen-toggle]"),t=e.querySelector("[data-print-recipe]"),i=e.querySelector("[data-add-shopping]"),s=e.querySelector("[data-recipe-feedback]"),d=e.querySelector("[data-full-steps]"),c=e.querySelector("[data-toggle-steps]"),l=o=>{n&&(n.textContent=o?"Dapur Mode: ON":"Dapur Mode",n.setAttribute("aria-pressed",String(o)))},u=B();q(u),l(u),n&&n.addEventListener("click",()=>{const o=!B();ba(o),q(o),l(o)}),t&&t.addEventListener("click",()=>{window.print()}),i&&i.addEventListener("click",()=>{const o=e.dataset.menuCode;!o||!_(o)||(U(o),i.disabled=!0,i.textContent="Ditambah ✓",s&&(s.classList.add("is-visible"),s.textContent=`Ditambah ✓ ${o} dimasukkan ke Shopping List.`))}),c&&d&&c.addEventListener("click",()=>{if(d.hasAttribute("hidden")){d.removeAttribute("hidden"),c.textContent="Sorok Langkah Penuh";return}d.setAttribute("hidden","true"),c.textContent="Tunjuk Langkah Penuh"}),e.querySelectorAll("[data-jump-link]").forEach(o=>{o.addEventListener("click",L=>{L.preventDefault();const h=o.dataset.jumpLink,y=h?e.querySelector(`#${h}`):null;y&&y.scrollIntoView({behavior:"smooth",block:"start"})})})}function Ra(){return`
    <section class="page-card">
      <h1>Senarai Resepi</h1>
      <p>Pilih kod menu untuk buka halaman resepi.</p>
      <div class="chip-row">${da().map(e=>`<a class="chip-link" href="#/recipes/${encodeURIComponent(e.code)}">${r(e.code)}</a>`).join("")}</div>
    </section>
  `}function Ba(a){const e=a.replace(/"/g,'""');return/[",\r\n]/.test(e)?`"${e}"`:e}function Ia(a){return a.map(e=>e.map(n=>Ba(n)).join(",")).join(`\r
`)}function qa(a,e,n){if(typeof document>"u")return;const t=new Blob([e],{type:n}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=a,s.style.display="none",document.body.append(s),s.click(),s.remove(),URL.revokeObjectURL(i)}async function Ha(a){if(typeof window>"u"||typeof document>"u")return!1;if(window.navigator.clipboard?.writeText)try{return await window.navigator.clipboard.writeText(a),!0}catch{}const e=document.createElement("textarea");e.value=a,e.setAttribute("readonly","true"),e.style.position="fixed",e.style.opacity="0",e.style.left="-9999px",document.body.append(e),e.select(),e.setSelectionRange(0,e.value.length);let n=!1;try{n=document.execCommand("copy")}catch{n=!1}return e.remove(),n}let w=!1,p="idle",f=null;function z(a){const e=new Set(a);return m.filter(n=>e.has(n))}function J(a,e){const n=new Set(e);return a.menuCodes.filter(t=>n.has(t))}function W(){const a=z(b()),e=V(),n=ca(a),t=w?n.filter(s=>e[s.id]!==!0):n,i=Object.entries(la(t)).map(([s,d])=>({category:s,ingredients:d}));return{selectedMenus:a,checkedMap:e,groupedIngredients:i}}function C(a){return a.groupedIngredients.some(e=>e.ingredients.length>0)}function Da(a){const n=["Shopping List",`Menu: ${a.selectedMenus.length>0?a.selectedMenus.join(", "):"-"}`,""];return C(a)?(a.groupedIngredients.forEach((t,i)=>{n.push(`[${t.category}]`),t.ingredients.forEach(s=>{const c=a.checkedMap[s.id]===!0?"✅ ":"☐ ",l=s.quantity?` (${s.quantity})`:"";n.push(`${c}${s.name}${l}`)}),i<a.groupedIngredients.length-1&&n.push("")}),n.join(`
`)):(n.push("Tiada bahan untuk dipaparkan."),n.join(`
`))}function xa(a){const e=[["category","item","quantity","menuCodes","checked"]];return a.groupedIngredients.forEach(n=>{n.ingredients.forEach(t=>{e.push([n.category,t.name,t.quantity??"",J(t,a.selectedMenus).join("|"),a.checkedMap[t.id]===!0?"TRUE":"FALSE"])})}),Ia(e)}function Na(a){const e=new Set(a);return m.map(n=>{const t=e.has(n);return`
      <button
        type="button"
        class="menu-filter-chip ${t?"is-selected":""}"
        data-menu-filter="${r(n)}"
        aria-pressed="${t}"
      >
        ${r(n)}
      </button>
    `}).join("")}function Fa(a,e){const n=e.checkedMap[a.id]===!0,t=n?"sudah dibeli":"belum dibeli",i=J(a,e.selectedMenus).map(s=>`<span class="menu-mini-chip">${r(s)}</span>`).join("");return`
    <button
      type="button"
      class="ingredient-row ${n?"is-checked":""}"
      data-ingredient-id="${r(a.id)}"
      role="checkbox"
      aria-checked="${n}"
      aria-label="${r(a.name)} (${t})"
    >
      <span class="ingredient-check ${n?"is-checked":""}" aria-hidden="true">
        ${n?"✓":""}
      </span>
      <span class="sr-only">${r(t)}</span>
      <span class="ingredient-main">
        <span class="ingredient-name-line">
          <span class="ingredient-name">${r(a.name)}</span>
          ${a.quantity?`<span class="shopping-ingredient-qty">${r(a.quantity)}</span>`:""}
        </span>
        <span class="ingredient-subline">
          <span class="menu-mini-row">${i}</span>
          ${a.notes?`<span class="shopping-ingredient-note">${r(a.notes)}</span>`:""}
        </span>
      </span>
    </button>
  `}function Oa(a){return C(a)?a.groupedIngredients.map(e=>{const n=e.ingredients.map(t=>Fa(t,a)).join("");return`
        <section class="shopping-category">
          <h2 class="shopping-category-title">${r(e.category)}</h2>
          <div class="ingredient-group-list">${n}</div>
        </section>
      `}).join(""):`
      <div class="shopping-empty-state">
        <p>${w?"Semua bahan telah ditanda dibeli.":"Tiada bahan untuk pilihan menu semasa."}</p>
      </div>
    `}function Y(){const a=W(),e=a.selectedMenus.length>0?a.selectedMenus.join(", "):"Belum ada menu dipilih.",n=C(a),t=p==="success"?"Disalin ✓":p==="error"?"Gagal salin":"",i=a.selectedMenus.length===0?`
        <div class="shopping-empty-state">
          <p>Belum ada menu dipilih. Pilih menu dahulu untuk jana senarai bahan.</p>
          <button type="button" class="btn btn-primary" data-shopping-action="select-all-empty">
            Pilih Semua (7)
          </button>
        </div>
      `:Oa(a);return`
    <section class="page-card shopping-page" data-shopping-page>
      <h1>Shopping List</h1>
      <p class="shopping-line">Menu dipilih: ${r(e)}</p>

      <div class="menu-filter-row print-hidden">${Na(a.selectedMenus)}</div>

      <div class="shopping-actions print-hidden">
        <button type="button" class="btn btn-primary" data-shopping-action="select-all">
          Pilih Semua (7)
        </button>
        <button type="button" class="btn btn-secondary" data-shopping-action="clear-menu">
          Clear Menu
        </button>
        <button type="button" class="btn btn-secondary" data-shopping-action="reset-checks">
          Reset Tanda
        </button>
      </div>

      <div class="shopping-tools print-hidden">
        <button type="button" class="btn btn-secondary" data-shopping-tool="copy" ${n?"":"disabled"}>
          Copy
        </button>
        <button type="button" class="btn btn-secondary" data-shopping-tool="csv" ${n?"":"disabled"}>
          Export CSV
        </button>
        <button type="button" class="btn btn-secondary" data-shopping-tool="print" ${n?"":"disabled"}>
          Print
        </button>
      </div>

      <p
        class="shopping-copy-feedback print-hidden ${p!=="idle"?"is-visible":""}"
        data-copy-feedback
        aria-live="polite"
      >
        ${r(t)}
      </p>

      <label class="shopping-toggle print-hidden">
        <input type="checkbox" data-show-unchecked ${w?"checked":""} />
        <span>Tunjuk belum dibeli sahaja</span>
      </label>

      <div class="shopping-content">${i}</div>
    </section>
  `}function Z(a){return a.querySelector("[data-shopping-page]")!==null}function g(a){Z(a)&&(a.innerHTML=Y(),Q(a))}function Ua(a,e){p=a,D(e),f!==null&&window.clearTimeout(f),f=window.setTimeout(()=>{p="idle",f=null,D(e)},1500)}function D(a){if(!Z(a))return;const e=a.querySelector("[data-copy-feedback]");if(!e)return;const n=p==="success"?"Disalin ✓":p==="error"?"Gagal salin":"";e.textContent=n,e.classList.toggle("is-visible",p!=="idle")}function Va(a){const e=new Set(b());e.has(a)?e.delete(a):e.add(a),E(z(Array.from(e)))}function Q(a){a.querySelectorAll("[data-menu-filter]").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.menuFilter;!t||!m.includes(t)||(Va(t),g(a))})}),a.querySelectorAll("[data-shopping-action]").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.shoppingAction;if(t==="select-all"||t==="select-all-empty"){E([...m]),g(a);return}if(t==="clear-menu"){ya(),g(a);return}t==="reset-checks"&&(Sa(),g(a))})}),a.querySelectorAll("[data-shopping-tool]").forEach(n=>{n.addEventListener("click",async()=>{const t=n.dataset.shoppingTool,i=W();if(C(i)){if(t==="copy"){const s=Da(i),d=await Ha(s);Ua(d?"success":"error",a);return}if(t==="csv"){const s=xa(i);qa("shopping_list.csv",s,"text/csv;charset=utf-8");return}t==="print"&&window.print()}})});const e=a.querySelector("[data-show-unchecked]");e&&e.addEventListener("change",()=>{w=e.checked,g(a)}),a.querySelectorAll("[data-ingredient-id]").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.ingredientId;t&&(Pa(t),g(a))})})}const R=document.querySelector("#app");if(!R)throw new Error("Elemen #app tidak ditemui.");R.innerHTML=`
  <div class="app-shell">
    <header class="topbar">
      <p class="brand">Resepi Puasa</p>
      ${ta()}
    </header>
    <main id="route-view" class="route-view" aria-live="polite"></main>
  </div>
`;const X=R.querySelector("#route-view");if(!X)throw new Error("Elemen #route-view tidak ditemui.");const P=X;function Ga(a){return a.name==="plan"?Ta():a.name==="shopping"?Y():a.name==="recipes"?Ra():ja(a.params.code??"")}function aa(){const a=x(window.location.hash);if(!a){window.location.hash="/plan";return}ia(a.name),P.innerHTML=Ga(a),a.name==="plan"&&Ka(P),a.name==="shopping"&&Q(P),a.name==="recipe"&&Ea(P)}window.addEventListener("hashchange",aa);!window.location.hash||!x(window.location.hash)?window.location.hash="/plan":aa();
