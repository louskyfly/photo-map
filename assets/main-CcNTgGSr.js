(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const G={currentTab:"home",history:[],listeners:[],init(){document.querySelectorAll(".tab-item").forEach(e=>{e.addEventListener("click",()=>this.navigate(e.dataset.tab))})},navigate(e,t={}){this.currentTab!==e&&this.history.push({tab:this.currentTab}),this.currentTab=e,this.updateTabBar(),this.listeners.forEach(a=>a(e,t)),document.getElementById("page-container").scrollTop=0},goBack(){if(this.history.length){const e=this.history.pop();this.navigate(e.tab)}},updateTabBar(){document.querySelectorAll(".tab-item").forEach(e=>{e.classList.toggle("active",e.dataset.tab===this.currentTab)})},onChange(e){this.listeners.push(e)}},ye="explore_pwa",be=1;let N=null;function fe(){return new Promise((e,t)=>{const a=indexedDB.open(ye,be);a.onupgradeneeded=i=>{const o=i.target.result;if(o.objectStoreNames.contains("settings")||o.createObjectStore("settings",{keyPath:"key"}),!o.objectStoreNames.contains("photos")){const n=o.createObjectStore("photos",{keyPath:"id"});n.createIndex("routeId","routeId",{unique:!1}),n.createIndex("stepId","stepId",{unique:!1}),n.createIndex("teamId","teamId",{unique:!1}),n.createIndex("timestamp","timestamp",{unique:!1})}if(!o.objectStoreNames.contains("progress")){const n=o.createObjectStore("progress",{keyPath:"id"});n.createIndex("city","city",{unique:!1}),n.createIndex("routeId","routeId",{unique:!1})}o.objectStoreNames.contains("teams")||o.createObjectStore("teams",{keyPath:"id"}),o.objectStoreNames.contains("challenges")||o.createObjectStore("challenges",{keyPath:"id"}).createIndex("stepId","stepId",{unique:!1}),o.objectStoreNames.contains("history")||o.createObjectStore("history",{keyPath:"id"}).createIndex("timestamp","timestamp",{unique:!1}),o.objectStoreNames.contains("achievements")||o.createObjectStore("achievements",{keyPath:"id"})},a.onsuccess=i=>{N=i.target.result,e(N)},a.onerror=i=>t(i.target.error)})}async function xe(){return N||await fe(),N}function x(e,t="readonly"){return xe().then(a=>a.transaction(e,t).objectStore(e))}function $(e){return new Promise((t,a)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>a(e.error)})}const u={async getSetting(e){const t=await x("settings"),a=await $(t.get(e));return a?a.value:null},async setSetting(e,t){const a=await x("settings","readwrite");return $(a.put({key:e,value:t}))},async getSettings(){const e=await x("settings"),t=await $(e.getAll()),a={};return t.forEach(i=>{a[i.key]=i.value}),a},async addPhoto(e){const t=await x("photos","readwrite");return $(t.put(e))},async getPhoto(e){const t=await x("photos");return $(t.get(e))},async getPhotosByRoute(e){const a=(await x("photos")).index("routeId");return $(a.getAll(e))},async getAllPhotos(){const e=await x("photos");return $(e.getAll())},async deletePhoto(e){const t=await x("photos","readwrite");return $(t.delete(e))},async saveProgress(e){const t=await x("progress","readwrite");return $(t.put(e))},async getProgress(e){const a=(await x("progress")).index("city");return $(a.getAll(e))},async getAllProgress(){const e=await x("progress");return $(e.getAll())},async saveTeam(e){const t=await x("teams","readwrite");return $(t.put(e))},async getTeam(e){const t=await x("teams");return $(t.get(e))},async getAllTeams(){const e=await x("teams");return $(e.getAll())},async deleteTeam(e){const t=await x("teams","readwrite");return $(t.delete(e))},async saveChallenge(e){const t=await x("challenges","readwrite");return $(t.put(e))},async getChallengesByStep(e){const a=(await x("challenges")).index("stepId");return $(a.getAll(e))},async getAllChallenges(){const e=await x("challenges");return $(e.getAll())},async addHistory(e){const t=await x("history","readwrite");return $(t.put(e))},async getHistory(){const e=await x("history");return(await $(e.getAll())).sort((a,i)=>i.timestamp-a.timestamp)},async saveAchievement(e){const t=await x("achievements","readwrite");return $(t.put(e))},async getAchievement(e){const t=await x("achievements");return $(t.get(e))},async getAllAchievements(){const e=await x("achievements");return $(e.getAll())}};function _(){return Date.now().toString(36)+Math.random().toString(36).substr(2,9)}const V="explore_theme",$e={current:"dark",listeners:[],async init(){const e=await u.getSetting(V);this.current=e||this.getSystemTheme(),this.apply(),this.watchSystem()},getSystemTheme(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"},apply(){document.documentElement.setAttribute("data-theme",this.current);const e=document.querySelector('meta[name="theme-color"]');e&&(e.content=this.current==="dark"?"#0a0a1a":"#f2f2f7")},async set(e){e==="auto"?this.current=this.getSystemTheme():this.current=e,this.apply(),await u.setSetting(V,e),this.listeners.forEach(t=>t(this.current))},toggle(){this.set(this.current==="dark"?"light":"dark")},watchSystem(){window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",async()=>{const e=await u.getSetting(V);(e==="auto"||!e)&&(this.current=this.getSystemTheme(),this.apply(),this.listeners.forEach(t=>t(this.current)))})},onChange(e){this.listeners.push(e)}};function f(e,t="info",a=3e3){const i=document.getElementById("toast-container"),o={success:"✓",error:"✕",info:"ℹ"},n=document.createElement("div");n.className=`toast toast-${t}`,n.innerHTML=`<span class="toast-icon">${o[t]}</span><span>${e}</span>`,i.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateY(-10px)",n.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},a)}function A(e,t,a=[]){const i=document.getElementById("modal-container"),o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
    <div class="modal-backdrop"></div>
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-header">
        <h2>${e}</h2>
        <button class="icon-btn modal-close" aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body">${t}</div>
      ${a.length?`<div style="padding:0 20px 24px;display:flex;gap:8px;">${a.map(r=>`<button class="btn ${r.class||"btn-primary"}" style="flex:1" data-action="${r.id}">${r.label}</button>`).join("")}</div>`:""}
    </div>
  `,i.appendChild(o);const n=()=>{o.querySelector(".modal-backdrop").style.opacity="0",o.querySelector(".modal-sheet").style.transform="translateY(100%)",setTimeout(()=>o.remove(),300)};return o.querySelector(".modal-backdrop").addEventListener("click",n),o.querySelector(".modal-close").addEventListener("click",n),a.forEach(r=>{const d=o.querySelector(`[data-action="${r.id}"]`);d&&r.onClick&&d.addEventListener("click",()=>{r.onClick(o),n()})}),{modal:o,close:n}}function F(e){const t=document.getElementById("sidebar");e?(t.classList.remove("hidden"),document.getElementById("sidebar-backdrop").onclick=()=>F(!1),document.getElementById("btn-close-sidebar").onclick=()=>F(!1)):t.classList.add("hidden")}function z(e){document.getElementById("page-title").textContent=e}function we(e,t){document.getElementById("sidebar-username").textContent=e,document.getElementById("sidebar-team-name").textContent=t||"Aucune équipe",document.getElementById("sidebar-avatar").textContent=e[0].toUpperCase()}function ze(e,t=44){const a=(t-6)/2,i=Math.PI*2*a,o=i-e/100*i;return`
    <div class="route-progress-ring" style="width:${t}px;height:${t}px">
      <svg width="${t}" height="${t}">
        <circle class="route-progress-bg" cx="${t/2}" cy="${t/2}" r="${a}"/>
        <circle class="route-progress-fill" cx="${t/2}" cy="${t/2}" r="${a}"
          stroke-dasharray="${i}" stroke-dashoffset="${o}"/>
      </svg>
      <div class="route-progress-text">${e}%</div>
    </div>
  `}function se(e){return new Date(e).toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"})}function H(e){const t=Date.now()-e,a=Math.floor(t/6e4);if(a<1)return"à l'instant";if(a<60)return`il y a ${a}min`;const i=Math.floor(a/60);return i<24?`il y a ${i}h`:`il y a ${Math.floor(i/24)}j`}const W={id:"bilbao",name:"Bilbao",country:"Espagne",flag:"🇪🇸",center:[43.263,-2.935],zoom:13,gradient:"linear-gradient(135deg, #173B7A 0%, #0e8a5f 100%)",categories:{monuments:{label:"Monuments",icon:"🏛️",color:"#AB47BC"},viewpoints:{label:"Points de vue",icon:"🔭",color:"#42A5F5"},nature:{label:"Nature",icon:"🌿",color:"#66BB6A"},streetart:{label:"Street Art",icon:"🎨",color:"#EC407A"},architecture:{label:"Architecture",icon:"🏗️",color:"#5C6BC0"},unusual:{label:"Insolite",icon:"✨",color:"#FFA726"},culture:{label:"Culture",icon:"🎭",color:"#26C6DA"},gastronomy:{label:"Gastronomie",icon:"🍷",color:"#EF5350"}},pois:[{id:"b01",name:"Guggenheim Bilbao",description:"Musée d'art contemporain conçu par Frank Gehry, emblème de la ville avec son architecture titane spectaculaire.",lat:43.2677,lng:-2.934,category:"monuments",emoji:"🏛️",image:"https://picsum.photos/seed/guggenheim-bilbao/400/300"},{id:"b02",name:"Cathédrale de Santiago",description:"Cathédrale gothique du XIIIe siècle, chef-d'œuvre architectural au cœur de la vieille ville.",lat:43.263,lng:-2.9276,category:"monuments",emoji:"⛪",image:"https://picsum.photos/seed/cathedrale-santiago-bilbao/400/300"},{id:"b03",name:"Palais d'Arts Reina Sofía",description:"Complexe culturel monumental de Calatrava, hébergeant opéra et spectacles.",lat:43.2685,lng:-2.9938,category:"architecture",emoji:"🎭",image:"https://picsum.photos/seed/palais-arts-reina-sofia/400/300"},{id:"b04",name:"Pont Zubizuri",description:"Pont suspendu en verre de Calatrava, joyau architectural sur la Nervion.",lat:43.2628,lng:-2.9304,category:"architecture",emoji:"🌉",image:"https://picsum.photos/seed/pont-zubizuri/400/300"},{id:"b05",name:"Mirador de Artxanda",description:"Point de vue panoramique sur toute la ville depuis la montagne.",lat:43.285,lng:-2.92,category:"viewpoints",emoji:"🔭",image:"https://picsum.photos/seed/mirador-artxanda/400/300"},{id:"b06",name:"Parc d'Etxebarria",description:"Vaste parc verdoyant sur l'ancien site industriel d'Altos Hornos.",lat:43.267,lng:-2.915,category:"nature",emoji:"🌿",image:"https://picsum.photos/seed/parc-etxebarria/400/300"},{id:"b07",name:"Jardins de Albia",description:"Jardins élégants du XIXe siècle, havre de paix urbain.",lat:43.2588,lng:-2.932,category:"nature",emoji:"🌺",image:"https://picsum.photos/seed/jardins-albia/400/300"},{id:"b08",name:"Casco Viejo (Vieille Ville)",description:"Le quartier historique Siete Calles avec ses rues médiévales et ses pintxos bars.",lat:43.2616,lng:-2.926,category:"culture",emoji:"🏘️",image:"https://picsum.photos/seed/casco-viejo-bilbao/400/300"},{id:"b09",name:"Mercado de la Ribera",description:"Plus grand marché couvert d'Europe, pittoresque sur les rives de la Nervion.",lat:43.2584,lng:-2.9288,category:"gastronomy",emoji:"🏪",image:"https://picsum.photos/seed/mercado-ribera/400/300"},{id:"b10",name:"Azkuna Zentroa",description:"Centre culturel réhabilité par Philippe Starck, ancien marché aux abattoirs.",lat:43.2612,lng:-2.9392,category:"culture",emoji:"🎪",image:"https://picsum.photos/seed/azkuna-zentroa/400/300"},{id:"b11",name:"Funiculaire d'Artxanda",description:"Funiculaire offrant une ascent rapide vers le mirador panoramique.",lat:43.2706,lng:-2.9285,category:"unusual",emoji:"🚡",image:"https://picsum.photos/seed/funiculaire-artxanda/400/300"},{id:"b12",name:"Street Art Ensanche",description:"Quartier Ensanche richement décoré de fresques murales contemporaines.",lat:43.2618,lng:-2.933,category:"streetart",emoji:"🎨",image:"https://picsum.photos/seed/street-art-ensanche/400/300"},{id:"b13",name:"Église de San Nicolás",description:'Église baroque du XVIIIe surnommée "Cathédrale des pintxos".',lat:43.2632,lng:-2.9268,category:"monuments",emoji:"⛪",image:"https://picsum.photos/seed/eglise-san-nicolas/400/300"},{id:"b14",name:"Promenade de la Nervion",description:"Promenade le long de la rivière Nervion entre le Guggenheim et la Cathédrale.",lat:43.262,lng:-2.931,category:"nature",emoji:"🌊",image:"https://picsum.photos/seed/promenade-nervion/400/300"},{id:"b15",name:"Circuit des bars à pintxos",description:"Circuit des meilleurs bars à pintxos du Casco Viejo.",lat:43.2614,lng:-2.9255,category:"gastronomy",emoji:"🍢",image:"https://picsum.photos/seed/bars-pintxos-bilbao/400/300"},{id:"b16",name:"Teatro Arriaga",description:"Théâtre néo-baroque inspiré de l'Opéra Garnier, joyau architectural.",lat:43.2598,lng:-2.9272,category:"architecture",emoji:"🎭",image:"https://picsum.photos/seed/teatro-arriaga/400/300"},{id:"b17",name:"Abandoibarra",description:"Zone de régénération urbaine le long de la rivière avec sculptures contemporaines.",lat:43.265,lng:-2.931,category:"streetart",emoji:"🗿",image:"https://picsum.photos/seed/abandoibarra/400/300"},{id:"b18",name:"Doña Casilda Park",description:"Principal parc urbain avec étang, paons et musée des Beaux-Arts.",lat:43.2712,lng:-2.943,category:"nature",emoji:"🦚",image:"https://picsum.photos/seed/parc-dona-casilda/400/300"},{id:"b19",name:"Basílica de Begoña",description:"Basílique gothique-Renaissance, patronne de Biscaye, perchée sur la colline.",lat:43.2668,lng:-2.918,category:"monuments",emoji:"⛪",image:"https://picsum.photos/seed/basilica-begona/400/300"},{id:"b20",name:"Zorrotzaire Murals",description:"Quartier Zorrotzaire couvert de murales géants signés par des artistes internationaux.",lat:43.275,lng:-2.942,category:"streetart",emoji:"🎨",image:"https://picsum.photos/seed/zorrotzaire-murals/400/300"}],routes:[{id:"br01",name:"Bilbao Monumental",description:"Découvrez les joyaux architecturaux de Bilbao en un parcours inoubliable.",emoji:"🏛️",difficulty:"Facile",duration:"3h",distance:"4.2 km",color:"#AB47BC",city:"bilbao",steps:[{id:"br01s01",poiId:"b01",name:"Guggenheim Bilbao",description:"Commencez par le chef-d'œuvre de Frank Gehry. Admirez les courbes de titane et les sculptures monumentales.",lat:43.2677,lng:-2.934,category:"monuments",challenges:[{id:"ch01",type:"photo",title:"Reproduire la vue du Guggenheim",description:"Prenez une photo identique à la vue emblématique du musée depuis le pont.",points:150},{id:"ch02",type:"find",title:'Trouver le "Puppy" géant',description:`Photographiez la sculpture florale "Puppy" de Jeff Koons devant l'entrée.`,points:100}]},{id:"br01s02",poiId:"b04",name:"Pont Zubizuri",description:"Traversez le pont en verre de Calatrava et profitez de la vue sur la rivière.",lat:43.2628,lng:-2.9304,category:"architecture",challenges:[{id:"ch03",type:"photo",title:"Photo du reflet",description:"Capturez votre reflet dans le sol en verre du pont.",points:120}]},{id:"br01s03",poiId:"b16",name:"Teatro Arriaga",description:"Admirez ce théâtre néo-baroque qui rivalise avec l'Opéra Garnier.",lat:43.2598,lng:-2.9272,category:"architecture",challenges:[]},{id:"br01s04",poiId:"b02",name:"Cathédrale de Santiago",description:"Explorez cette cathédrale gothique du XIIIe siècle, joyau de la vieille ville.",lat:43.263,lng:-2.9276,category:"monuments",challenges:[{id:"ch04",type:"find",title:"Le portail gothique",description:"Photographiez le portail principal avec ses sculptures médiévales.",points:100}]},{id:"br01s05",poiId:"b13",name:"Église de San Nicolás",description:'Découvrez la "Cathédrale des Pintxos" avec son magnifique retable baroque.',lat:43.2632,lng:-2.9268,category:"monuments",challenges:[{id:"ch05",type:"color",title:"Le bleu du retable",description:"Trouvez et photographiez l'élément bleu dominant du retable baroque.",points:130}]}]},{id:"br02",name:"Parcours Art & Street Art",description:"Un parcours urbain à la rencontre de l'art contemporain et du street art.",emoji:"🎨",difficulty:"Moyen",duration:"4h",distance:"5.8 km",color:"#EC407A",city:"bilbao",steps:[{id:"br02s01",poiId:"b10",name:"Azkuna Zentroa",description:"Le centre culturel de Philippe Starck avec ses 43 colonnes dorées.",lat:43.2612,lng:-2.9392,category:"culture",challenges:[{id:"ch06",type:"find",title:"Les colonnes multicolores",description:"Photographiez les colonnes de l'atrium dans les différentes couleurs.",points:110}]},{id:"br02s02",poiId:"b17",name:"Abandoibarra",description:"Promenez-vous parmi les sculptures contemporaines le long de la rivière.",lat:43.265,lng:-2.931,category:"streetart",challenges:[{id:"ch07",type:"photo",title:"La toile géante",description:"Reproduisez la vue de la fresque murale la plus imposante du quartier.",points:130}]},{id:"br02s03",poiId:"b12",name:"Street Art Ensanche",description:"Le quartier Ensanche regorge de fresques murales colorées et surprenantes.",lat:43.2618,lng:-2.933,category:"streetart",challenges:[{id:"ch08",type:"color",title:"Le rouge vif",description:"Trouvez et photographiez l'élément le plus rouge du quartier.",points:100}]},{id:"br02s04",poiId:"b20",name:"Zorrotzaire Murals",description:"Découvrez les murales géants du quartier Zorrotzaire, œuvres d'artistes internationaux.",lat:43.275,lng:-2.942,category:"streetart",challenges:[{id:"ch09",type:"photo",title:"Le plus grand murale",description:"Photographiez le plus grand murale du quartier en entier.",points:150}]}]},{id:"br03",name:"Nature & Panoramas",description:"Montez aux points de vue et profitez des espaces verts de Bilbao.",emoji:"🌿",difficulty:"Moyen",duration:"3h30",distance:"6.5 km",color:"#66BB6A",city:"bilbao",steps:[{id:"br03s01",poiId:"b06",name:"Parc d'Etxebarria",description:"Commencez par ce vaste parc verdoyant, poumon vert de Bilbao.",lat:43.267,lng:-2.915,category:"nature",challenges:[{id:"ch10",type:"find",title:"La roue métallique",description:"Photographiez la structure métallique restée de l'ancienne usine.",points:80}]},{id:"br03s02",poiId:"b11",name:"Funicular d'Artxanda",description:"Montez en funiculaire jusqu'au sommet pour un panorama exceptionnel.",lat:43.2706,lng:-2.9285,category:"unusual",challenges:[{id:"ch11",type:"photo",title:"Vue du funiculaire",description:"Prenez une photo depuis le funiculaire pendant l'ascension.",points:120}]},{id:"br03s03",poiId:"b05",name:"Mirador de Artxanda",description:"Le point de vue le plus spectaculaire de Bilbao. 360° de ville et de montagnes.",lat:43.285,lng:-2.92,category:"viewpoints",challenges:[{id:"ch12",type:"photo",title:"Panorama complet",description:"Capturez le panorama complet de Bilbao depuis le mirador.",points:200}]},{id:"br03s04",poiId:"b18",name:"Doña Casilda Park",description:"Terminez dans ce parc élégant avec ses paons et son étang.",lat:43.2712,lng:-2.943,category:"nature",challenges:[{id:"ch13",type:"find",title:"Le paon",description:"Photographiez un paon dans le parc (si vous en trouvez un !).",points:100}]}]},{id:"br04",name:"Pintxos & Traditions",description:"Plongez dans la culture gastronomique et traditionnelle de Bilbao.",emoji:"🍷",difficulty:"Facile",duration:"2h30",distance:"2.8 km",color:"#EF5350",city:"bilbao",steps:[{id:"br04s01",poiId:"b09",name:"Mercado de la Ribera",description:"Le plus grand marché couvert d'Europe. Goûtez aux specialités locales.",lat:43.2584,lng:-2.9288,category:"gastronomy",challenges:[{id:"ch14",type:"photo",title:"Le étal de poissons",description:"Photographiez le plus beau stand de poissons du marché.",points:100}]},{id:"br04s02",poiId:"b15",name:"Circuit des bars à pintxos",description:"Le circuit des meilleurs bars à pintxos du Casco Viejo. Goûtez et votez !",lat:43.2614,lng:-2.9255,category:"gastronomy",challenges:[{id:"ch15",type:"photo",title:"Le pintxo parfait",description:"Photographiez le plus beau pintxo que vous trouvez.",points:110}]},{id:"br04s03",poiId:"b08",name:"Casco Viejo",description:"Explorez les Siete Calles historiques et leur ambiance unique.",lat:43.2616,lng:-2.926,category:"culture",challenges:[{id:"ch16",type:"find",title:"La plaque de la calle",description:"Trouvez la plaque de la rue la plus ancienne du Casco Viejo.",points:90}]}]}],utility:[{id:"bu01",type:"toilet",name:"Toilettes - Casco Viejo",lat:43.2625,lng:-2.9265,emoji:"🚻"},{id:"bu02",type:"toilet",name:"Toilettes - Guggenheim",lat:43.2682,lng:-2.934,emoji:"🚻"},{id:"bu03",type:"toilet",name:"Toilettes - Plaza Nueva",lat:43.2608,lng:-2.9275,emoji:"🚻"},{id:"bu04",type:"toilet",name:"Toilettes - Abando",lat:43.262,lng:-2.931,emoji:"🚻"},{id:"bu05",type:"toilet",name:"Toilettes - Deusto",lat:43.269,lng:-2.943,emoji:"🚻"},{id:"bu06",type:"fountain",name:"Fontaine - Ribera",lat:43.2585,lng:-2.929,emoji:"🚰"},{id:"bu07",type:"fountain",name:"Fontaine - Arriaga",lat:43.2615,lng:-2.926,emoji:"🚰"},{id:"bu08",type:"fountain",name:"Fontaine - Alameda Rekalde",lat:43.257,lng:-2.935,emoji:"🚰"},{id:"bu09",type:"fountain",name:"Fontaine - Abandoibarra",lat:43.265,lng:-2.9335,emoji:"🚰"},{id:"bu10",type:"fountain",name:"Fontaine - Gran Vía",lat:43.263,lng:-2.931,emoji:"🚰"}]},K={id:"zaragoza",name:"Saragosse",country:"Espagne",flag:"🇪🇸",center:[41.6488,-.8891],zoom:13,gradient:"linear-gradient(135deg, #173B7A 0%, #8B4513 100%)",categories:{monuments:{label:"Monuments",icon:"🏛️",color:"#AB47BC"},viewpoints:{label:"Points de vue",icon:"🔭",color:"#42A5F5"},nature:{label:"Nature",icon:"🌿",color:"#66BB6A"},streetart:{label:"Street Art",icon:"🎨",color:"#EC407A"},architecture:{label:"Architecture",icon:"🏗️",color:"#5C6BC0"},unusual:{label:"Insolite",icon:"✨",color:"#FFA726"},culture:{label:"Culture",icon:"🎭",color:"#26C6DA"},gastronomy:{label:"Gastronomie",icon:"🍷",color:"#EF5350"}},pois:[{id:"z01",name:"Basilique del Pilar",description:"L'un des plus grands sanctuaires mariaux au monde. Chef-d'œuvre baroque aux coupoles colorées.",lat:41.6558,lng:-.879,category:"monuments",emoji:"⛪",image:"https://picsum.photos/seed/basilique-pilar-zaragoza/400/300"},{id:"z02",name:"Cathédrale de la Salvator",description:"Cathédrale gothique-mudéjare, seule cathédrale de style mudéjare au monde.",lat:41.6535,lng:-.8765,category:"monuments",emoji:"🏰",image:"https://picsum.photos/seed/cathedrale-salvator-zaragoza/400/300"},{id:"z03",name:"Aljafería",description:"Palais musulman du XIe siècle, joyau de l'art hispano-mauresque et siège des Cortes d'Aragon.",lat:41.6577,lng:-.893,category:"monuments",emoji:"🕌",image:"https://picsum.photos/seed/aljaferia-zaragoza/400/300"},{id:"z04",name:"Torres de la Magdalena",description:"Ruines des anciennes tours défensives médiévales sur l'Ebre.",lat:41.658,lng:-.872,category:"architecture",emoji:"🏰",image:"https://picsum.photos/seed/torres-magdalena/400/300"},{id:"z05",name:"Mirador del Ebro",description:"Point de vue exceptionnel sur le fleuve Ebre et la basilique.",lat:41.66,lng:-.885,category:"viewpoints",emoji:"🔭",image:"https://picsum.photos/seed/mirador-ebro/400/300"},{id:"z06",name:"Parc de la Milla Digital",description:"Parc urbain moderne le long de l'Ebre avec art contemporain et espaces verts.",lat:41.663,lng:-.882,category:"nature",emoji:"🌿",image:"https://picsum.photos/seed/parc-milla-digital/400/300"},{id:"z07",name:"Galería del Color",description:"Passage piéton coloré unique en Europe avec des œuvres d'art contemporain.",lat:41.6502,lng:-.882,category:"streetart",emoji:"🎨",image:"https://picsum.photos/seed/galeria-del-color/400/300"},{id:"z08",name:"Plaza del Torico",description:"Petite place pittoresque avec la fontaine Torico, symbole de la ville.",lat:41.651,lng:-.8805,category:"culture",emoji:"⛲",image:"https://picsum.photos/seed/plaza-del-torico/400/300"},{id:"z09",name:"Casa de los Picos",description:"Palais gothique du XVe siècle avec sa façade couverte de pyramides de pierre.",lat:41.6525,lng:-.879,category:"architecture",emoji:"🏠",image:"https://picsum.photos/seed/casa-de-los-picos/400/300"},{id:"z10",name:"Puente de Piedra",description:"Pont de pierre du XVIIIe siècle, point de vue idéal sur la basilique.",lat:41.6545,lng:-.8755,category:"monuments",emoji:"🌉",image:"https://picsum.photos/seed/puente-de-piedra/400/300"},{id:"z11",name:"Museo del Foro de Caesaraugusta",description:"Ruines du forum romain de la Caesaraugusta antique.",lat:41.65,lng:-.886,category:"culture",emoji:"🏛️",image:"https://picsum.photos/seed/museo-foro-caesaraugusta/400/300"},{id:"z12",name:"Street Art El Gancho",description:"Le quartier El Gancho regorge de fresques murales colorées et engagées.",lat:41.648,lng:-.886,category:"streetart",emoji:"🎨",image:"https://picsum.photos/seed/street-art-el-gancho/400/300"},{id:"z13",name:"Basílica del Pilar - Coupoles",description:"Les 10 coupoles peintes par Goya de la basilique, vues depuis l'intérieur.",lat:41.6556,lng:-.8788,category:"monuments",emoji:"⛪",image:"https://picsum.photos/seed/pilar-coupoles/400/300"},{id:"z14",name:"Promenade de l'Ebre",description:"Promenade le long du fleuve Ebre entre les ponts historiques.",lat:41.655,lng:-.882,category:"nature",emoji:"🌊",image:"https://picsum.photos/seed/promenade-ebro/400/300"},{id:"z15",name:"Mercado Central",description:"Marché central art déco, temple de la gastronomie aragonaise.",lat:41.6498,lng:-.888,category:"gastronomy",emoji:"🏪",image:"https://picsum.photos/seed/mercado-central-zaragoza/400/300"},{id:"z16",name:"Jardins de l'Aljafería",description:"Jardins du palais musulman avec fontaines et orangers.",lat:41.658,lng:-.8935,category:"nature",emoji:"🌺",image:"https://picsum.photos/seed/jardins-aljaferia/400/300"},{id:"z17",name:"Barrio de Tubo",description:"Le plus animé des quartiers historiques, labyrinthe de rues et de bars.",lat:41.652,lng:-.883,category:"gastronomy",emoji:"🍷",image:"https://picsum.photos/seed/barrio-de-tubo/400/300"},{id:"z18",name:"Teatro de la Zarzuela",description:"Théâtre néo-baroque dédié à la zarzuela, spectacle lyrique espagnol.",lat:41.651,lng:-.887,category:"architecture",emoji:"🎭",image:"https://picsum.photos/seed/teatro-zarzuela/400/300"},{id:"z19",name:"Jardines de Parque Grande",description:"Le plus grand parc de Saragosse avec son palais et ses fontaines.",lat:41.642,lng:-.893,category:"nature",emoji:"🌿",image:"https://picsum.photos/seed/parque-grande-zaragoza/400/300"},{id:"z20",name:"Street Art Las Fuentes",description:"Le quartier Las Fuentes est une galerie à ciel ouvert de street art militant.",lat:41.64,lng:-.878,category:"streetart",emoji:"🎨",image:"https://picsum.photos/seed/street-art-fuentes/400/300"}],routes:[{id:"zr01",name:"Saragosse Monumentale",description:"Un voyage à travers les monuments emblématiques de la capitale aragonaise.",emoji:"🏰",difficulty:"Facile",duration:"3h",distance:"3.5 km",color:"#AB47BC",city:"zaragoza",steps:[{id:"zr01s01",poiId:"z01",name:"Basilique del Pilar",description:"Commencez par le monument le plus iconique de Saragosse. Les coupoles peintes par Goya sont à couper le souffle.",lat:41.6558,lng:-.879,category:"monuments",challenges:[{id:"chz01",type:"photo",title:"La vue depuis le pont",description:"Reproduisez la vue emblématique de la basilique depuis le Puente de Piedra.",points:150},{id:"chz02",type:"find",title:"Le pilier original",description:"Photographiez le pilier de jaspe vénéré dans la basilique.",points:100}]},{id:"zr01s02",poiId:"z02",name:"Cathédrale de la Salvator",description:"La seule cathédrale de style mudéjare au monde, mélange unique de gothique et d'architecture islamique.",lat:41.6535,lng:-.8765,category:"monuments",challenges:[{id:"chz03",type:"photo",title:"La tour mudéjare",description:"Photographiez la tour de style mudéjare unique en son genre.",points:120}]},{id:"zr01s03",poiId:"z10",name:"Puente de Piedra",description:"Traversez le pont de pierre et profitez de la vue imprenable sur la basilique.",lat:41.6545,lng:-.8755,category:"architecture",challenges:[{id:"chz04",type:"photo",title:"Reflet dans l'Ebre",description:"Capturez le reflet de la basilique dans les eaux de l'Ebre.",points:130}]},{id:"zr01s04",poiId:"z09",name:"Casa de los Picos",description:"Admirez cette façade unique couverte de pyramides de pierre, vestige du gothique aragonais.",lat:41.6525,lng:-.879,category:"architecture",challenges:[]},{id:"zr01s05",poiId:"z08",name:"Plaza del Torico",description:"Terminez sur cette place charmante avec sa fontaine Torico, le petit taureau.",lat:41.651,lng:-.8805,category:"culture",challenges:[{id:"chz05",type:"find",title:"Le Torico",description:"Photographiez la petite sculpture de taureau au sommet de la fontaine.",points:90}]}]},{id:"zr02",name:"Art & Couleurs de Saragosse",description:"Parcourez les rues colorées et le street art engagé de Saragosse.",emoji:"🎨",difficulty:"Moyen",duration:"4h",distance:"5.2 km",color:"#EC407A",city:"zaragoza",steps:[{id:"zr02s01",poiId:"z07",name:"Galería del Color",description:"Commencez par cette galerie piéton colorée unique en Europe.",lat:41.6502,lng:-.882,category:"streetart",challenges:[{id:"chz06",type:"color",title:"L'arc-en-ciel",description:"Photographiez l'élément contenant le plus de couleurs différentes dans la galerie.",points:120}]},{id:"zr02s02",poiId:"z12",name:"Street Art El Gancho",description:"Le quartier El Gancho est un musée à ciel ouvert de street art social et politique.",lat:41.648,lng:-.886,category:"streetart",challenges:[{id:"chz07",type:"photo",title:"La fresque géante",description:"Photographiez la plus grande fresque du quartier El Gancho.",points:130}]},{id:"zr02s03",poiId:"z20",name:"Street Art Las Fuentes",description:"Le quartier Las Fuentes et ses muralles engagées et colorées.",lat:41.64,lng:-.878,category:"streetart",challenges:[{id:"chz08",type:"color",title:"Le rouge militant",description:"Trouvez la fresque dominée par la couleur rouge dans Las Fuentes.",points:110}]},{id:"zr02s04",poiId:"z11",name:"Museo del Foro de Caesaraugusta",description:"Découvrez les ruines du forum romain, témoins de 2000 ans d'histoire.",lat:41.65,lng:-.886,category:"culture",challenges:[{id:"chz09",type:"photo",title:"La colonne romaine",description:"Photographiez la colonne romaine la mieux préservée du forum.",points:100}]}]},{id:"zr03",name:"Les Secrets de l'Aljafería",description:"Plongez dans l'histoire musulmane et chrétienne de ce palais extraordinaire.",emoji:"🕌",difficulty:"Facile",duration:"2h",distance:"2.5 km",color:"#FFA726",city:"zaragoza",steps:[{id:"zr03s01",poiId:"z03",name:"Aljafería",description:"Explorez ce palais musulman du XIe siècle, sommet de l'art hispano-mauresque.",lat:41.6577,lng:-.893,category:"monuments",challenges:[{id:"chz10",type:"photo",title:"L'oratoire de la reine",description:"Photographiez les arcs polylobés de l'oratoire, joyau de l'architecture islamique.",points:150},{id:"chz11",type:"color",title:"Le stuc doré",description:"Trouvez et photographiez les décors en stuc doré du palais.",points:130}]},{id:"zr03s02",poiId:"z16",name:"Jardins de la Aljafería",description:"Promenez-vous dans les jardins avec leurs fontaines et orangers centenaires.",lat:41.658,lng:-.8935,category:"nature",challenges:[{id:"chz12",type:"find",title:"L'oranger centenaire",description:"Photographiez le plus bel oranger du jardin.",points:90}]},{id:"zr03s03",poiId:"z04",name:"Torres de la Magdalena",description:"Les vestiges des tours défensives médiévales sur les rives de l'Ebre.",lat:41.658,lng:-.872,category:"architecture",challenges:[{id:"chz13",type:"photo",title:"Les tours au coucher du soleil",description:"Si c'est possible, photographiez les tours au coucher du soleil.",points:140}]}]},{id:"zr04",name:"Gastronomie Aragonaise",description:"Découvrez les saveurs authentiques de l'Aragon à travers marché et bars.",emoji:"🍷",difficulty:"Facile",duration:"2h30",distance:"2.2 km",color:"#EF5350",city:"zaragoza",steps:[{id:"zr04s01",poiId:"z15",name:"Mercado Central",description:"Le temple art déco de la gastronomie aragonaise. Fromages, jambons, fruits...",lat:41.6498,lng:-.888,category:"gastronomy",challenges:[{id:"chz14",type:"photo",title:"Le meilleur étal",description:"Photographiez le plus bel étal du Mercado Central.",points:100}]},{id:"zr04s02",poiId:"z17",name:"Barrio de Tubo",description:"Le quartier des bars et des tapas. Labyrinthe de rues animées.",lat:41.652,lng:-.883,category:"gastronomy",challenges:[{id:"chz15",type:"photo",title:"La tapa parfaite",description:"Photographiez la plus belle tapa que vous dégustez dans le Tubo.",points:110}]},{id:"zr04s03",poiId:"z05",name:"Mirador del Ebro",description:"Terminez avec une vue panoramique sur l'Ebre et la basilique illuminée.",lat:41.66,lng:-.885,category:"viewpoints",challenges:[{id:"chz16",type:"photo",title:"Basilique de nuit",description:"Photographiez la basilique del Pilar illuminée depuis le mirador.",points:150}]}]}],utility:[{id:"zu01",type:"toilet",name:"Toilettes - Plaza del Pilar",lat:41.6555,lng:-.878,emoji:"🚻"},{id:"zu02",type:"toilet",name:"Toilettes - Tubo",lat:41.6518,lng:-.8825,emoji:"🚻"},{id:"zu03",type:"toilet",name:"Toilettes - Mercado Central",lat:41.65,lng:-.8875,emoji:"🚻"},{id:"zu04",type:"toilet",name:"Toilettes - Aljafería",lat:41.6578,lng:-.8928,emoji:"🚻"},{id:"zu05",type:"toilet",name:"Toilettes - Parque Grande",lat:41.6425,lng:-.8925,emoji:"🚻"},{id:"zu06",type:"fountain",name:"Fontaine - Torico",lat:41.651,lng:-.8803,emoji:"🚰"},{id:"zu07",type:"fountain",name:"Fontaine - Ebre",lat:41.6548,lng:-.876,emoji:"🚰"},{id:"zu08",type:"fountain",name:"Fontaine - Pilar",lat:41.6558,lng:-.8795,emoji:"🚰"},{id:"zu09",type:"fountain",name:"Fontaine - Milla Digital",lat:41.6625,lng:-.8815,emoji:"🚰"},{id:"zu10",type:"fountain",name:"Fontaine - Parque Grande",lat:41.643,lng:-.8935,emoji:"🚰"}]},w=[W,K];async function re(e){z("Explore");const t=await u.getAllProgress(),a=await u.getAllPhotos();await u.getAllTeams();const i=w.reduce((r,d)=>r+d.routes.reduce((s,p)=>s+p.steps.length,0),0),o=t.filter(r=>r.completed).length,n=i?Math.round(o/i*100):0;e.innerHTML=`
    <div class="page">
      <div class="home-hero animate-in">
        <h2>Bienvenue ! 🧭</h2>
        <p>Explorez les plus belles villes d'Espagne</p>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-value">${w.length}</div>
            <div class="hero-stat-label">Villes</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">${w.reduce((r,d)=>r+d.routes.length,0)}</div>
            <div class="hero-stat-label">Parcours</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">${a.length}</div>
            <div class="hero-stat-label">Photos</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">${n}%</div>
            <div class="hero-stat-label">Progression</div>
          </div>
        </div>
      </div>

      <div class="section-title animate-in stagger-1">Actions rapides</div>
      <div class="quick-actions animate-in stagger-2">
        <button class="quick-action" data-action="map">
          <div class="quick-action-icon" style="background:rgba(23,59,122,0.15)">🗺️</div>
          <span class="quick-action-label">Carte</span>
        </button>
        <button class="quick-action" data-action="rally">
          <div class="quick-action-icon" style="background:rgba(236,64,122,0.15)">📸</div>
          <span class="quick-action-label">Rallye</span>
        </button>
        <button class="quick-action" data-action="teams">
          <div class="quick-action-icon" style="background:rgba(100,210,255,0.15)">👥</div>
          <span class="quick-action-label">Teams</span>
        </button>
        <button class="quick-action" data-action="gallery">
          <div class="quick-action-icon" style="background:rgba(48,209,88,0.15)">🖼️</div>
          <span class="quick-action-label">Galerie</span>
        </button>
      </div>

      <div class="section-title animate-in stagger-3">Villes</div>
      ${w.map((r,d)=>{const p=t.filter(l=>l.city===r.id).filter(l=>l.completed).length,g=r.routes.reduce((l,m)=>l+m.steps.length,0),c=g?Math.round(p/g*100):0;return`
          <div class="city-card glass-card animate-in stagger-${d+4}" data-city="${r.id}">
            <div class="city-card-bg" style="background:${r.gradient}"></div>
            <div class="city-card-overlay"></div>
            <div class="city-card-content">
              <div class="city-card-name">${r.flag} ${r.name}</div>
              <div class="city-card-country">${r.country}</div>
              <div class="city-card-stats">
                <span class="city-card-stat">${r.routes.length} parcours</span>
                <span class="city-card-stat">${r.pois.length} lieux</span>
                <span class="city-card-stat">${c}% exploré</span>
              </div>
              <div style="margin-top:8px">${ke(c)}</div>
            </div>
          </div>
        `}).join("")}
    </div>
  `,e.querySelectorAll(".quick-action").forEach(r=>{r.addEventListener("click",()=>{var s;const d=r.dataset.action;(s=document.querySelector(`[data-tab="${d}"]`))==null||s.click()})}),e.querySelectorAll(".city-card").forEach(r=>{r.addEventListener("click",()=>{var s;const d=r.dataset.city;window.dispatchEvent(new CustomEvent("selectCity",{detail:d})),(s=document.querySelector('[data-tab="map"]'))==null||s.click()})})}function ke(e){return`<div class="progress-bar"><div class="progress-fill" style="width:${e}%"></div></div>`}const M={canvas:null,ctx:null,init(){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0})},loadImage(e){return new Promise((t,a)=>{const i=new Image;i.crossOrigin="anonymous",i.onload=()=>t(i),i.onerror=a,i.src=e})},getImageData(e,t=150){const a=Math.min(t/e.width,t/e.height);return this.canvas.width=e.width*a,this.canvas.height=e.height*a,this.ctx.drawImage(e,0,0,this.canvas.width,this.canvas.height),this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)},getAverageColor(e){let t=0,a=0,i=0,o=0;for(let n=0;n<e.data.length;n+=4)t+=e.data[n],a+=e.data[n+1],i+=e.data[n+2],o++;return{r:Math.round(t/o),g:Math.round(a/o),b:Math.round(i/o)}},getColorHistogram(e){const t={r:new Array(8).fill(0),g:new Array(8).fill(0),b:new Array(8).fill(0)};for(let i=0;i<e.data.length;i+=4)t.r[Math.floor(e.data[i]/32)]++,t.g[Math.floor(e.data[i+1]/32)]++,t.b[Math.floor(e.data[i+2]/32)]++;const a=e.data.length/4;for(let i of["r","g","b"])t[i]=t[i].map(o=>o/a);return t},getEdgeMap(e,t,a){const i=[];for(let o=1;o<a-1;o++)for(let n=1;n<t-1;n++){const r=e.data[(o*t+(n-1))*4],d=e.data[(o*t+(n+1))*4],s=e.data[((o-1)*t+n)*4],p=e.data[((o+1)*t+n)*4],g=Math.abs(d-r),c=Math.abs(p-s);i.push(Math.sqrt(g*g+c*c))}return i},compareSimilarity(e,t){let a=0;for(let i of["r","g","b"])for(let o=0;o<8;o++)a+=Math.min(e[i][o],t[i][o]);return Math.round(a/3*100)},compareEdges(e,t){const a=Math.min(e.length,t.length);let i=0,o=0,n=0;for(let r=0;r<a;r++)i+=e[r]*t[r],o+=e[r]*e[r],n+=t[r]*t[r];return o===0||n===0?0:Math.round(i/(Math.sqrt(o)*Math.sqrt(n))*100)},async comparePhotos(e,t){this.canvas||this.init();const a=await this.loadImage(e),i=await this.loadImage(t),o=this.getImageData(a),n=this.getImageData(i),r=this.getColorHistogram(o),d=this.getColorHistogram(n),s=this.compareSimilarity(r,d),p=this.getEdgeMap(o,this.canvas.width,this.canvas.height),g=this.getEdgeMap(n,this.canvas.width,this.canvas.height),c=this.compareEdges(p,g),l=Math.round(s*.55+c*.45),m=l>=35&&s>=30;return{score:Math.min(100,Math.max(0,l)),passed:m,colorSimilarity:s,edgeSimilarity:c,averageColor:this.getAverageColor(o),referenceColor:this.getAverageColor(n)}},async detectColorInPhoto(e,t){this.canvas||this.init();const a=await this.loadImage(e),i=this.getImageData(a,200),o=this.parseColor(t);let n=0,r=0,d={r:0,g:0,b:0,distance:1/0};for(let m=0;m<i.data.length;m+=4){const h=i.data[m],v=i.data[m+1],y=i.data[m+2],k=Math.sqrt(Math.pow(h-o.r,2)+Math.pow(v-o.g,2)+Math.pow(y-o.b,2));r++,k<45&&n++,k<d.distance&&(d={r:h,g:v,b:y,distance:k})}const s=Math.round(n/r*100),p=s*2.5+Math.max(0,40-d.distance),g=Math.min(100,Math.round(p)),l=s>=12&&g>=50;return{score:g,percentage:s,passed:l,closestColor:d,targetColor:o}},parseColor(e){const t={rouge:{r:220,g:40,b:40},bleu:{r:40,g:80,b:220},vert:{r:40,g:180,b:60},jaune:{r:240,g:200,b:40},orange:{r:240,g:130,b:30},rose:{r:240,g:100,b:150},violet:{r:130,g:60,b:200},blanc:{r:240,g:240,b:240},noir:{r:30,g:30,b:30},gris:{r:128,g:128,b:128},marron:{r:139,g:90,b:43},turquoise:{r:64,g:224,b:208}};return typeof e=="object"?e:t[e.toLowerCase()]||{r:128,g:128,b:128}},async detectObjectPresence(e,t){this.canvas||this.init();const a=await this.loadImage(e),i=this.getImageData(a,200),o=this.getAverageColor(i);this.getColorHistogram(i);const n=this.getEdgeMap(i,this.canvas.width,this.canvas.height),r=n.filter(h=>h>30).length/n.length,s={statue:{expectedEdge:.15,expectedColors:["gris","blanc"],label:"Statue"},pont:{expectedEdge:.25,expectedColors:["gris","marron"],label:"Pont"},arbre:{expectedEdge:.2,expectedColors:["vert","marron"],label:"Arbre"},fontaine:{expectedEdge:.18,expectedColors:["bleu","blanc","gris"],label:"Fontaine"},fleuve:{expectedEdge:.08,expectedColors:["bleu","vert"],label:"Fleuve"},murale:{expectedEdge:.22,expectedColors:["rouge","bleu","vert","jaune"],label:"Murale"},eglise:{expectedEdge:.2,expectedColors:["blanc","gris","marron"],label:"Église"},plaza:{expectedEdge:.12,expectedColors:["gris","blanc"],label:"Plaza"}}[t.toLowerCase()]||{expectedEdge:.15,expectedColors:[],label:t},p=Math.max(0,100-Math.abs(r-s.expectedEdge)*600);let g=0;s.expectedColors.length>0?g=s.expectedColors.filter(v=>{const y=this.parseColor(v);return Math.sqrt(Math.pow(o.r-y.r,2)+Math.pow(o.g-y.g,2)+Math.pow(o.b-y.b,2))<90}).length/s.expectedColors.length*100:g=40;const c=p*.5+g*.5,l=Math.round(c),m=l>=55&&g>=40;return{score:l,passed:m,edgeScore:Math.round(p),colorScore:Math.round(g),objectName:s.label,averageColor:o}}},le=[W,K];let b=null,U=[],J=[],R=[],B=null,E="bilbao",j="all",P=null,Z=!1,Y=null,ee=0,Q=new Set,te=null,T=0;const Pe=3,Ae=6e4,Ee=[{key:"all",label:"Tout",icon:"📍"},{key:"monuments",label:"Monuments",icon:"🏛️"},{key:"viewpoints",label:"Points de vue",icon:"🔭"},{key:"nature",label:"Nature",icon:"🌿"},{key:"streetart",label:"Street Art",icon:"🎨"},{key:"architecture",label:"Architecture",icon:"🏗️"},{key:"unusual",label:"Insolite",icon:"✨"},{key:"culture",label:"Culture",icon:"🎭"},{key:"gastronomy",label:"Gastronomie",icon:"🍷"}];function S(e){return le.find(t=>t.id===e)}function Ce(e,t,a,i){const n=(a-e)*Math.PI/180,r=(i-t)*Math.PI/180,d=Math.sin(n/2)**2+Math.cos(e*Math.PI/180)*Math.cos(a*Math.PI/180)*Math.sin(r/2)**2;return 6371*2*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))}function je(e){if(e.length<2)return"#";const t=`${e[0].lat},${e[0].lng}`,a=`${e[e.length-1].lat},${e[e.length-1].lng}`,i=e.slice(1,-1).map(n=>`${n.lat},${n.lng}`).join("|");let o=`https://www.google.com/maps/dir/?api=1&origin=${t}&destination=${a}&travelmode=walking`;return i&&(o+=`&waypoints=${encodeURIComponent(i)}`),o}async function Ie(){const e=await u.getAllPhotos();Q=new Set(e.map(t=>t.poiId).filter(Boolean))}function Se(e){var t;if(z("Carte"),P=null,b){try{b.remove()}catch{}b=null}Z=!1,e.innerHTML=`
    <div class="map-page">
      <div class="map-city-selector">
        ${le.map(a=>`
          <button class="city-tab ${a.id===E?"active":""}" data-city="${a.id}">${a.flag} ${a.name}</button>
        `).join("")}
      </div>
      <div id="map-view" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:0"></div>
      <div class="map-route-selector" id="route-selector"></div>
      <div class="map-filters" id="map-filters">
        ${Ee.map(a=>`
          <button class="filter-chip ${j===a.key?"active":""}" data-filter="${a.key}">
            ${a.icon} ${a.label}
          </button>
        `).join("")}
      </div>
      <button class="map-locate-btn" id="btn-locate" aria-label="Ma position">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
      </button>
    </div>
  `,Ie().then(()=>{setTimeout(()=>ce(),50)}),e.querySelectorAll(".city-tab").forEach(a=>{a.addEventListener("click",()=>{E=a.dataset.city,P=null,e.querySelectorAll(".city-tab").forEach(i=>i.classList.toggle("active",i.dataset.city===E)),D(),I()})}),e.querySelectorAll(".filter-chip").forEach(a=>{a.addEventListener("click",()=>{j=a.dataset.filter,P=null,e.querySelectorAll(".filter-chip").forEach(i=>i.classList.toggle("active",i.dataset.filter===j)),D(),I()})}),(t=document.getElementById("btn-locate"))==null||t.addEventListener("click",ue),D(),Le(),Be()}function D(){const e=document.getElementById("route-selector");if(!e)return;const t=S(E);if(!t){e.innerHTML="";return}e.innerHTML=`
    <div class="route-selector-scroll">
      <button class="route-chip ${P?"":"active"}" data-route="all">📍 Tous les lieux</button>
      ${t.routes.map(a=>`
        <button class="route-chip ${P===a.id?"active":""}" data-route="${a.id}" style="--route-color:${a.color}">
          ${a.emoji} ${a.name}
        </button>
      `).join("")}
    </div>
  `,e.querySelectorAll(".route-chip").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.route;P=i==="all"?null:i,e.querySelectorAll(".route-chip").forEach(o=>o.classList.toggle("active",o.dataset.route===(P||"all"))),I()})})}function ce(){if(Z||!document.getElementById("map-view"))return;const t=S(E);if(t){if(b){try{b.remove()}catch{}b=null}try{b=L.map("map-view",{center:t.center,zoom:t.zoom,zoomControl:!1,attributionControl:!0}),L.control.zoom({position:"topright"}).addTo(b),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap",maxZoom:19}).addTo(b),Z=!0,I(),ue(),setTimeout(()=>b.invalidateSize(),300)}catch(a){console.error("Map init error:",a),b=null,setTimeout(()=>ce(),500)}}}function I(){if(!b)return;U.forEach(t=>b.removeLayer(t)),J.forEach(t=>b.removeLayer(t)),R.forEach(t=>b.removeLayer(t)),U=[],J=[],R=[];const e=S(E);if(e){if(b.setView(e.center,e.zoom,{animate:!0}),P){const t=e.routes.find(a=>a.id===P);t&&qe(t,e)}else{const t=j==="all"?e.pois:e.pois.filter(a=>a.category===j);if(t.forEach(a=>pe(a,e)),t.length){const a=L.latLngBounds(t.map(i=>[i.lat,i.lng]));b.fitBounds(a,{padding:[60,60]})}}e.utility&&de(e)}}function de(e){e.utility.forEach(t=>{const a=t.type==="toilet",i=24,n=`<div style="width:${i}px;height:${i}px;border-radius:50%;background:${a?"rgba(120,120,140,0.55)":"rgba(60,160,220,0.55)"};display:flex;align-items:center;justify-content:center;font-size:13px;backdrop-filter:blur(8px);border:1.5px solid rgba(255,255,255,0.25);cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.2)">${t.emoji}</div>`,r=L.divIcon({className:"",html:n,iconSize:[i,i],iconAnchor:[i/2,i/2]}),d=L.marker([t.lat,t.lng],{icon:r}).addTo(b),s=`https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}&travelmode=walking`,p=`
      <div class="map-popup" style="text-align:center;padding:4px 0">
        <div style="font-size:20px;margin-bottom:4px">${t.emoji}</div>
        <div class="map-popup-name" style="font-size:13px;margin-bottom:6px">${t.name}</div>
        <a href="${s}" target="_blank" rel="noopener" class="btn btn-primary btn-sm map-nav-btn" style="width:100%">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3,11 22,2 13,21 11,13 3,11"/></svg>
          🧭 Naviguer
        </a>
      </div>
    `;d.bindPopup(p,{maxWidth:180,className:"glass-popup"}),J.push(d)})}function qe(e,t){var r,d;const a=e.steps.map((s,p)=>{var g;return{id:s.poiId||s.id,name:s.name,description:s.description,lat:s.lat,lng:s.lng,category:s.category,emoji:((g=t.categories[s.category])==null?void 0:g.icon)||"📍",stepIndex:p,routeId:e.id,challenges:s.challenges||[]}});a.forEach(s=>pe(s,t,e)),t.utility&&de(t);const i=je(a),o=document.getElementById("map-nav-banner");o&&o.remove();const n=document.createElement("div");n.id="map-nav-banner",n.className="map-nav-banner",n.innerHTML=`
    <a href="${i}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="flex:1">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3,11 22,2 13,21 11,13 3,11"/></svg>
      🚶 Marcher ce parcours sur Maps
    </a>
    <button class="btn btn-secondary btn-sm" id="btn-close-nav-banner">✕</button>
  `,(r=document.querySelector(".map-page"))==null||r.appendChild(n),(d=document.getElementById("btn-close-nav-banner"))==null||d.addEventListener("click",()=>n.remove()),Me(a,e.color)}async function Me(e,t){var o,n;if(e.length<2)return;const a=e.map(r=>`${r.lng},${r.lat}`).join(";");try{const d=await(await fetch(`https://router.project-osrm.org/route/v1/foot/${a}?overview=full&geometries=geojson&steps=true`)).json();if(d.code==="Ok"&&((n=(o=d.routes)==null?void 0:o[0])!=null&&n.geometry)){const s=d.routes[0].geometry.coordinates.map(g=>[g[1],g[0]]),p=L.polyline(s,{color:t,weight:4,opacity:.85,lineCap:"round",lineJoin:"round"}).addTo(b);R.push(p),b.fitBounds(p.getBounds(),{padding:[80,80]});return}}catch(r){console.warn("OSRM failed, using straight lines:",r)}const i=e.map(r=>[r.lat,r.lng]);if(i.length>1){const r=L.polyline(i,{color:t,weight:4,opacity:.7,dashArray:"8, 8",lineCap:"round"}).addTo(b);R.push(r)}i.length&&b.fitBounds(L.latLngBounds(i),{padding:[80,80]})}function pe(e,t,a=null){const i=t.categories[e.category],o=(i==null?void 0:i.color)||"#173B7A",n=Q.has(e.id);let r;n?r=e.stepIndex!==void 0?`<div class="custom-marker-route completed-marker" style="background:${o};opacity:0.45">
           <span class="marker-num">${e.stepIndex+1}</span>
           <div class="marker-check">✓</div>
         </div>`:`<div class="custom-marker completed-marker" style="background:${o};opacity:0.45">
           <span>${e.emoji||(i==null?void 0:i.icon)||"📍"}</span>
           <div class="marker-check">✓</div>
         </div>`:r=e.stepIndex!==void 0?`<div class="custom-marker-route" style="background:${o}">
           <span class="marker-num">${e.stepIndex+1}</span>
         </div>`:`<div class="custom-marker" style="background:${o}">
           <span>${e.emoji||(i==null?void 0:i.icon)||"📍"}</span>
         </div>`;const d=L.divIcon({className:"",html:r,iconSize:[36,36],iconAnchor:[18,36]}),s=L.marker([e.lat,e.lng],{icon:d}).addTo(b),p=`https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking`,g=`this.style.background='linear-gradient(135deg,var(--accent),var(--accent-light))';this.style.display='flex';this.style.alignItems='center';this.style.justifyContent='center';this.style.fontSize='28px';this.alt='${e.emoji}';this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1 1%22><text y=%22.9%22 x=%220.1%22 font-size=%220.8%22>${e.emoji}</text></svg>'`,l=`
    <div class="map-popup" style="text-align:center;padding:0;overflow:hidden;border-radius:10px">
      ${e.image?`<img src="${e.image}" alt="${e.name}" crossorigin="anonymous" referrerpolicy="no-referrer" loading="lazy" onerror="${g}" style="width:100%;height:120px;object-fit:cover;border-radius:8px 8px 0 0;margin:-4px -0px 0 -0px;display:block;background:var(--card-bg);">`:""}
      <div style="padding:8px 10px 10px">
        <div style="font-size:13px;font-weight:700;margin-bottom:6px">${e.name}</div>
        ${n?'<div style="font-size:10px;color:var(--success);font-weight:600;margin-bottom:6px">✅ Complété</div>':""}
        <a href="${p}" target="_blank" rel="noopener" class="btn btn-primary btn-sm map-nav-btn" style="width:100%">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3,11 22,2 13,21 11,13 3,11"/></svg>
          🧭 Naviguer
        </a>
      </div>
    </div>
  `;s.bindPopup(l,{maxWidth:220,className:"glass-popup"}),s.poiData=e,U.push(s)}function Le(){Y||navigator.geolocation&&(Y=navigator.geolocation.watchPosition(e=>{var n;const{latitude:t,longitude:a}=e.coords,i=Date.now();if(i-ee<Ae)return;const o=S(E);if(o)for(const r of o.pois){if(Q.has(r.id))continue;const d=Ce(t,a,r.lat,r.lng);if(d<=Pe){const s=Math.round(d*1e3),p=o.categories[r.category];f(`📍 Vous êtes à ${s}m de "${r.name}" ${(p==null?void 0:p.icon)||""}`,"info",5e3),ee=i,"Notification"in window&&Notification.permission==="granted"&&new Notification(`📍 Proche de ${r.name}`,{body:`À ${s}m — ${((n=r.description)==null?void 0:n.substring(0,60))||"Explorez ce lieu"}`,icon:"/icons/icon-192.png"});break}}},()=>{},{enableHighAccuracy:!0,timeout:15e3,maximumAge:1e4}))}function Be(){te||(u.getAllPhotos().then(e=>{T=e.length}),te=setInterval(async()=>{const e=await u.getAllPhotos();if(e.length>T){const t=e.length-T;t>0&&(f(`📸 ${t} nouvelle${t>1?"s":""} photo${t>1?"s":""} publiée${t>1?"s":""} !`,"info",4e3),"Notification"in window&&Notification.permission==="granted"&&new Notification("📸 Nouvelle photo !",{body:`${t} photo${t>1?"s":""} prise${t>1?"s":""} par un autre explorateur`,icon:"/icons/icon-192.png"})),T=e.length}},15e3))}function ue(){!navigator.geolocation||!b||navigator.geolocation.getCurrentPosition(e=>{const{latitude:t,longitude:a}=e.coords;B&&b.removeLayer(B);const i=L.divIcon({className:"",html:'<div class="user-location-marker"></div>',iconSize:[20,20],iconAnchor:[10,10]});B=L.marker([t,a],{icon:i}).addTo(b),B.bindPopup("<b>📍 Vous êtes ici</b>"),b.setView([t,a],b.getZoom(),{animate:!0})},()=>{},{enableHighAccuracy:!0,timeout:1e4})}function Te(e){if(E=e,P=null,b){const t=S(e);t&&b.setView(t.center,t.zoom,{animate:!0}),D(),I()}}window.addEventListener("selectCity",e=>Te(e.detail));const ae=[W,K];async function _e(e){z("Rallye Photo");const t=await u.getAllProgress();e.innerHTML=`
    <div class="page">
      <div class="rally-header animate-in">
        <div class="rally-header-icon">📸</div>
        <h2>Rallye Découverte</h2>
        <p>Relevez les défis photo et explorez les villes</p>
      </div>

      ${ae.map(a=>`
        <div class="section-title animate-in stagger-1">${a.flag} ${a.name}</div>
        ${a.routes.map((i,o)=>{const n=t.filter(s=>s.routeId===i.id&&s.completed).length,r=i.steps.length,d=r?Math.round(n/r*100):0;return`
            <div class="route-card glass-card animate-in stagger-${o+2}" data-route="${i.id}" data-city="${a.id}">
              <div class="route-card-inner">
                <div class="route-icon" style="background:${i.color}20">${i.emoji}</div>
                <div class="route-info">
                  <h3>${i.name}</h3>
                  <p>${i.description}</p>
                  <div class="route-meta">
                    <span>⏱ ${i.duration}</span>
                    <span>📏 ${i.distance}</span>
                    <span>💪 ${i.difficulty}</span>
                  </div>
                </div>
                ${ze(d)}
              </div>
            </div>
          `}).join("")}
      `).join("")}
    </div>
  `,e.querySelectorAll(".route-card").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.route,o=a.dataset.city,n=ae.find(d=>d.id===o),r=n==null?void 0:n.routes.find(d=>d.id===i);r&&De(r,n)})})}async function De(e,t){var d;const a=document.getElementById("page-container"),i=await u.getAllProgress(),o=await u.getAllChallenges();await u.getAllPhotos(),z(e.name);const n=e.steps.reduce((s,p)=>{var g;return s+(((g=p.challenges)==null?void 0:g.reduce((c,l)=>c+l.points,0))||0)},0),r=e.steps.reduce((s,p)=>{const g=o.filter(c=>c.routeId===e.id&&c.stepId===p.id&&c.completed);return s+g.reduce((c,l)=>c+(l.earnedPoints||0),0)},0);a.innerHTML=`
    <div class="page">
      <div class="route-detail-hero">
        <div class="route-detail-hero-bg" style="background:${e.color}"></div>
        <div class="route-detail-hero-content">
          <h2>${e.emoji} ${e.name}</h2>
          <p>${e.description}</p>
          <div style="display:flex;gap:12px;margin-top:8px">
            <span style="font-size:12px;opacity:0.8">⏱ ${e.duration}</span>
            <span style="font-size:12px;opacity:0.8">📏 ${e.distance}</span>
            <span style="font-size:12px;opacity:0.8">🏆 ${r}/${n} pts</span>
          </div>
        </div>
      </div>

      <div style="margin-bottom:20px">
        <button class="btn btn-primary btn-full" id="btn-start-route">
          🗺️ Ouvrir sur la carte
        </button>
      </div>

      <div class="section-title">Étapes</div>
      ${e.steps.map((s,p)=>{const g=i.some(h=>h.stepId===s.id&&h.completed),c=t.categories[s.category],l=s.challenges||[],m=o.filter(h=>h.routeId===e.id&&h.stepId===s.id&&h.completed);return`
          <div class="step-card glass-card animate-in stagger-${p+1}" data-step="${s.id}">
            <div class="step-number ${g?"completed":""}">${g?"✓":p+1}</div>
            <div class="step-content">
              <h4>${s.name}</h4>
              <p>${s.description}</p>
              <div class="step-category" style="background:${(c==null?void 0:c.color)||"#173B7A"}20;color:${(c==null?void 0:c.color)||"#173B7A"}">${(c==null?void 0:c.icon)||""} ${(c==null?void 0:c.label)||s.category}</div>
              ${l.length?`
                <div style="margin-top:8px;font-size:12px;color:var(--text-tertiary)">
                  🏆 ${m.length}/${l.length} défis (${l.reduce((h,v)=>h+v.points,0)} pts)
                </div>
              `:""}
            </div>
            <div class="step-check ${g?"checked":""}"></div>
          </div>
        `}).join("")}

      <div class="section-title" style="margin-top:24px">🏆 Défis Photo</div>
      ${e.steps.flatMap(s=>(s.challenges||[]).map(p=>({...p,stepName:s.name,stepId:s.id}))).map(s=>{const p=o.some(l=>l.challengeId===s.id&&l.completed),g=s.type==="photo"?"challenge-type-photo":s.type==="color"?"challenge-type-color":"challenge-type-find",c=s.type==="photo"?"📸 Photo":s.type==="color"?"🎨 Couleur":"🔍 Trouver";return`
          <div class="challenge-card glass-card animate-in" data-challenge="${s.id}" data-route="${e.id}">
            <div class="challenge-type-badge ${g}">${c}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:13px;color:var(--text-tertiary)">📍 ${s.stepName}</span>
              <span style="font-size:14px;font-weight:700;color:var(--accent)">+${s.points} pts</span>
            </div>
            ${p?'<div style="margin-top:8px;font-size:12px;color:var(--success);font-weight:600">✅ Défi relevé !</div>':""}
            ${p?"":`
              <div class="challenge-actions" style="margin-top:12px">
                <button class="btn btn-primary btn-sm btn-challenge-capture" data-challenge-id="${s.id}" data-route-id="${e.id}" data-step-id="${s.stepId}" data-type="${s.type}" style="flex:1">
                  📸 Relever le défi
                </button>
              </div>
            `}
          </div>
        `}).join("")}
    </div>
  `,(d=document.getElementById("btn-start-route"))==null||d.addEventListener("click",()=>{var s;(s=document.querySelector('[data-tab="map"]'))==null||s.click()}),a.querySelectorAll(".step-card").forEach(s=>{s.addEventListener("click",async()=>{const p=s.dataset.step,g=e.steps.find(c=>c.id===p);g&&Ne(g,e,t)})}),a.querySelectorAll(".btn-challenge-capture").forEach(s=>{s.addEventListener("click",p=>{p.stopPropagation();const g=s.dataset.challengeId;s.dataset.routeId;const c=s.dataset.stepId;s.dataset.type;const l=e.steps.flatMap(m=>m.challenges||[]).find(m=>m.id===g);l&&me(l,e,c)})})}function Ne(e,t,a){var n,r,d;const i=a.categories[e.category],o=`
    <div style="text-align:center;margin-bottom:16px">
      <div style="font-size:40px;margin-bottom:8px">${(n=e.challenges)!=null&&n.length?"🎯":"📍"}</div>
      <div style="font-size:12px;background:${(i==null?void 0:i.color)||"#173B7A"}20;color:${(i==null?void 0:i.color)||"#173B7A"};padding:4px 12px;border-radius:8px;display:inline-block;font-weight:600">${(i==null?void 0:i.icon)||""} ${(i==null?void 0:i.label)||e.category}</div>
    </div>
    <p style="text-align:center;color:var(--text-secondary);line-height:1.5;margin-bottom:16px">${e.description}</p>
    <div style="font-size:12px;color:var(--text-tertiary);text-align:center">
      📍 ${e.lat.toFixed(4)}, ${e.lng.toFixed(4)}
    </div>
    ${(r=e.challenges)!=null&&r.length?`
      <div style="margin-top:16px">
        <button class="btn btn-primary btn-full" id="modal-go-map">
          🗺️ Aller sur la carte
        </button>
      </div>
    `:""}
  `;A(e.name,o,[{id:"close",label:"Fermer",class:"btn-secondary"}]),(d=document.getElementById("modal-go-map"))==null||d.addEventListener("click",()=>{var s;(s=document.querySelector('[data-tab="map"]'))==null||s.click()})}function me(e,t,a){A(`Défi: ${e.title}`,`
    <div class="camera-view" id="camera-container">
      <video id="camera-video" autoplay playsinline></video>
      <canvas id="camera-canvas"></canvas>
    </div>
    <div class="camera-controls">
      <button class="btn btn-secondary" id="btn-switch-camera">🔄</button>
      <button class="camera-btn" id="btn-capture"></button>
      <button class="btn btn-secondary" id="btn-upload">📁</button>
    </div>
    <input type="file" id="file-input" accept="image/*" style="display:none">
    <div id="photo-result"></div>
    <div id="challenge-score"></div>
  `,[]),Fe(e,t,a)}async function Fe(e,t,a){var g,c,l;const i=document.getElementById("camera-video"),o=document.getElementById("camera-canvas"),n=document.getElementById("file-input"),r=document.getElementById("photo-result"),d=document.getElementById("challenge-score");let s=null,p="environment";try{s=await navigator.mediaDevices.getUserMedia({video:{facingMode:p,width:{ideal:1920},height:{ideal:1080}}}),i.srcObject=s}catch{console.log("Camera not available, using file upload")}(g=document.getElementById("btn-switch-camera"))==null||g.addEventListener("click",async()=>{s&&s.getTracks().forEach(m=>m.stop()),p=p==="environment"?"user":"environment";try{s=await navigator.mediaDevices.getUserMedia({video:{facingMode:p,width:{ideal:1920},height:{ideal:1080}}}),i.srcObject=s}catch{}}),(c=document.getElementById("btn-upload"))==null||c.addEventListener("click",()=>n.click()),n==null||n.addEventListener("change",m=>{const h=m.target.files[0];if(h){const v=new FileReader;v.onload=y=>ie(y.target.result,e,t,a,r,d),v.readAsDataURL(h)}}),(l=document.getElementById("btn-capture"))==null||l.addEventListener("click",()=>{i.srcObject&&(o.width=i.videoWidth,o.height=i.videoHeight,o.getContext("2d").drawImage(i,0,0),ie(o.toDataURL("image/jpeg",.9),e,t,a,r,d))})}async function ie(e,t,a,i,o,n){var r,d;M.init(),o.innerHTML=`<div class="photo-result"><img src="${e}" alt="Photo prise"></div>`,n.innerHTML='<div style="text-align:center;padding:20px"><div class="splash-loader-bar" style="width:100px;margin:0 auto"></div><p style="margin-top:8px;color:var(--text-secondary);font-size:13px">Analyse en cours...</p></div>';try{let s;if(t.type==="photo")s=await M.comparePhotos(e,Re());else if(t.type==="color"){const c=["rouge","bleu","vert","jaune","orange","violet"],l=c[Math.floor(Math.random()*c.length)];s=await M.detectColorInPhoto(e,l)}else s=await M.detectObjectPresence(e,"statue");const p=Math.round(t.points*s.score/100),g=s.score>=80?"🌟 Excellent !":s.score>=60?"👍 Bien !":s.score>=40?"😅 Pas mal...":"🤔 À retenter !";n.innerHTML=`
      <div class="photo-score">
        <div class="photo-score-value">${s.score}%</div>
        <div class="photo-score-label">${g}</div>
        <div style="margin-top:12px;font-size:14px;font-weight:600;color:var(--accent)">+${p} points</div>
        ${s.colorSimilarity!==void 0?`
          <div style="margin-top:8px;font-size:12px;color:var(--text-tertiary)">
            🎨 Similarité colorimétrique: ${s.colorSimilarity}%<br>
            📐 Similarité structurelle: ${s.edgeSimilarity}%
          </div>
        `:""}
      </div>
      <div style="padding:0 20px 20px;display:flex;gap:8px">
        <button class="btn btn-secondary" style="flex:1" id="btn-retake">🔄 Recommencer</button>
        <button class="btn btn-primary" style="flex:1" id="btn-save-challenge">✓ Valider</button>
      </div>
    `,(r=document.getElementById("btn-retake"))==null||r.addEventListener("click",()=>{o.innerHTML="",n.innerHTML="",me(t,a,i)}),(d=document.getElementById("btn-save-challenge"))==null||d.addEventListener("click",async()=>{var l;const c={id:_(),routeId:a.id,stepId:i,challengeId:t.id,data:e,score:s.score,points:p,timestamp:Date.now()};await u.addPhoto(c),await u.saveChallenge({id:_(),challengeId:t.id,routeId:a.id,stepId:i,completed:!0,score:s.score,earnedPoints:p,timestamp:Date.now()}),await u.addHistory({id:_(),type:"challenge_completed",title:`Défi "${t.title}" relevé`,detail:`Score: ${s.score}% - ${p} points`,timestamp:Date.now()}),f(`Défi réussi ! +${p} points`,"success"),(l=document.querySelector(".modal-close"))==null||l.click()})}catch(s){console.error("Analysis error:",s),n.innerHTML=`
      <div style="text-align:center;padding:20px">
        <p style="color:var(--danger)">Erreur d'analyse</p>
        <p style="font-size:13px;color:var(--text-secondary);margin-top:4px">${s.message}</p>
      </div>
    `}}function Re(){const e=document.createElement("canvas");e.width=300,e.height=200;const t=e.getContext("2d"),a=t.createLinearGradient(0,0,300,200);return a.addColorStop(0,"#173B7A"),a.addColorStop(.5,"#2952a3"),a.addColorStop(1,"#64D2FF"),t.fillStyle=a,t.fillRect(0,0,300,200),e.toDataURL()}const C=[{id:"ach_first_step",name:"Premier Pas",description:"Complétez votre première étape",icon:"👣",category:"Exploration",check:async e=>e.filter(t=>t.completed).length>=1},{id:"ach_10_steps",name:"Explorateur",description:"Complétez 10 étapes",icon:"🧭",category:"Exploration",check:async e=>e.filter(t=>t.completed).length>=10},{id:"ach_20_steps",name:"Grand Explorateur",description:"Complétez 20 étapes",icon:"🗺️",category:"Exploration",check:async e=>e.filter(t=>t.completed).length>=20},{id:"ach_500_points",name:"500 Points",description:"Accumulez 500 points",icon:"⭐",category:"Points",check:async(e,t)=>t.filter(a=>a.completed).reduce((a,i)=>a+(i.earnedPoints||0),0)>=500},{id:"ach_1000_points",name:"1000 Points",description:"Accumulez 1000 points",icon:"🌟",category:"Points",check:async(e,t)=>t.filter(a=>a.completed).reduce((a,i)=>a+(i.earnedPoints||0),0)>=1e3},{id:"ach_2000_points",name:"Légende",description:"Accumulez 2000 points",icon:"👑",category:"Points",check:async(e,t)=>t.filter(a=>a.completed).reduce((a,i)=>a+(i.earnedPoints||0),0)>=2e3},{id:"ach_first_photo",name:"Premier Clic",description:"Prenez votre première photo",icon:"📸",category:"Photos",check:async(e,t,a)=>a.length>=1},{id:"ach_5_photos",name:"Apprenti Photographe",description:"Accumulez 5 photos",icon:"📷",category:"Photos",check:async(e,t,a)=>a.length>=5},{id:"ach_10_photos",name:"Photographe",description:"Accumulez 10 photos",icon:"📸",category:"Photos",check:async(e,t,a)=>a.length>=10},{id:"ach_20_photos",name:"Collectionneur",description:"Accumulez 20 photos",icon:"🎨",category:"Photos",check:async(e,t,a)=>a.length>=20},{id:"ach_50_photos",name:"Maître Photographe",description:"Accumulez 50 photos",icon:"🏆",category:"Photos",check:async(e,t,a)=>a.length>=50},{id:"ach_perfect_score",name:"Score Parfait",description:"Obtenez 100% à un défi",icon:"💯",category:"Qualité",check:async(e,t,a)=>a.some(i=>i.score===100)},{id:"ach_high_score",name:"Score Élevé",description:"Obtenez un score moyen >70%",icon:"📈",category:"Qualité",check:async(e,t,a)=>{const i=a.filter(n=>n.score!==void 0);return i.length<5?!1:i.reduce((n,r)=>n+r.score,0)/i.length>=70}},{id:"ach_first_route",name:"Premier Parcours",description:"Terminez un parcours complet",icon:"🏁",category:"Parcours",check:async e=>{for(const t of w)for(const a of t.routes)if(a.steps.filter(o=>e.some(n=>n.stepId===o.id&&n.completed)).length===a.steps.length)return!0;return!1}},{id:"ach_bilbao_complete",name:"Explorateur de Bilbao",description:"Explorez tous les lieux de Bilbao",icon:"🏙️",category:"Villes",check:async e=>{var a;const t=((a=w.find(i=>i.id==="bilbao"))==null?void 0:a.routes.flatMap(i=>i.steps))||[];return t.length>0&&t.filter(i=>e.some(o=>o.stepId===i.id&&o.completed)).length>=t.length}},{id:"ach_zaragoza_complete",name:"Explorateur de Saragosse",description:"Explorez tous les lieux de Saragosse",icon:"🏰",category:"Villes",check:async e=>{var a;const t=((a=w.find(i=>i.id==="zaragoza"))==null?void 0:a.routes.flatMap(i=>i.steps))||[];return t.length>0&&t.filter(i=>e.some(o=>o.stepId===i.id&&o.completed)).length>=t.length}},{id:"ach_all_categories",name:"Curieux",description:"Découvrez toutes les catégories",icon:"🔍",category:"Exploration",check:async e=>{const a=w.flatMap(o=>o.routes.flatMap(n=>n.steps)).filter(o=>e.some(n=>n.stepId===o.id&&n.completed));return new Set(a.map(o=>o.category)).size>=8}},{id:"ach_team_player",name:"Esprit d'équipe",description:"Rejoignez une équipe",icon:"🤝",category:"Social",check:async()=>!!await u.getSetting("currentTeam")},{id:"ach_challenges_5",name:"Défi Relevé",description:"Complétez 5 défis photo",icon:"🎯",category:"Défis",check:async(e,t)=>t.filter(a=>a.completed).length>=5},{id:"ach_challenges_15",name:"Maître du Défi",description:"Complétez 15 défis photo",icon:"🏅",category:"Défis",check:async(e,t)=>t.filter(a=>a.completed).length>=15},{id:"ach_challenges_30",name:"Champion des Défis",description:"Complétez 30 défis photo",icon:"🥇",category:"Défis",check:async(e,t)=>t.filter(a=>a.completed).length>=30},{id:"ach_first_friend",name:"Premier Ami",description:"Ajoutez un ami",icon:"👬",category:"Social",check:async()=>{const e=await u.getSetting("friends");return e&&e.length>=1}},{id:"ach_5_friends",name:"Populaire",description:"Ajoutez 5 amis",icon:"🎉",category:"Social",check:async()=>{const e=await u.getSetting("friends");return e&&e.length>=5}},{id:"ach_near_poi",name:"Explorateur Proche",description:"Passez à moins de 500m d'un lieu",icon:"📍",category:"Géoloc",check:async()=>!!await u.getSetting("near_poi_visited")},{id:"ach_night_photo",name:"Photographe de Nuit",description:"Prenez une photo après 20h",icon:"🌙",category:"Photos",check:async(e,t,a)=>a.some(i=>{const o=new Date(i.timestamp).getHours();return o>=20||o<6})},{id:"ach_early_bird",name:"Lève-tôt",description:"Prenez une photo avant 8h",icon:"🌅",category:"Photos",check:async(e,t,a)=>a.some(i=>{const o=new Date(i.timestamp).getHours();return o>=5&&o<8})},{id:"ach_color_hunter",name:"Chasseur de Couleurs",description:"Complétez 3 défis de type couleur",icon:"🎨",category:"Défis",check:async(e,t)=>t.filter(a=>a.completed&&a.challengeType==="color").length>=3},{id:"ach_photo_master",name:"Maître Photo",description:"Complétez 5 défis de type photo",icon:"📷",category:"Défis",check:async(e,t)=>t.filter(a=>a.completed&&a.challengeType==="photo").length>=5},{id:"ach_finder",name:"Trouveur",description:"Complétez 5 défis de type recherche",icon:"🔍",category:"Défis",check:async(e,t)=>t.filter(a=>a.completed&&a.challengeType==="find").length>=5},{id:"ach_marathon",name:"Marathon",description:"Prenez 5 photos en une session",icon:"🏃",category:"Photos",check:async(e,t,a)=>{if(a.length<5)return!1;const i=[...a].sort((o,n)=>o.timestamp-n.timestamp);for(let o=4;o<i.length;o++)if(i[o].timestamp-i[o-4].timestamp<36e5)return!0;return!1}},{id:"ach_explorer_badge",name:"Badge Explorateur",description:"Débloquez 10 succès",icon:"🎖️",category:"Meta",check:async()=>(await u.getAllAchievements()).length>=10},{id:"ach_completionist",name:"Complétionniste",description:"Débloquez 20 succès",icon:"💎",category:"Meta",check:async()=>(await u.getAllAchievements()).length>=20}];async function He(e){z("Succès"),await u.getAllProgress(),await u.getAllChallenges(),await u.getAllPhotos();const t=await u.getAllAchievements(),a=new Set(t.map(r=>r.id));let i=0;const o=[];for(const r of C){const d=a.has(r.id);d&&i++,o.push({...r,unlocked:d})}const n=[...new Set(C.map(r=>r.category))];e.innerHTML=`
    <div class="page">
      <div style="text-align:center;margin-bottom:24px" class="animate-in">
        <div style="font-size:48px;margin-bottom:8px">🏆</div>
        <h2 style="font-size:22px;font-weight:700">Succès</h2>
        <p style="font-size:14px;color:var(--text-secondary);margin-top:4px">${i}/${C.length} débloqués</p>
        <div style="margin-top:12px">${Oe(Math.round(i/C.length*100))}</div>
      </div>

      ${n.map(r=>{const d=o.filter(p=>p.category===r),s=d.filter(p=>p.unlocked).length;return`
          <div class="section-title animate-in" style="margin-top:16px">${r} <span style="font-size:12px;color:var(--text-tertiary);font-weight:400">${s}/${d.length}</span></div>
          ${d.map((p,g)=>`
            <div class="achievement-card glass-card animate-in stagger-${Math.min(g+1,6)} ${p.unlocked?"":"locked"}">
              <div class="achievement-icon ${p.unlocked?"":"locked"}" style="background:${p.unlocked?"rgba(48,209,88,0.15)":"var(--input-bg)"}">${p.icon}</div>
              <div class="achievement-info">
                <h4>${p.name}</h4>
                <p>${p.description}</p>
                ${p.unlocked?'<span style="font-size:11px;color:var(--success);font-weight:600">✅ Débloqué</span>':'<span style="font-size:11px;color:var(--text-tertiary)">🔒 Verrouillé</span>'}
              </div>
            </div>
          `).join("")}
        `}).join("")}
    </div>
  `}async function O(){const e=await u.getAllProgress(),t=await u.getAllChallenges(),a=await u.getAllPhotos(),i=await u.getAllAchievements(),o=new Set(i.map(n=>n.id));for(const n of C)if(!o.has(n.id))try{if(await n.check(e,t,a)){const d={id:n.id,name:n.name,description:n.description,icon:n.icon,category:n.category,unlockedAt:Date.now()};await u.saveAchievement(d),"Notification"in window&&Notification.permission==="granted"&&new Notification("🏆 Nouveau succès !",{body:`${n.icon} ${n.name}: ${n.description}`,icon:"/icons/icon-192.png"}),f(`🏆 Succès débloqué: ${n.name}`,"success",4e3)}}catch{}}function Oe(e){return`<div class="progress-bar"><div class="progress-fill" style="width:${e}%"></div></div>`}async function q(e){var n,r,d;z("Amis & Équipes");const t=await u.getAllTeams(),a=await u.getAllProgress(),i=await u.getSetting("friends")||[];await u.getSetting("username");const o=t.sort((s,p)=>{const g=a.filter(l=>l.teamId===s.id).reduce((l,m)=>l+(m.points||0),0);return a.filter(l=>l.teamId===p.id).reduce((l,m)=>l+(m.points||0),0)-g});e.innerHTML=`
    <div class="page">
      <div style="text-align:center;margin-bottom:20px" class="animate-in">
        <div style="font-size:48px;margin-bottom:8px">👥</div>
        <h2 style="font-size:22px;font-weight:700">Amis & Équipes</h2>
        <p style="font-size:14px;color:var(--text-secondary);margin-top:4px">Ajoutez des amis et créez des équipes</p>
      </div>

      <div class="section-title animate-in stagger-1">💠 Mes Amis</div>
      <div style="display:flex;gap:8px;margin-bottom:12px" class="animate-in stagger-1">
        <button class="btn btn-primary" style="flex:1" id="btn-add-friend">➕ Ajouter un ami</button>
      </div>
      ${i.length?`
        <div class="friends-list animate-in stagger-2">
          ${i.map((s,p)=>{var g;return`
            <div class="friend-card glass-card animate-in stagger-${Math.min(p+1,6)}" data-friend-index="${p}">
              <div class="friend-avatar" style="background:${s.color||"#173B7A"}">${((g=s.nickname[0])==null?void 0:g.toUpperCase())||"?"}</div>
              <div class="friend-info">
                <h4>${s.nickname}</h4>
                <p style="font-size:12px;color:var(--text-tertiary)">${s.addedAt?"Ajouté "+new Date(s.addedAt).toLocaleDateString("fr-FR"):""}</p>
              </div>
              <button class="btn btn-sm btn-danger" data-remove-friend="${p}" style="padding:6px 10px;font-size:11px">✕</button>
            </div>
          `}).join("")}
        </div>
      `:`
        <div class="glass-card animate-in stagger-2" style="padding:16px;text-align:center;color:var(--text-secondary)">
          <p style="font-size:13px">Aucun ami ajouté</p>
          <p style="font-size:12px;color:var(--text-tertiary);margin-top:2px">Ajoutez des amis par leur pseudo</p>
        </div>
      `}

      <div class="section-title animate-in" style="margin-top:24px">👥 Équipes</div>
      <div style="display:flex;gap:8px;margin-bottom:12px" class="animate-in">
        <button class="btn btn-primary" style="flex:1" id="btn-create-team">➕ Créer</button>
        <button class="btn btn-secondary" style="flex:1" id="btn-join-team">🔗 Rejoindre</button>
      </div>

      ${o.length?`
        <div class="section-title animate-in">🏆 Classement</div>
        ${o.map((s,p)=>{const g=a.filter(m=>m.teamId===s.id).reduce((m,h)=>m+(h.points||0),0),c=s.members||[],l=p===0?"gold":p===1?"silver":p===2?"bronze":"";return`
            <div class="rank-row glass-card animate-in stagger-${Math.min(p+3,6)}" data-team="${s.id}">
              <div class="rank-position ${l}">${p===0?"🥇":p===1?"🥈":p===2?"🥉":p+1}</div>
              <div class="team-avatar" style="background:${s.color||"#173B7A"}">${s.emoji||"👥"}</div>
              <div class="rank-info">
                <h4>${s.name}</h4>
                <p>${c.length} membre${c.length>1?"s":""}</p>
              </div>
              <div class="rank-score">${g}</div>
            </div>
          `}).join("")}
      `:`
        <div class="empty-state animate-in stagger-3">
          <div class="empty-state-icon">👥</div>
          <h3>Aucune équipe</h3>
          <p>Créez une équipe ou rejoignez-en une !</p>
        </div>
      `}

      <div class="section-title animate-in" style="margin-top:20px">📋 Mes équipes</div>
      ${t.length?t.map((s,p)=>`
        <div class="team-card glass-card animate-in stagger-${Math.min(p+1,6)}" data-team="${s.id}">
          <div class="team-card-header">
            <div class="team-avatar" style="background:${s.color||"#173B7A"}">${s.emoji||"👥"}</div>
            <div class="team-card-info">
              <h3>${s.name}</h3>
              <p>Code: <strong>${s.code}</strong></p>
            </div>
          </div>
          <div class="team-members">
            ${(s.members||[]).map(g=>{var c;return`
              <div class="team-member-avatar" style="background:${s.color||"#173B7A"}">${((c=g[0])==null?void 0:c.toUpperCase())||"?"}</div>
            `}).join("")}
          </div>
        </div>
      `).join(""):`
        <div class="glass-card animate-in stagger-1" style="padding:16px;text-align:center;color:var(--text-secondary)">
          <p style="font-size:13px">Pas encore d'équipe</p>
        </div>
      `}
    </div>
  `,(n=document.getElementById("btn-add-friend"))==null||n.addEventListener("click",Ge),(r=document.getElementById("btn-create-team"))==null||r.addEventListener("click",()=>Ve(i)),(d=document.getElementById("btn-join-team"))==null||d.addEventListener("click",Ue),e.querySelectorAll("[data-remove-friend]").forEach(s=>{s.addEventListener("click",async p=>{p.stopPropagation();const g=parseInt(s.dataset.removeFriend),c=[...i];c.splice(g,1),await u.setSetting("friends",c),f("Ami retiré","info"),q(e)})}),e.querySelectorAll(".team-card, .rank-row").forEach(s=>{s.addEventListener("click",()=>{const p=s.dataset.team,g=t.find(c=>c.id===p);g&&Je(g)})})}function Ge(){var i;const e=["#173B7A","#EF5350","#66BB6A","#FFA726","#AB47BC","#EC407A","#26C6DA","#5C6BC0"],t=`
    <div class="input-group">
      <label class="input-label">Pseudo de l'ami</label>
      <input class="input" id="friend-nickname-input" placeholder="Ex: Lucas" maxlength="20">
    </div>
    <div class="input-group">
      <label class="input-label">Couleur</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="friend-color-picker">
        ${e.map((o,n)=>`
          <button class="btn btn-sm" style="width:36px;height:36px;border-radius:10px;background:${o};border:3px solid ${n===0?"#fff":"transparent"}" data-color="${o}"></button>
        `).join("")}
      </div>
    </div>
  `;A("Ajouter un ami",t,[{id:"cancel",label:"Annuler",class:"btn-secondary"},{id:"add",label:"Ajouter",class:"btn-primary"}]);let a=e[0];document.querySelectorAll("#friend-color-picker button").forEach(o=>{o.addEventListener("click",()=>{a=o.dataset.color,document.querySelectorAll("#friend-color-picker button").forEach(n=>n.style.borderColor=n.dataset.color===a?"#fff":"transparent")})}),(i=document.querySelector('[data-action="add"]'))==null||i.addEventListener("click",async()=>{var r,d;const o=(d=(r=document.getElementById("friend-nickname-input"))==null?void 0:r.value)==null?void 0:d.trim();if(!o){f("Entrez un pseudo","error");return}const n=await u.getSetting("friends")||[];if(n.some(s=>s.nickname.toLowerCase()===o.toLowerCase())){f("Cet ami est déjà dans votre liste","error");return}n.push({nickname:o,color:a,addedAt:Date.now()}),await u.setSetting("friends",n),f(`✅ ${o} ajouté en ami !`,"success"),O(),q(document.getElementById("page-container"))})}function Ve(e=[]){var r;const t=["#173B7A","#EF5350","#66BB6A","#FFA726","#AB47BC","#EC407A","#26C6DA","#5C6BC0"],a=["👥","🚀","⚡","🔥","🌟","🎯","🏆","💪","🎮","🦁"],i=`
    <div class="input-group">
      <label class="input-label">Nom de l'équipe</label>
      <input class="input" id="team-name-input" placeholder="Les Explorateurs" maxlength="24">
    </div>
    <div class="input-group">
      <label class="input-label">Votre pseudo</label>
      <input class="input" id="team-pseudo-input" placeholder="Votre nom" maxlength="20">
    </div>
    <div class="input-group">
      <label class="input-label">Couleur</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="color-picker">
        ${t.map((d,s)=>`
          <button class="btn btn-sm" style="width:40px;height:40px;border-radius:12px;background:${d};border:3px solid ${s===0?"#fff":"transparent"}" data-color="${d}"></button>
        `).join("")}
      </div>
    </div>
    <div class="input-group">
      <label class="input-label">Emblème</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="emoji-picker">
        ${a.map((d,s)=>`
          <button class="btn btn-sm" style="width:40px;height:40px;border-radius:12px;font-size:20px;background:var(--input-bg);border:3px solid ${s===0?"var(--accent)":"transparent"}" data-emoji="${d}">${d}</button>
        `).join("")}
      </div>
    </div>
    ${e.length?`
      <div class="input-group">
        <label class="input-label">Inviter des amis (optionnel)</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px" id="invite-friends-list">
          ${e.map((d,s)=>`
            <label class="friend-invite-chip" style="display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:10px;background:var(--input-bg);border:1px solid var(--border);cursor:pointer;font-size:13px">
              <input type="checkbox" value="${d.nickname}" class="invite-check" style="accent-color:var(--accent)">
              ${d.nickname}
            </label>
          `).join("")}
        </div>
      </div>
    `:""}
  `;A("Créer une équipe",i,[{id:"cancel",label:"Annuler",class:"btn-secondary"},{id:"create",label:"Créer",class:"btn-primary"}]);let o=t[0],n=a[0];document.querySelectorAll("#color-picker button").forEach(d=>{d.addEventListener("click",()=>{o=d.dataset.color,document.querySelectorAll("#color-picker button").forEach(s=>s.style.borderColor=s.dataset.color===o?"#fff":"transparent")})}),document.querySelectorAll("#emoji-picker button").forEach(d=>{d.addEventListener("click",()=>{n=d.dataset.emoji,document.querySelectorAll("#emoji-picker button").forEach(s=>s.style.borderColor=s.dataset.emoji===n?"var(--accent)":"transparent")})}),(r=document.querySelector('[data-action="create"]'))==null||r.addEventListener("click",async d=>{var h,v,y,k;const s=(v=(h=document.getElementById("team-name-input"))==null?void 0:h.value)==null?void 0:v.trim(),p=(k=(y=document.getElementById("team-pseudo-input"))==null?void 0:y.value)==null?void 0:k.trim();if(!s||!p){f("Veuillez remplir tous les champs","error");return}const g=Math.random().toString(36).substr(2,6).toUpperCase(),c=[...document.querySelectorAll(".invite-check:checked")].map(ve=>ve.value),l=[p,...c],m={id:_(),name:s,code:g,color:o,emoji:n,members:l,createdBy:p,createdAt:Date.now()};await u.saveTeam(m),await u.setSetting("currentTeam",m.id),await u.setSetting("username",p),f(`Équipe "${s}" créée ! Code: ${g}`,"success"),O(),q(document.getElementById("page-container"))})}function Ue(){var t;A("Rejoindre une équipe",`
    <div class="input-group">
      <label class="input-label">Code de l'équipe</label>
      <input class="input" id="join-code-input" placeholder="ABC123" maxlength="6" style="text-transform:uppercase;text-align:center;font-size:24px;letter-spacing:4px">
    </div>
    <div class="input-group">
      <label class="input-label">Votre pseudo</label>
      <input class="input" id="join-pseudo-input" placeholder="Votre nom" maxlength="20">
    </div>
  `,[{id:"cancel",label:"Annuler",class:"btn-secondary"},{id:"join",label:"Rejoindre",class:"btn-primary"}]),(t=document.querySelector('[data-action="join"]'))==null||t.addEventListener("click",async()=>{var r,d,s,p;const a=(d=(r=document.getElementById("join-code-input"))==null?void 0:r.value)==null?void 0:d.trim().toUpperCase(),i=(p=(s=document.getElementById("join-pseudo-input"))==null?void 0:s.value)==null?void 0:p.trim();if(!a||!i){f("Veuillez remplir tous les champs","error");return}const n=(await u.getAllTeams()).find(g=>g.code===a);if(!n){f("Code d'équipe invalide","error");return}if(n.members.includes(i)){f("Ce pseudo est déjà utilisé","error");return}n.members.push(i),await u.saveTeam(n),await u.setSetting("currentTeam",n.id),await u.setSetting("username",i),f(`Bienvenue dans "${n.name}" !`,"success"),O(),q(document.getElementById("page-container"))})}function Je(e){var a;const t=`
    <div style="text-align:center;margin-bottom:16px">
      <div class="team-avatar" style="background:${e.color||"#173B7A"};width:64px;height:64px;font-size:32px;margin:0 auto 8px">${e.emoji||"👥"}</div>
      <h3 style="font-size:18px;font-weight:700">${e.name}</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-top:4px">Code: <strong>${e.code}</strong></p>
      <p style="font-size:12px;color:var(--text-tertiary);margin-top:2px">Partagez ce code pour inviter</p>
    </div>
    <div class="section-title" style="font-size:14px">Membres</div>
    ${(e.members||[]).map(i=>{var o;return`
      <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
        <div class="team-member-avatar" style="margin-left:0;background:${e.color||"#173B7A"}">${(o=i[0])==null?void 0:o.toUpperCase()}</div>
        <span style="font-weight:500">${i}</span>
        ${i===e.createdBy?'<span style="font-size:11px;background:var(--badge-bg);color:var(--accent);padding:2px 8px;border-radius:6px;margin-left:auto">Chef</span>':""}
      </div>
    `}).join("")}
    <div style="margin-top:16px">
      <button class="btn btn-secondary btn-full" id="btn-copy-code">📋 Copier le code</button>
    </div>
  `;A(e.name,t,[{id:"close",label:"Fermer",class:"btn-secondary"}]),(a=document.getElementById("btn-copy-code"))==null||a.addEventListener("click",()=>{var i;(i=navigator.clipboard)==null||i.writeText(e.code).then(()=>{f("Code copié !","success")}).catch(()=>{f(`Code: ${e.code}`,"info")})})}async function ge(e){var c;z("Profil");const t=await u.getSetting("username")||"",a=await u.getSetting("currentTeam"),i=a?await u.getTeam(a):null,o=await u.getAllProgress(),n=await u.getAllPhotos(),r=await u.getAllChallenges(),d=await u.getAllAchievements(),s=n.sort((l,m)=>m.timestamp-l.timestamp),p=o.reduce((l,m)=>l+(m.points||0),0)+r.filter(l=>l.completed).reduce((l,m)=>l+(m.earnedPoints||0),0),g=o.filter(l=>l.completed).length;e.innerHTML=`
    <div class="page">
      <div class="profile-header animate-in">
        <div class="avatar-large" style="width:72px;height:72px;font-size:28px;margin:0 auto 10px">${t?t[0].toUpperCase():"?"}</div>
        <h2 style="font-size:20px;font-weight:700">${t||"Invité"}</h2>
        ${i?`<p style="font-size:13px;color:var(--text-secondary);margin-top:3px">${i.emoji||"👥"} ${i.name}</p>`:""}
      </div>

      <div class="stats-grid animate-in stagger-1">
        <div class="stat-card glass-card"><div class="stat-value">${p}</div><div class="stat-label">Points</div></div>
        <div class="stat-card glass-card"><div class="stat-value">${n.length}</div><div class="stat-label">Photos</div></div>
        <div class="stat-card glass-card"><div class="stat-value">${g}</div><div class="stat-label">Étapes</div></div>
        <div class="stat-card glass-card"><div class="stat-value">${r.filter(l=>l.completed).length}</div><div class="stat-label">Défis</div></div>
      </div>

      <div class="section-title animate-in stagger-2">🖼️ Ma Galerie</div>
      ${s.length?`
        <div class="gallery-grid animate-in stagger-3">
          ${s.map(l=>`
            <div class="gallery-item" data-photo-id="${l.id}">
              <img src="${l.data}" alt="${l.poiName||"Photo"}" loading="lazy">
              <div class="gallery-item-overlay">
                <span>${l.poiName||"Photo"}</span>
                ${l.score!==void 0?` · ${l.score}%`:""}
              </div>
            </div>
          `).join("")}
        </div>
      `:`
        <div class="glass-card animate-in stagger-3" style="padding:24px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">📷</div>
          <p style="color:var(--text-secondary);font-size:14px">Aucune photo pour l'instant</p>
          <p style="color:var(--text-tertiary);font-size:12px;margin-top:4px">Prenez des photos via la carte ou les défis</p>
        </div>
      `}

      <div class="section-title animate-in stagger-4" style="margin-top:20px">⚙️ Paramètres</div>
      <div class="glass-card animate-in stagger-5" style="padding:14px">
        <div class="input-group" style="margin-bottom:10px">
          <label class="input-label">Pseudo</label>
          <div style="display:flex;gap:8px">
            <input class="input" id="profile-username" value="${t}" placeholder="Votre pseudo" style="flex:1">
            <button class="btn btn-primary btn-sm" id="btn-save-username">✓</button>
          </div>
        </div>
        <div class="input-group" style="margin-bottom:0">
          <label class="input-label">Thème</label>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm btn-theme glass-theme-btn" data-theme="dark" style="flex:1">🌙 Sombre</button>
            <button class="btn btn-sm btn-theme glass-theme-btn" data-theme="light" style="flex:1">☀️ Clair</button>
            <button class="btn btn-sm btn-theme glass-theme-btn" data-theme="auto" style="flex:1">🔄 Auto</button>
          </div>
        </div>
      </div>

      ${d.length?`
        <div class="section-title animate-in stagger-6" style="margin-top:20px">🏆 Succès récents</div>
        ${d.slice(-3).reverse().map(l=>`
          <div class="achievement-card glass-card animate-in">
            <div class="achievement-icon" style="background:rgba(48,209,88,0.15)">${l.icon||"🏅"}</div>
            <div class="achievement-info"><h4>${l.name}</h4><p>${l.description}</p></div>
          </div>
        `).join("")}
      `:""}
    </div>
  `,e.querySelectorAll(".gallery-item").forEach(l=>{l.addEventListener("click",async()=>{const m=l.dataset.photoId,h=await u.getPhoto(m);h&&Ze(h)})}),(c=document.getElementById("btn-save-username"))==null||c.addEventListener("click",async()=>{var m,h;const l=(h=(m=document.getElementById("profile-username"))==null?void 0:m.value)==null?void 0:h.trim();l&&(await u.setSetting("username",l),f("Pseudo mis à jour","success"))}),document.querySelectorAll(".btn-theme").forEach(l=>{l.addEventListener("click",async()=>{const m=l.dataset.theme;await u.setSetting("theme",m);const h=m==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":m;document.documentElement.setAttribute("data-theme",h),f(`Thème ${m==="dark"?"sombre":m==="light"?"clair":"auto"}`,"success")})})}function Ze(e){var a;const t=`
    <div style="margin: -20px -20px 16px">
      <img src="${e.data}" style="width:100%;display:block" alt="${e.poiName||"Photo"}">
    </div>
    <div style="text-align:center;margin-bottom:12px">
      <div style="font-size:16px;font-weight:700">${e.poiName||"Photo"}</div>
      <div style="font-size:12px;color:var(--text-tertiary);margin-top:2px">${se(e.timestamp)} · ${H(e.timestamp)}</div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px">
      ${e.score!==void 0?`<div style="text-align:center"><div style="font-size:22px;font-weight:800;color:var(--accent)">${e.score}%</div><div style="font-size:10px;color:var(--text-secondary)">Note</div></div>`:""}
      ${e.points!==void 0?`<div style="text-align:center"><div style="font-size:22px;font-weight:800;color:var(--accent)">+${e.points}</div><div style="font-size:10px;color:var(--text-secondary)">Points</div></div>`:""}
      ${e.lat?`<div style="text-align:center"><div style="font-size:12px;font-weight:600">📍</div><div style="font-size:10px;color:var(--text-secondary)">${e.lat.toFixed(4)}, ${e.lng.toFixed(4)}</div></div>`:""}
    </div>
  `;A(e.poiName||"Photo",t,[{id:"delete",label:"🗑️ Supprimer",class:"btn-danger"},{id:"close",label:"Fermer",class:"btn-secondary"}]),(a=document.querySelector('[data-action="delete"]'))==null||a.addEventListener("click",async()=>{await u.deletePhoto(e.id),f("Photo supprimée","info"),ge(document.getElementById("page-container"))})}async function he(e){z("Galerie");const t=await u.getAllPhotos(),a=t.sort((i,o)=>o.timestamp-i.timestamp);e.innerHTML=`
    <div class="page">
      <div style="text-align:center;margin-bottom:20px" class="animate-in">
        <div style="font-size:48px;margin-bottom:8px">🖼️</div>
        <h2 style="font-size:22px;font-weight:700">Galerie</h2>
        <p style="font-size:14px;color:var(--text-secondary);margin-top:4px">${t.length} photo${t.length>1?"s":""}</p>
      </div>

      ${a.length?`
        <div class="gallery-grid animate-in stagger-1">
          ${a.map(i=>(w.flatMap(o=>o.routes).find(o=>o.id===i.routeId),`
              <div class="gallery-item" data-photo="${i.id}">
                <img src="${i.data}" alt="Photo" loading="lazy">
                <div class="gallery-item-overlay">
                  ${i.score?`${i.score}%`:""} · ${H(i.timestamp)}
                </div>
              </div>
            `)).join("")}
        </div>
      `:`
        <div class="gallery-empty animate-in stagger-1">
          <div class="gallery-empty-icon">📷</div>
          <h3>Aucune photo</h3>
          <p style="color:var(--text-secondary);margin-top:8px">Commencez un rallye photo pour remplir votre galerie !</p>
          <button class="btn btn-primary" style="margin-top:16px" onclick="document.querySelector('[data-tab=rally]').click()">
            📸 Commencer un rallye
          </button>
        </div>
      `}
    </div>
  `,e.querySelectorAll(".gallery-item").forEach(i=>{i.addEventListener("click",async()=>{const o=i.dataset.photo,n=await u.getPhoto(o);n&&Xe(n)})})}function Xe(e){var a;const t=`
    <div style="margin: -20px -20px 16px">
      <img src="${e.data}" style="width:100%;display:block" alt="Photo">
    </div>
    <div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px">
      ${e.score!==void 0?`
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:800;color:var(--accent)">${e.score}%</div>
          <div style="font-size:11px;color:var(--text-secondary)">Note</div>
        </div>
      `:""}
      ${e.points!==void 0?`
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:800;color:var(--accent)">+${e.points}</div>
          <div style="font-size:11px;color:var(--text-secondary)">Points</div>
        </div>
      `:""}
      <div style="text-align:center">
        <div style="font-size:14px;font-weight:600">${se(e.timestamp)}</div>
        <div style="font-size:11px;color:var(--text-secondary)">${H(e.timestamp)}</div>
      </div>
    </div>
  `;A("Photo",t,[{id:"delete",label:"🗑️ Supprimer",class:"btn-danger"},{id:"close",label:"Fermer",class:"btn-secondary"}]),(a=document.querySelector('[data-action="delete"]'))==null||a.addEventListener("click",async()=>{await u.deletePhoto(e.id),f("Photo supprimée","info"),he(document.getElementById("page-container"))})}async function We(e){z("Statistiques");const t=await u.getAllProgress(),a=await u.getAllPhotos(),i=await u.getAllChallenges(),o=await u.getAllTeams();await u.getHistory();const n=w.reduce((c,l)=>c+l.routes.reduce((m,h)=>m+h.steps.length,0),0),r=t.filter(c=>c.completed).length,d=i.filter(c=>c.completed).reduce((c,l)=>c+(l.earnedPoints||0),0);w.reduce((c,l)=>c+l.pois.length,0),t.filter(c=>c.completed).length;const s={};w.forEach(c=>{Object.entries(c.categories).forEach(([l,m])=>{s[l]||(s[l]={...m,count:0}),c.pois.filter(h=>h.category===l).forEach(()=>{c.routes.flatMap(v=>v.steps).filter(v=>{const y=c.pois.find(k=>k.id===v.poiId);return(y==null?void 0:y.category)===l}).forEach(v=>{t.some(y=>y.stepId===v.id&&y.completed)&&s[l].count++})})})});const p=w.map(c=>{const l=c.routes.reduce((h,v)=>h+v.steps.length,0),m=t.filter(h=>c.routes.find(y=>y.steps.some(k=>k.id===h.stepId))&&h.completed).length;return{...c,total:l,completed:m,percent:l?Math.round(m/l*100):0}}),g=Math.max(1,...Object.values(s).map(c=>c.count));e.innerHTML=`
    <div class="page">
      <div style="text-align:center;margin-bottom:24px" class="animate-in">
        <div style="font-size:48px;margin-bottom:8px">📊</div>
        <h2 style="font-size:22px;font-weight:700">Statistiques</h2>
      </div>

      <div class="stats-grid animate-in stagger-1">
        <div class="stat-card glass-card">
          <div class="stat-value">${r}/${n}</div>
          <div class="stat-label">Étapes</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-value">${d}</div>
          <div class="stat-label">Points</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-value">${a.length}</div>
          <div class="stat-label">Photos</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-value">${i.filter(c=>c.completed).length}</div>
          <div class="stat-label">Défis</div>
        </div>
        <div class="stat-card glass-card wide">
          <div class="stat-value">${n?Math.round(r/n*100):0}%</div>
          <div class="stat-label">Progression totale</div>
          <div style="margin-top:8px">${oe(n?Math.round(r/n*100):0)}</div>
        </div>
      </div>

      <div class="section-title animate-in stagger-2">Par ville</div>
      ${p.map((c,l)=>`
        <div class="glass-card animate-in stagger-${l+3}" style="padding:16px;margin-bottom:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:24px">${c.flag}</span>
              <div>
                <div style="font-weight:700;font-size:16px">${c.name}</div>
                <div style="font-size:12px;color:var(--text-secondary)">${c.completed}/${c.total} étapes</div>
              </div>
            </div>
            <div style="font-size:20px;font-weight:800;color:var(--accent)">${c.percent}%</div>
          </div>
          ${oe(c.percent)}
        </div>
      `).join("")}

      <div class="section-title animate-in stagger-5">Par catégorie</div>
      <div class="bar-chart animate-in stagger-6">
        ${Object.values(s).filter(c=>c.count>0).sort((c,l)=>l.count-c.count).map(c=>`
          <div class="bar-row">
            <div class="bar-label">${c.icon} ${c.label}</div>
            <div class="bar-track">
              <div class="bar-fill" style="width:${c.count/g*100}%;background:${c.color}">
                <span class="bar-value">${c.count}</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      ${o.length?`
        <div class="section-title animate-in">Classement équipes</div>
        ${o.sort((c,l)=>{const m=t.filter(v=>v.teamId===c.id).reduce((v,y)=>v+(y.points||0),0);return t.filter(v=>v.teamId===l.id).reduce((v,y)=>v+(y.points||0),0)-m}).map((c,l)=>{const m=t.filter(h=>h.teamId===c.id).reduce((h,v)=>h+(v.points||0),0);return`
            <div class="rank-row glass-card">
              <div class="rank-position ${l===0?"gold":l===1?"silver":l===2?"bronze":""}">${l===0?"🥇":l===1?"🥈":l===2?"🥉":l+1}</div>
              <div class="team-avatar" style="background:${c.color}">${c.emoji}</div>
              <div class="rank-info"><h4>${c.name}</h4></div>
              <div class="rank-score">${m}</div>
            </div>
          `}).join("")}
      `:""}
    </div>
  `}function oe(e){return`<div class="progress-bar"><div class="progress-fill" style="width:${e}%"></div></div>`}async function Ke(e){z("Historique");const t=await u.getHistory(),a={};t.forEach(o=>{const n=new Date(o.timestamp).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});a[n]||(a[n]=[]),a[n].push(o)});const i={step_completed:"✅",challenge_completed:"🏆",route_completed:"🎉",team_joined:"👥",achievement_unlocked:"🏅",photo_taken:"📸"};e.innerHTML=`
    <div class="page">
      <div style="text-align:center;margin-bottom:24px" class="animate-in">
        <div style="font-size:48px;margin-bottom:8px">🕐</div>
        <h2 style="font-size:22px;font-weight:700">Historique</h2>
        <p style="font-size:14px;color:var(--text-secondary);margin-top:4px">${t.length} événement${t.length>1?"s":""}</p>
      </div>

      ${Object.keys(a).length?Object.entries(a).map(([o,n],r)=>`
        <div class="section-title animate-in stagger-${Math.min(r+1,6)}">${o}</div>
        ${n.map((d,s)=>`
          <div class="glass-card animate-in stagger-${Math.min(s+2,6)}" style="padding:14px;margin-bottom:8px;display:flex;gap:12px;align-items:flex-start">
            <div style="font-size:24px;flex-shrink:0">${i[d.type]||"📌"}</div>
            <div style="flex:1;min-width:0">
              <div style="font-weight:600;font-size:15px">${d.title}</div>
              ${d.detail?`<div style="font-size:13px;color:var(--text-secondary);margin-top:2px">${d.detail}</div>`:""}
              <div style="font-size:12px;color:var(--text-tertiary);margin-top:4px">${H(d.timestamp)}</div>
            </div>
          </div>
        `).join("")}
      `).join(""):`
        <div class="empty-state animate-in stagger-1">
          <div class="empty-state-icon">🕐</div>
          <h3>Aucun historique</h3>
          <p style="color:var(--text-secondary);margin-top:8px">Votre activité apparaîtra ici</p>
        </div>
      `}
    </div>
  `}async function X(e){var n,r,d,s,p,g,c;z("Paramètres");const t=await u.getSetting("theme")||"dark",a=await u.getSetting("username")||"",i=await u.getSetting("currentTeam"),o=i?await u.getTeam(i):null;e.innerHTML=`
    <div class="page">
      <div style="text-align:center;margin-bottom:24px" class="animate-in">
        <div style="font-size:48px;margin-bottom:8px">⚙️</div>
        <h2 style="font-size:22px;font-weight:700">Paramètres</h2>
      </div>

      <div class="section-title animate-in stagger-1">Apparence</div>
      <div class="glass-card animate-in stagger-2" style="padding:16px;margin-bottom:16px">
        <label class="input-label">Thème</label>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm setting-theme-btn ${t==="dark"?"btn-primary":"btn-secondary"}" data-theme="dark" style="flex:1">🌙 Sombre</button>
          <button class="btn btn-sm setting-theme-btn ${t==="light"?"btn-primary":"btn-secondary"}" data-theme="light" style="flex:1">☀️ Clair</button>
          <button class="btn btn-sm setting-theme-btn ${t==="auto"?"btn-primary":"btn-secondary"}" data-theme="auto" style="flex:1">🔄 Auto</button>
        </div>
      </div>

      <div class="section-title animate-in stagger-3">Profil</div>
      <div class="glass-card animate-in stagger-4" style="padding:16px;margin-bottom:16px">
        <div class="input-group" style="margin-bottom:12px">
          <label class="input-label">Pseudo</label>
          <input class="input" id="settings-username" value="${a}" placeholder="Votre pseudo">
        </div>
        ${o?`
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--input-bg);border-radius:12px">
            <div class="team-avatar" style="background:${o.color};width:40px;height:40px;font-size:18px;margin:0">${o.emoji}</div>
            <div style="flex:1">
              <div style="font-weight:600">${o.name}</div>
              <div style="font-size:12px;color:var(--text-secondary)">Code: ${o.code}</div>
            </div>
            <button class="btn btn-sm btn-danger" id="btn-leave-team">Quitter</button>
          </div>
        `:`
          <div style="text-align:center;color:var(--text-secondary);font-size:14px;padding:12px 0">
            Aucune équipe
          </div>
        `}
      </div>

      <div class="section-title animate-in stagger-5">Données</div>
      <div class="glass-card animate-in stagger-6" style="padding:16px;margin-bottom:16px">
        <button class="btn btn-secondary btn-full" id="btn-export" style="margin-bottom:8px">📤 Exporter les données (JSON)</button>
        <button class="btn btn-secondary btn-full" id="btn-import" style="margin-bottom:8px">📥 Importer des données</button>
        <button class="btn btn-danger btn-full" id="btn-reset">🗑️ Tout réinitialiser</button>
        <input type="file" id="import-file" accept=".json" style="display:none">
      </div>

      <div class="section-title animate-in">Notifications</div>
      <div class="glass-card animate-in" style="padding:16px;margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-weight:600">Notifications push</div>
            <div style="font-size:13px;color:var(--text-secondary)">Alertes pour les succès et défis</div>
          </div>
          <button class="btn btn-sm ${(Notification==null?void 0:Notification.permission)==="granted"?"btn-primary":"btn-secondary"}" id="btn-notif-perm">
            ${(Notification==null?void 0:Notification.permission)==="granted"?"Activées":"Activer"}
          </button>
        </div>
      </div>

      <div style="text-align:center;padding:20px 0;color:var(--text-tertiary);font-size:13px" class="animate-in">
        <div>🧭 Explore v1.0.0</div>
        <div style="margin-top:4px">Rallye Découverte PWA</div>
      </div>
    </div>
  `,document.querySelectorAll(".setting-theme-btn").forEach(l=>{l.addEventListener("click",async()=>{const m=l.dataset.theme;await u.setSetting("theme",m);const h=m==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":m;document.documentElement.setAttribute("data-theme",h),document.querySelectorAll(".setting-theme-btn").forEach(v=>{v.className=`btn btn-sm setting-theme-btn ${v.dataset.theme===m?"btn-primary":"btn-secondary"}`}),f(`Thème ${m==="dark"?"sombre":m==="light"?"clair":"automatique"}`,"success")})}),(n=document.getElementById("settings-username"))==null||n.addEventListener("change",async l=>{const m=l.target.value.trim();m&&await u.setSetting("username",m)}),(r=document.getElementById("btn-leave-team"))==null||r.addEventListener("click",async()=>{await u.setSetting("currentTeam",null),f("Vous avez quitté l'équipe","info"),X(e)}),(d=document.getElementById("btn-export"))==null||d.addEventListener("click",async()=>{const l={photos:await u.getAllPhotos(),progress:await u.getAllProgress(),teams:await u.getAllTeams(),challenges:await u.getAllChallenges(),history:await u.getHistory(),achievements:await u.getAllAchievements(),settings:await u.getSettings(),exportDate:Date.now()},m=new Blob([JSON.stringify(l,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),v=document.createElement("a");v.href=h,v.download=`explore-backup-${new Date().toISOString().slice(0,10)}.json`,v.click(),URL.revokeObjectURL(h),f("Données exportées","success")}),(s=document.getElementById("btn-import"))==null||s.addEventListener("click",()=>{var l;(l=document.getElementById("import-file"))==null||l.click()}),(p=document.getElementById("import-file"))==null||p.addEventListener("change",async l=>{const m=l.target.files[0];if(m)try{const h=await m.text(),v=JSON.parse(h);if(v.photos)for(const y of v.photos)await u.addPhoto(y);if(v.progress)for(const y of v.progress)await u.saveProgress(y);if(v.teams)for(const y of v.teams)await u.saveTeam(y);if(v.challenges)for(const y of v.challenges)await u.saveChallenge(y);if(v.history)for(const y of v.history)await u.addHistory(y);if(v.achievements)for(const y of v.achievements)await u.saveAchievement(y);f("Données importées avec succès","success")}catch{f("Erreur lors de l'import","error")}}),(g=document.getElementById("btn-reset"))==null||g.addEventListener("click",()=>{A("Réinitialiser",'<p style="text-align:center;color:var(--text-secondary)">Supprimer toutes les données ? Cette action est irréversible.</p>',[{id:"cancel",label:"Annuler",class:"btn-secondary"},{id:"confirm",label:"Tout supprimer",class:"btn-danger",onClick:()=>{indexedDB.deleteDatabase("explore_pwa"),location.reload()}}])}),(c=document.getElementById("btn-notif-perm"))==null||c.addEventListener("click",async()=>{if("Notification"in window){const l=await Notification.requestPermission();f(l==="granted"?"Notifications activées":"Notifications refusées",l==="granted"?"success":"info"),X(e)}})}const ne={home:re,map:Se,rally:_e,teams:q,profile:ge,gallery:he,stats:We,achievements:He,history:Ke,settings:X};async function Qe(){var t,a;try{await u.getDB()}catch(i){console.error("DB error:",i)}try{await $e.init()}catch(i){console.error("Theme error:",i)}G.init(),G.onChange(async i=>{const o=ne[i];if(o){const n=document.getElementById("page-container");n.innerHTML="";try{await o(n)}catch(r){console.error("Screen error:",r)}}}),(t=document.getElementById("btn-menu"))==null||t.addEventListener("click",async()=>{const i=await u.getSetting("username")||"Invité",o=await u.getSetting("currentTeam"),n=o?await u.getTeam(o):null;we(i,(n==null?void 0:n.name)||null),F(!0)}),(a=document.getElementById("btn-notifications"))==null||a.addEventListener("click",()=>{f("Notifications","info")}),document.querySelectorAll(".sidebar-item").forEach(i=>{i.addEventListener("click",()=>{const o=i.dataset.action;F(!1),ne[o]?G.navigate(o):o==="about"&&f("Explore v1.0.0 - Rallye Découverte PWA","info",4e3)})});const e=document.getElementById("page-container");try{await re(e)}catch(i){console.error("Home render error:",i)}try{O()}catch{}if("Notification"in window&&Notification.permission==="default"&&setTimeout(()=>{Notification.requestPermission()},5e3),"serviceWorker"in navigator)try{await navigator.serviceWorker.register("/sw.js")}catch{}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("splash-screen"),t=document.getElementById("main-screen"),a=()=>{e.style.transition="opacity 0.4s ease",e.style.opacity="0",setTimeout(()=>{e.classList.add("hidden"),t.classList.remove("hidden")},400)};try{await Qe()}catch(i){console.error("App init error:",i)}setTimeout(a,1600)});
