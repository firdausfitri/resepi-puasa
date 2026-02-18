(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function X(a){return a==="recipe"?"recipes":a}function Z(){return`
    <nav class="navbar" aria-label="Navigasi utama">
      <a class="nav-link" data-nav="plan" href="#/plan">Plan 7 Hari</a>
      <a class="nav-link" data-nav="shopping" href="#/shopping">Shopping List</a>
      <a class="nav-link" data-nav="recipes" href="#/recipes">Resepi</a>
    </nav>
  `}function aa(a){const e=X(a);document.querySelectorAll(".nav-link").forEach(n=>{if(n.dataset.nav===e){n.setAttribute("aria-current","page");return}n.removeAttribute("aria-current")})}function ea(a){const e=a.replace(/^#/,"").trim();return e?e.startsWith("/")?e:`/${e}`:"/plan"}function I(a){const e=ea(a);if(e==="/plan")return{name:"plan",params:{}};if(e==="/shopping")return{name:"shopping",params:{}};if(e==="/recipes")return{name:"recipes",params:{}};const n=e.match(/^\/recipes\/([^/]+)$/);return n?{name:"recipe",params:{code:decodeURIComponent(n[1])}}:null}const p=["PPT","KCP","HLA","PKP","BLD","KRM","BPP"],M=[{id:"ayam",name:"Ayam",category:"Ayam",menuCodes:["PPT","KCP","HLA","PKP","BLD","KRM","BPP"],quantity:"±3–3.5 kg"},{id:"bawang-merah",name:"Bawang merah",category:"Bawang & Halia",menuCodes:["PPT","KCP","HLA","BLD","KRM","BPP"],quantity:"25–30 biji"},{id:"bawang-putih",name:"Bawang putih",category:"Bawang & Halia",menuCodes:["PPT","KCP","HLA","BLD","KRM","BPP"],quantity:"4–5 labu"},{id:"halia",name:"Halia",category:"Bawang & Halia",menuCodes:["PPT","KCP","HLA","BLD","KRM","BPP"],quantity:"6–7 inci"},{id:"bawang-holland",name:"Bawang holland",category:"Bawang & Halia",menuCodes:["HLA"],quantity:"1 biji"},{id:"cili-padi-merah",name:"Cili padi merah",category:"Cili",menuCodes:["PPT","KCP","PKP"]},{id:"cili-padi-hijau",name:"Cili padi hijau",category:"Cili",menuCodes:["BLD"]},{id:"cili-hijau-besar",name:"Cili hijau besar",category:"Cili",menuCodes:["BLD"]},{id:"cili-kisar",name:"Cili kisar",category:"Cili",menuCodes:["KCP"]},{id:"serai",name:"Serai",category:"Herba & Aromatik",menuCodes:["PPT","KCP","BLD"],quantity:"8–10 batang"},{id:"daun-limau-purut",name:"Daun limau purut",category:"Herba & Aromatik",menuCodes:["PPT","BLD"]},{id:"daun-kari",name:"Daun kari",category:"Herba & Aromatik",menuCodes:["KCP"]},{id:"daun-selasih",name:"Daun selasih",category:"Herba & Aromatik",menuCodes:["PKP"],notes:"Thai basil"},{id:"baby-corn",name:"Baby corn",category:"Sayur Tambahan",menuCodes:["PPT"]},{id:"kacang-panjang",name:"Kacang panjang",category:"Sayur Tambahan",menuCodes:["PPT"]},{id:"kentang",name:"Kentang",category:"Sayur Tambahan",menuCodes:["KRM"],quantity:"2–3 biji"},{id:"lobak-merah",name:"Lobak merah",category:"Sayur Tambahan",menuCodes:["KRM"],quantity:"1 biji"},{id:"tomato",name:"Tomato",category:"Sayur Tambahan",menuCodes:["KRM"],quantity:"2 biji"},{id:"limau-nipis",name:"Limau nipis",category:"Sayur Tambahan",menuCodes:["BLD"],quantity:"2–3 biji"},{id:"lemon",name:"Lemon",category:"Sayur Tambahan",menuCodes:["PPT"],quantity:"1–2 biji"},{id:"santan-pekat",name:"Santan pekat",category:"Santan & Tenusu",menuCodes:["KRM"],quantity:"2 kotak"},{id:"sos-tiram",name:"Sos tiram",category:"Sos & Perasa",menuCodes:["KCP","HLA","PKP","BPP"],quantity:"botol besar"},{id:"kicap-manis",name:"Kicap manis",category:"Sos & Perasa",menuCodes:["KCP","PKP","BPP"],quantity:"botol besar"},{id:"kicap-manis-pedas",name:"Kicap manis pedas",category:"Sos & Perasa",menuCodes:["KCP"]},{id:"kicap-cair",name:"Kicap cair / light soy sauce",category:"Sos & Perasa",menuCodes:["PKP"]},{id:"sos-ikan",name:"Sos ikan",category:"Sos & Perasa",menuCodes:["PPT","PKP"]},{id:"sos-perasa-maggi",name:"Sos perasa Maggi",category:"Sos & Perasa",menuCodes:["PKP"]},{id:"rempah-kurma-ayam",name:"Rempah kurma ayam",category:"Sos & Perasa",menuCodes:["KRM"]},{id:"rempah-tumis",name:"Rempah tumis",category:"Sos & Perasa",menuCodes:["KRM"],notes:"Kulit kayu manis, bunga lawang, buah pelaga"},{id:"serbuk-kunyit",name:"Serbuk kunyit",category:"Sos & Perasa",menuCodes:["PPT","KCP","BLD"]},{id:"lada-hitam",name:"Lada hitam",category:"Sos & Perasa",menuCodes:["BPP"]},{id:"tepung-jagung",name:"Tepung jagung",category:"Sos & Perasa",menuCodes:["HLA","BPP"]},{id:"garam",name:"Garam",category:"Sos & Perasa",menuCodes:["PPT","KCP","HLA","PKP","BLD","KRM","BPP"]},{id:"gula",name:"Gula",category:"Sos & Perasa",menuCodes:["PPT","PKP","BLD","KRM","BPP"]},{id:"serbuk-perasa",name:"Serbuk perasa",category:"Sos & Perasa",menuCodes:["PPT"]},{id:"minyak-masak",name:"Minyak masak",category:"Lain-lain",menuCodes:["PPT","KCP","HLA","PKP","BLD","KRM","BPP"]},{id:"air-asam-jawa",name:"Air asam jawa",category:"Lain-lain",menuCodes:["PPT","KRM"]}],na=[{code:"PPT",title:"Ayam Phat Phet Thai",summary:"Ayam pedas gaya Thai dengan herba segar dan rasa masam manis.",tags:["Thai","Pedas","Tumis"],stepsShort:["Sediakan bahan kisar asas dan potong ayam.","Tumis bahan sehingga naik bau.","Masukkan ayam dan kacau hingga separuh masak.","Tambah sos/perasa, sayur, dan siap dihidang."],stepsFull:["Sediakan semua bahan ikut sukatan dan asingkan bahan herba, sos, dan sayur.","Panaskan minyak, tumis bawang, halia, serai, dan cili hingga wangi.","Masukkan ayam, gaul rata sehingga ayam bertukar warna dan separuh masak.","Masukkan sos ikan, serbuk kunyit, garam, gula, dan perasa lain ikut citarasa.","Akhir sekali masukkan daun limau purut, sayur, dan pelaras akhir sebelum hidang."]},{code:"KCP",title:"Ayam Kicap Pedas",summary:"Ayam kicap dengan gabungan rasa manis, masin, dan pedas padu.",tags:["Melayu","Pedas","Kicap"],stepsShort:["Perap ayam dengan garam ringkas.","Tumis bahan kisar hingga pecah minyak.","Masukkan ayam dan kuah kicap.","Masak hingga pekat dan seimbang rasa."],stepsFull:["Sediakan bahan tumis seperti bawang, halia, cili, serai, dan daun kari.","Panaskan minyak, tumis bahan sehingga naik bau dan pecah minyak.","Masukkan ayam dan gaul sehingga ayam bersalut sambal.","Tambah sos tiram, kicap manis, kicap manis pedas, dan perasa sokongan.","Reneh atas api sederhana hingga kuah pekat dan ayam masak sepenuhnya."]},{code:"HLA",title:"Ayam Halia Air Fryer",summary:"Ayam berempah halia yang rangup ringan menggunakan air fryer.",tags:["Air Fryer","Ringkas","Halia"],stepsShort:["Gaul ayam dengan halia dan sos.","Tambahkan sedikit tepung jagung.","Susun dalam bakul air fryer.","Masak hingga garing keemasan."],stepsFull:["Satukan ayam, bawang, bawang putih, halia, sos tiram, garam, dan minyak.","Gaul dengan tepung jagung sehingga bersalut nipis untuk tekstur garing.","Susun ayam dalam satu lapisan dan masak dalam air fryer mengikut suhu sesuai.","Terbalikkan ayam di pertengahan masa untuk masak sekata.","Siap apabila ayam masak penuh dan permukaan keperangan."]},{code:"PKP",title:"Pad Ka Prao",summary:"Ayam tumis pedas wangi daun selasih dengan profil rasa Thai asli.",tags:["Thai","Daun Selasih","Cepat"],stepsShort:["Tumis bawang dan cili hingga wangi.","Masukkan ayam dan kacau laju.","Tuang campuran sos Thai asas.","Akhiri dengan daun selasih."],stepsFull:["Sediakan bahan tumis seperti bawang, cili padi, dan minyak secukupnya.","Panaskan minyak, tumis bahan sehingga naik bau.","Masukkan ayam dan kacau sehingga ayam hampir masak.","Masukkan kicap manis, kicap cair, sos tiram, sos ikan, sos perasa Maggi, garam, dan gula.","Masukkan daun selasih di akhir proses dan kacau ringkas sebelum hidang."]},{code:"BLD",title:"Ayam Balado Hijau",summary:"Ayam balado pedas segar dengan cili hijau dan sentuhan limau.",tags:["Indonesia","Balado","Pedas Hijau"],stepsShort:["Goreng atau panggang ayam separuh masak.","Kisar cili hijau dan bahan aromatik.","Tumis pes hingga pecah minyak.","Masukkan ayam dan perah limau nipis."],stepsFull:["Sediakan ayam dan bahan balado hijau seperti cili padi hijau, cili hijau besar, bawang, halia, serai, dan daun limau purut.","Tumis pes balado sehingga pecah minyak dan naik bau.","Masukkan ayam dan gaul sehingga semua bahagian bersalut sambal.","Perasakan dengan garam, gula, dan serbuk kunyit sehingga seimbang.","Akhiri dengan perahan limau nipis untuk rasa segar sebelum hidang."]},{code:"KRM",title:"Ayam Masak Kurma",summary:"Kurma ayam berkuah lemak sederhana dengan rempah aromatik.",tags:["Kurma","Berkuah","Keluarga"],stepsShort:["Tumis rempah tumis dan bahan kisar.","Masukkan ayam bersama rempah kurma.","Tambahkan santan dan sayur.","Reneh hingga kuah pekat berlemak."],stepsFull:["Panaskan minyak, tumis rempah tumis hingga wangi.","Masukkan bawang, bawang putih, halia, dan tumis sehingga layu.","Masukkan ayam bersama rempah kurma ayam dan gaul rata.","Tambahkan santan pekat, air asam jawa, kentang, lobak merah, dan tomato.","Perasakan dengan garam dan gula, kemudian reneh hingga ayam dan sayur masak lembut."]},{code:"BPP",title:"Ayam Black Pepper",summary:"Ayam tumis lada hitam pekat dengan rasa berempah dan smoky.",tags:["Black Pepper","Tumis","Pekat"],stepsShort:["Perap ayam dengan lada hitam dan sos.","Tumis bawang hingga layu.","Masukkan ayam dan goreng seketika.","Tambah slurry tepung jagung hingga kuah berkilat."],stepsFull:["Gaul ayam dengan lada hitam, sos tiram, kicap manis, garam, dan sedikit minyak.","Panaskan kuali dan tumis bawang serta halia sehingga wangi.","Masukkan ayam, kacau sehingga ayam masak dan sos mula memekat.","Tambah bancuhan tepung jagung untuk tekstur kuah berkilat.","Laraskan rasa akhir dan hidang panas."]}];function ta(a){return M.filter(e=>e.menuCodes.includes(a)).map(e=>e.id)}const q=na.map(a=>({...a,ingredientIds:ta(a.code)}));function H(a){return q.find(e=>e.code===a)}function ia(){return[...q]}function sa(){return[...M]}function ra(a){const e=new Set(a),n=new Map;return M.forEach(t=>{t.menuCodes.some(i=>e.has(i))&&n.set(t.id,t)}),Array.from(n.values())}function oa(a){return a.reduce((e,n)=>(e[n.category]||(e[n.category]=[]),e[n.category].push(n),e),{})}const C="selectedMenusV1",D="kitchenModeV1",v="checkedIngredientsV1";let f=[],h=!1,P={};function ua(a){return typeof a=="string"&&p.includes(a)}function L(a){if(!Array.isArray(a))return[];const e=new Set;return a.forEach(n=>{ua(n)&&e.add(n)}),Array.from(e)}function ca(){if(typeof window>"u")return null;try{const a=window.localStorage.getItem(C);return a===null?null:L(JSON.parse(a))}catch{return null}}function da(a){if(!(typeof window>"u"))try{window.localStorage.setItem(C,JSON.stringify(a))}catch{}}function x(a){if(typeof a!="object"||a===null||Array.isArray(a))return{};const e={};return Object.entries(a).forEach(([n,t])=>{typeof n=="string"&&n.trim()&&typeof t=="boolean"&&(e[n]=t)}),e}function la(){if(typeof window>"u")return null;try{const a=window.localStorage.getItem(v);return a===null?null:x(JSON.parse(a))}catch{return null}}function pa(a){if(!(typeof window>"u"))try{window.localStorage.setItem(v,JSON.stringify(a))}catch{}}function g(){const a=ca();return a!==null?(f=a,[...a]):[...f]}function T(a){const e=L(a);f=e,da(e)}function N(a){const e=L([...g(),a]);return T(e),e}function ma(){if(f=[],!(typeof window>"u"))try{window.localStorage.removeItem(C)}catch{}}function A(){if(typeof window>"u")return h;try{const a=window.localStorage.getItem(D);return a===null||(h=JSON.parse(a)===!0),h}catch{return h}}function ha(a){if(h=a,!(typeof window>"u"))try{window.localStorage.setItem(D,JSON.stringify(a))}catch{}}function F(){const a=la();return a!==null?(P=a,{...a}):{...P}}function ga(a){const e=x(a);P=e,pa(e)}function ka(a){const e=F(),n={...e,[a]:!e[a]};return ga(n),n}function ya(){if(P={},!(typeof window>"u"))try{window.localStorage.removeItem(v)}catch{}}const ba={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function o(a){return a.replace(/[&<>"']/g,e=>ba[e]??e)}const fa=["PPT","KCP","HLA","PKP","BLD","KRM","BPP"];function Pa(a){return p.includes(a)}function Sa(){const a=new Set(g()),e=fa.map((i,s)=>{const u=H(i),c=a.has(i),d=u?.title??`Menu ${i}`;return`
      <article class="plan-card" data-menu="${o(i)}">
        <div class="plan-card-head">
          <p class="day-label">Hari ${s+1}</p>
          <span class="menu-code-chip">${o(i)}</span>
        </div>
        <h2 class="plan-card-title">${o(d)}</h2>
        <p class="plan-meta">Prep 15 min • Masak 25 min</p>
        <div class="plan-actions">
          <a class="btn btn-secondary" href="#/recipes/${encodeURIComponent(i)}">Buka Resepi</a>
          <button
            type="button"
            class="btn btn-primary"
            data-add-menu="${o(i)}"
            ${c?"disabled":""}
          >
            ${c?"Ditambah ✓":"Tambah ke Shopping List"}
          </button>
        </div>
        <p class="plan-added-note ${c?"is-visible":""}" data-added-note>
          Ditambah ✓ Menu ini sudah ada dalam Shopping List.
        </p>
      </article>
    `}).join(""),n=a.size,t=n>0?`${n} menu telah ditambah ke Shopping List.`:'Tekan "Tambah ke Shopping List" untuk simpan menu dipilih.';return`
    <section class="page-card">
      <h1>Plan 7 Hari</h1>
      <p class="plan-intro">Susun menu harian dan terus simpan ke senarai shopping.</p>
      <p class="plan-feedback ${n>0?"is-visible":""}" data-plan-feedback aria-live="polite">
        ${o(t)}
      </p>
      <div class="plan-grid">${e}</div>
    </section>
  `}function wa(a){const e=a.querySelector("[data-plan-feedback]");a.querySelectorAll("[data-add-menu]").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.addMenu;if(!t||!Pa(t))return;const i=N(t);n.disabled=!0,n.textContent="Ditambah ✓";const u=n.closest(".plan-card")?.querySelector("[data-added-note]");u&&u.classList.add("is-visible"),e&&(e.classList.add("is-visible"),e.textContent=`Ditambah ✓ ${t}. Jumlah menu dipilih: ${i.length}.`)})})}function O(a){return p.some(e=>e===a)}function Ma(){return new Map(sa().map(a=>[a.id,a]))}function E(a){document.body.classList.toggle("kitchen-mode",a)}function B(a){return`
    <section class="page-card">
      <h1>Halaman Resepi</h1>
      <p class="recipe-code">Resepi: ${o(a||"-")}</p>
      <p>Resepi tidak dijumpai.</p>
      <p><a class="chip-link" href="#/plan">Kembali ke Plan 7 Hari</a></p>
    </section>
  `}function Ca(a){const e=a.trim().toUpperCase();if(!O(e))return B(e);const n=H(e);if(!n)return B(e);const t=Ma(),i=n.ingredientIds.map(r=>t.get(r)).filter(r=>r!==void 0),u=new Set(g()).has(n.code),c=i.map(r=>`<li>${o(r.name)}${r.quantity?` <span class="ingredient-qty">(${o(r.quantity)})</span>`:""}</li>`).join(""),d=n.stepsShort.map(r=>`<li>${o(r)}</li>`).join(""),k=n.stepsFull.map(r=>`<li>${o(r)}</li>`).join("");return`
    <article class="page-card recipe-page" data-recipe-page data-menu-code="${o(n.code)}">
      <header class="recipe-header">
        <div class="recipe-head-row">
          <h1 class="recipe-title">${o(n.title)}</h1>
          <span class="menu-code-chip">${o(n.code)}</span>
        </div>
        <p class="recipe-meta">Prep 15 min • Masak 25 min</p>
        <p class="recipe-summary">${o(n.summary)}</p>
        <div class="recipe-tools print-hidden">
          <button
            type="button"
            class="btn btn-primary"
            data-add-shopping
            ${u?"disabled":""}
          >
            ${u?"Ditambah ✓":"Tambah ke Shopping List"}
          </button>
          <button type="button" class="btn btn-secondary" data-kitchen-toggle>Dapur Mode</button>
          <button type="button" class="btn btn-secondary" data-print-recipe>Print</button>
        </div>
        <p class="recipe-feedback ${u?"is-visible":""}" data-recipe-feedback aria-live="polite">
          ${u?"Ditambah ✓ Menu ini sudah ada dalam Shopping List.":""}
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
        <ul class="step-list step-list-short">${d}</ul>
        <button type="button" class="btn btn-secondary print-hidden" data-toggle-steps>
          Tunjuk Langkah Penuh
        </button>
        <div class="steps-full-wrap" data-full-steps hidden>
          <h3 class="recipe-subtitle">Langkah Penuh</h3>
          <ol class="step-list step-list-full">${k}</ol>
        </div>
      </section>

      <section id="nota" class="recipe-section">
        <h2 class="section-title">Nota</h2>
        <p>Tambah nota sendiri nanti.</p>
      </section>
    </article>
  `}function va(a){const e=a.querySelector("[data-recipe-page]");if(!e)return;const n=e.querySelector("[data-kitchen-toggle]"),t=e.querySelector("[data-print-recipe]"),i=e.querySelector("[data-add-shopping]"),s=e.querySelector("[data-recipe-feedback]"),u=e.querySelector("[data-full-steps]"),c=e.querySelector("[data-toggle-steps]"),d=r=>{n&&(n.textContent=r?"Dapur Mode: ON":"Dapur Mode",n.setAttribute("aria-pressed",String(r)))},k=A();E(k),d(k),n&&n.addEventListener("click",()=>{const r=!A();ha(r),E(r),d(r)}),t&&t.addEventListener("click",()=>{window.print()}),i&&i.addEventListener("click",()=>{const r=e.dataset.menuCode;!r||!O(r)||(N(r),i.disabled=!0,i.textContent="Ditambah ✓",s&&(s.classList.add("is-visible"),s.textContent=`Ditambah ✓ ${r} dimasukkan ke Shopping List.`))}),c&&u&&c.addEventListener("click",()=>{if(u.hasAttribute("hidden")){u.removeAttribute("hidden"),c.textContent="Sorok Langkah Penuh";return}u.setAttribute("hidden","true"),c.textContent="Tunjuk Langkah Penuh"}),e.querySelectorAll("[data-jump-link]").forEach(r=>{r.addEventListener("click",Q=>{Q.preventDefault();const K=r.dataset.jumpLink,j=K?e.querySelector(`#${K}`):null;j&&j.scrollIntoView({behavior:"smooth",block:"start"})})})}function La(){return`
    <section class="page-card">
      <h1>Senarai Resepi</h1>
      <p>Pilih kod menu untuk buka halaman resepi.</p>
      <div class="chip-row">${ia().map(e=>`<a class="chip-link" href="#/recipes/${encodeURIComponent(e.code)}">${o(e.code)}</a>`).join("")}</div>
    </section>
  `}function Ta(a){const e=a.replace(/"/g,'""');return/[",\r\n]/.test(e)?`"${e}"`:e}function $a(a){return a.map(e=>e.map(n=>Ta(n)).join(",")).join(`\r
`)}function Ka(a,e,n){if(typeof document>"u")return;const t=new Blob([e],{type:n}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=a,s.style.display="none",document.body.append(s),s.click(),s.remove(),URL.revokeObjectURL(i)}async function ja(a){if(typeof window>"u"||typeof document>"u")return!1;if(window.navigator.clipboard?.writeText)try{return await window.navigator.clipboard.writeText(a),!0}catch{}const e=document.createElement("textarea");e.value=a,e.setAttribute("readonly","true"),e.style.position="fixed",e.style.opacity="0",e.style.left="-9999px",document.body.append(e),e.select(),e.setSelectionRange(0,e.value.length);let n=!1;try{n=document.execCommand("copy")}catch{n=!1}return e.remove(),n}let S=!1,l="idle",y=null;function V(a){const e=new Set(a);return p.filter(n=>e.has(n))}function U(a,e){const n=new Set(e);return a.menuCodes.filter(t=>n.has(t))}function G(){const a=V(g()),e=F(),n=ra(a),t=S?n.filter(s=>e[s.id]!==!0):n,i=Object.entries(oa(t)).map(([s,u])=>({category:s,ingredients:u}));return{selectedMenus:a,checkedMap:e,groupedIngredients:i}}function w(a){return a.groupedIngredients.some(e=>e.ingredients.length>0)}function Aa(a){const n=["Shopping List",`Menu: ${a.selectedMenus.length>0?a.selectedMenus.join(", "):"-"}`,""];return w(a)?(a.groupedIngredients.forEach((t,i)=>{n.push(`[${t.category}]`),t.ingredients.forEach(s=>{const c=a.checkedMap[s.id]===!0?"✅ ":"☐ ",d=s.quantity?` (${s.quantity})`:"";n.push(`${c}${s.name}${d}`)}),i<a.groupedIngredients.length-1&&n.push("")}),n.join(`
`)):(n.push("Tiada bahan untuk dipaparkan."),n.join(`
`))}function Ea(a){const e=[["category","item","quantity","menuCodes","checked"]];return a.groupedIngredients.forEach(n=>{n.ingredients.forEach(t=>{e.push([n.category,t.name,t.quantity??"",U(t,a.selectedMenus).join("|"),a.checkedMap[t.id]===!0?"TRUE":"FALSE"])})}),$a(e)}function Ba(a){const e=new Set(a);return p.map(n=>{const t=e.has(n);return`
      <button
        type="button"
        class="menu-filter-chip ${t?"is-selected":""}"
        data-menu-filter="${o(n)}"
        aria-pressed="${t}"
      >
        ${o(n)}
      </button>
    `}).join("")}function Ra(a,e){const n=e.checkedMap[a.id]===!0,t=n?"sudah dibeli":"belum dibeli",i=U(a,e.selectedMenus).map(s=>`<span class="menu-mini-chip">${o(s)}</span>`).join("");return`
    <button
      type="button"
      class="ingredient-row ${n?"is-checked":""}"
      data-ingredient-id="${o(a.id)}"
      role="checkbox"
      aria-checked="${n}"
      aria-label="${o(a.name)} (${t})"
    >
      <span class="ingredient-check ${n?"is-checked":""}" aria-hidden="true">
        ${n?"✓":""}
      </span>
      <span class="sr-only">${o(t)}</span>
      <span class="ingredient-main">
        <span class="ingredient-name-line">
          <span class="ingredient-name">${o(a.name)}</span>
          ${a.quantity?`<span class="shopping-ingredient-qty">${o(a.quantity)}</span>`:""}
        </span>
        <span class="ingredient-subline">
          <span class="menu-mini-row">${i}</span>
          ${a.notes?`<span class="shopping-ingredient-note">${o(a.notes)}</span>`:""}
        </span>
      </span>
    </button>
  `}function Ia(a){return w(a)?a.groupedIngredients.map(e=>{const n=e.ingredients.map(t=>Ra(t,a)).join("");return`
        <section class="shopping-category">
          <h2 class="shopping-category-title">${o(e.category)}</h2>
          <div class="ingredient-group-list">${n}</div>
        </section>
      `}).join(""):`
      <div class="shopping-empty-state">
        <p>${S?"Semua bahan telah ditanda dibeli.":"Tiada bahan untuk pilihan menu semasa."}</p>
      </div>
    `}function _(){const a=G(),e=a.selectedMenus.length>0?a.selectedMenus.join(", "):"Belum ada menu dipilih.",n=w(a),t=l==="success"?"Disalin ✓":l==="error"?"Gagal salin":"",i=a.selectedMenus.length===0?`
        <div class="shopping-empty-state">
          <p>Belum ada menu dipilih. Pilih menu dahulu untuk jana senarai bahan.</p>
          <button type="button" class="btn btn-primary" data-shopping-action="select-all-empty">
            Pilih Semua (7)
          </button>
        </div>
      `:Ia(a);return`
    <section class="page-card shopping-page" data-shopping-page>
      <h1>Shopping List</h1>
      <p class="shopping-line">Menu dipilih: ${o(e)}</p>

      <div class="menu-filter-row print-hidden">${Ba(a.selectedMenus)}</div>

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
        class="shopping-copy-feedback print-hidden ${l!=="idle"?"is-visible":""}"
        data-copy-feedback
        aria-live="polite"
      >
        ${o(t)}
      </p>

      <label class="shopping-toggle print-hidden">
        <input type="checkbox" data-show-unchecked ${S?"checked":""} />
        <span>Tunjuk belum dibeli sahaja</span>
      </label>

      <div class="shopping-content">${i}</div>
    </section>
  `}function z(a){return a.querySelector("[data-shopping-page]")!==null}function m(a){z(a)&&(a.innerHTML=_(),J(a))}function qa(a,e){l=a,R(e),y!==null&&window.clearTimeout(y),y=window.setTimeout(()=>{l="idle",y=null,R(e)},1500)}function R(a){if(!z(a))return;const e=a.querySelector("[data-copy-feedback]");if(!e)return;const n=l==="success"?"Disalin ✓":l==="error"?"Gagal salin":"";e.textContent=n,e.classList.toggle("is-visible",l!=="idle")}function Ha(a){const e=new Set(g());e.has(a)?e.delete(a):e.add(a),T(V(Array.from(e)))}function J(a){a.querySelectorAll("[data-menu-filter]").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.menuFilter;!t||!p.includes(t)||(Ha(t),m(a))})}),a.querySelectorAll("[data-shopping-action]").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.shoppingAction;if(t==="select-all"||t==="select-all-empty"){T([...p]),m(a);return}if(t==="clear-menu"){ma(),m(a);return}t==="reset-checks"&&(ya(),m(a))})}),a.querySelectorAll("[data-shopping-tool]").forEach(n=>{n.addEventListener("click",async()=>{const t=n.dataset.shoppingTool,i=G();if(w(i)){if(t==="copy"){const s=Aa(i),u=await ja(s);qa(u?"success":"error",a);return}if(t==="csv"){const s=Ea(i);Ka("shopping_list.csv",s,"text/csv;charset=utf-8");return}t==="print"&&window.print()}})});const e=a.querySelector("[data-show-unchecked]");e&&e.addEventListener("change",()=>{S=e.checked,m(a)}),a.querySelectorAll("[data-ingredient-id]").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.ingredientId;t&&(ka(t),m(a))})})}const $=document.querySelector("#app");if(!$)throw new Error("Elemen #app tidak ditemui.");$.innerHTML=`
  <div class="app-shell">
    <header class="topbar">
      <p class="brand">Resepi Puasa</p>
      ${Z()}
    </header>
    <main id="route-view" class="route-view" aria-live="polite"></main>
  </div>
`;const W=$.querySelector("#route-view");if(!W)throw new Error("Elemen #route-view tidak ditemui.");const b=W;function Da(a){return a.name==="plan"?Sa():a.name==="shopping"?_():a.name==="recipes"?La():Ca(a.params.code??"")}function Y(){const a=I(window.location.hash);if(!a){window.location.hash="/plan";return}aa(a.name),b.innerHTML=Da(a),a.name==="plan"&&wa(b),a.name==="shopping"&&J(b),a.name==="recipe"&&va(b)}window.addEventListener("hashchange",Y);!window.location.hash||!I(window.location.hash)?window.location.hash="/plan":Y();
