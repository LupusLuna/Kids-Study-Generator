// ----------------------------
// 1. Definition der Bausteine
// ----------------------------
// Jeder Baustein hat einen Namen und ein oder zwei Icons.
const bausteine = [
  { name:"Wald & Tiere", icon:"🌲🐾", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Wald%26Tiere_01.jpg" },
  { name:"Bauernhof", icon:"🌍", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Bauernhof_01.jpg" },
  { name:"Wüste", icon:"🌱", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/W%C3%BCste_02.jpg" },
  { name:"Stadt", icon:"♻️", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Stadt_02.jpgjpg" },
  { name:"Krankenhaus", icon:"🔧", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Krankenhaus_01.jpg" },
  { name:"Feuerwehr & Polizei", icon:"🔧", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Feuerwehr%26Polizei_03.jpg" },
  { name:"Rakete", icon:"🧩", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Rakete_01.jpg" },
  { name:"Rennsport", icon:"🎮", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Rennsport_02.jpg" },
  { name:"Auto", icon:"🧩", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Auto_01.jpg" },
  { name:"Flugzeug", icon:"🧩", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Flugzeug_01.jpg" },
  { name:"Ninja", icon:"💪", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Ninja_01.jpg" },
  { name:"Fussball", icon:"⚽💪", bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Fu%C3%9Fball_02.jpg" }
];

// ----------------------------
// 2. Definition der Spezialisierungen
// ----------------------------
// Jede Spezialisierung hat:
// - name: Name der Spezialisierung
// - cores: Liste von Bausteinen, die für diese Spezialisierung relevant sind
// - beschreibung: Textbeschreibung, was die Kinder dort lernen
// - stundenplan: Beispielstundenplan, zeigt den Ablauf
const spezialisierungen = [
  { name:"Natur", cores:["Wald & Tiere", "Bauernhof", "Wüste"], bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Natur1.jpg", beschreibung:"Bau dir dein Bild von der Natur", stundenplan:["Farm","Tiere halten","Natur entdecken"] },
  { name:"City", cores:["Stadt", "Krankenhaus", "Feuerwehr & Polizei"], bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/City1.jpg", beschreibung:"Erstelle eine Stadt mit allem was dazu gehört", stundenplan:["Haus","Hochhaus","Sehenswertes"] },
  { name:"Action", cores:["Ninja", "Rennsport", "Fussball"], bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Action1.jpg", beschreibung:"Sport als Abenteuer, entwickel deine eigenen Sportarea", stundenplan:["Fit","Outdoor-Aktivitäten","Spiel"] },
  { name:"Technik", cores:["Auto", "Flugzeug", "Rakete"], bild:"https://github.com/LupusLuna/Kids-Study2/blob/main/images/Technik1.jpg", beschreibung:"Tüfteln, bauen, technisch überlegen", stundenplan:["Robotik","Programmieren","Bauprojekte"] }
];

// ----------------------------
// 3. Variable für ausgewählte Bausteine
// ----------------------------
// Array, das alle vom Nutzer ausgewählten Bausteine speichert
let selectedBausteine = [];

// ----------------------------
// 4. Funktion: Schritt wechseln
// ----------------------------
// step = 1,2,3
function nextStep(step){
    // Alle Steps ausgeblenden
  document.querySelectorAll("#step1,#step2,#step3,#result").forEach(div => div.classList.add("hidden"));
    // Den gewünschten Step anzeigen
  document.getElementById("step"+step).classList.remove("hidden");
  // Wenn  Bausteinwahl kommt, die Bausteine rendern
  if(step===2) renderBausteine();
}

// ----------------------------
// 5. Funktion: Bausteine anzeigen
// ----------------------------
function renderBausteine(){
  const container = document.getElementById("bausteine");
  container.innerHTML = "";

  bausteine.forEach(b=>{
    const div = document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <img src="${b.bild}" alt="${b.name}" style="width:100%;border-radius:12px;">
      <div><span style="font-size:24px">${b.icon}</span><br>${b.name}</div>
    `;
    div.onclick=()=>{
      if(selectedBausteine.includes(b.name)){
        selectedBausteine = selectedBausteine.filter(x=>x!==b.name);
        div.classList.remove("selected");
      } else if(selectedBausteine.length<2){
        selectedBausteine.push(b.name); 
        div.classList.add("selected");
      }
    };
    container.appendChild(div);
  });
}

// ----------------------------
// 6. Funktion: Spezialisierungen anzeigen
// ----------------------------
function showSpezialisierungen(){
  if(selectedBausteine.length===0){ alert("Bitte wähle mindestens einen Baustein!"); return;}
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");

  const container = document.getElementById("spezialisierungen");
  container.innerHTML = "";

  const possible = spezialisierungen.filter(spec =>
    spec.cores.some(c => selectedBausteine.includes(c))
  );

  possible.forEach(spec=>{
    const div = document.createElement("div");
    div.className="card";
    div.style.background = "#ffe680";
    div.innerHTML=`
      <img src="${spec.bild}" alt="${spec.name}" style="width:100%;border-radius:12px;">
      <strong>${spec.name}</strong>
    `;
    div.onclick=()=>showResult(spec);
    container.appendChild(div);
  });
}

// ----------------------------
// 7. Funktion: Ergebnis/Stundenplan anzeigen
// ----------------------------
function showResult(spec){
  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.style.transform="scale(0.8)";
  setTimeout(()=>result.style.transform="scale(1)",50);

  const bilderHTML = selectedBausteine.map(b=>{
    const bs = bausteine.find(x=>x.name===b);
    return `<img src="${bs.bild}" alt="${bs.name}" style="width:100px;border-radius:8px;margin:5px;">`;
  }).join("");

  result.innerHTML=`
    <h2>${spec.name}</h2>
    <img src="${spec.bild}" alt="${spec.name}" style="width:200px;border-radius:16px;"><br>
    <p>${spec.beschreibung}</p>
    <h3>Deine gewählten Bausteine:</h3>
    <div>${bilderHTML}</div>
    <h3>Stundenplan:</h3>
    <ul>${spec.stundenplan.map(f=>`<li>${f}</li>`).join("")}</ul>
    <br><button class="reset" onclick="resetAll()">Neu starten</button>
  `;
}


// ----------------------------
// 8. Funktion: Alles zurücksetzen
// ----------------------------
function resetAll(){
  selectedBausteine = [];
  document.querySelectorAll("#step1,#step2,#step3,#result").forEach(div=>div.classList.add("hidden"));
  document.getElementById("step1").classList.remove("hidden");
}




