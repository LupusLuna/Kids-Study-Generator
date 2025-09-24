// ----------------------------
// 1. Definition der Bausteine
// ----------------------------
// Jeder Baustein hat einen Namen und ein oder zwei Icons.
const bausteine = [
  { name:"Abenteuer draußen", icon:"🌲" },
  { name:"Reisen & Entdecken", icon:"🌍" },
  { name:"Tiere entdecken", icon:"🐾" },
  { name:"Pflanzen & Umwelt", icon:"🌱" },
  { name:"Nachhaltigkeit & Zukunft", icon:"♻️" },
  { name:"Erfinden & Basteln", icon:"🔧" },
  { name:"Bau & Gestaltung", icon:"🧩" },
  { name:"Gaming & Programmieren", icon:"🎮" },
  { name:"Planeten & Sterne", icon:"✨" },
  { name:"Mobil & Technik", icon:"🚀" },
  { name:"Kreative Künste", icon:"🎨🎶" },
  { name:"Sprachen & Kulturen", icon:"🗣️" },
  { name:"Geschichte erleben", icon:"🏺" },
  { name:"Ernährung & Gesundheit", icon:"⚽💪" },
  { name:"Gemeinsam die Welt verbessern", icon:"🤝" }
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
  { name:"Sport & Gesundheit", cores:["Abenteuer draußen", "Ernährung & Gesundheit", "Geschichte erleben"], beschreibung:"Fit bleiben, spielen, bewegen.", stundenplan:["Sportspiele","Tanz & Bewegung","Teamspiele"] },
  { name:"Natur & Umwelt", cores:["Tiere entdecken", "Pflanzen & Umwelt", "Nachhaltigkeit & Zukunft"], beschreibung:"Natur erkunden, Tiere und Pflanzen kennenlernen.", stundenplan:["Tierbeobachtung","Garten & Pflanzen","Umweltprojekte"] },
  { name:"Abenteuer & Reisen", cores:["Abenteuer draußen", "Reisen & Entdecken", "Geschichte erleben", "Sprachen & Kulturen"], beschreibung:"Abenteuer erleben und ferne Orte entdecken.", stundenplan:["Reisen & Kulturen","Outdoor-Aktivitäten","Abenteuer-Training"] },
  { name:"Technik & Tüftelei", cores:["Erfinden & Basteln", "Gaming & Programmieren", "Mobil & Technik", "Bau & Gestaltung"], beschreibung:"Tüfteln, bauen, programmieren.", stundenplan:["Robotik","Programmieren","Bauprojekte"] },
  { name:"Weltraum-Entdeckung", cores:["Planeten & Sterne", "Mobil & Technik", "Gaming & Programmieren"], beschreibung:"Das Weltall erforschen und Raketen bauen.", stundenplan:["Astronomie","Raketenbau","Space-Games"] },
  { name:"Künstlerische Träume", cores:["Kreative Künste", "Sprachen & Kulturen","Bau & Gestaltung", "Gaming & Programmieren"], beschreibung:"Malen, Musik, Geschichten erfinden.", stundenplan:["Kunst & Musik","Theater","Kreatives Schreiben"] },
  { name:"Menschen & Welt", cores:["Reisen & Entdecken", "Ernährung & Gesundheit", "Geschichte erleben", "Sprachen & Kulturen", "Gemeinsam die Welt verbessern"], beschreibung:"Anderen helfen, Kulturen kennenlernen.", stundenplan:["Projekte & Soziales","Sprachen & Kulturen","Geschichte & Gesellschaft"]}
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
  container.innerHTML = ""; // Alte Inhalte löschen

   // Für jeden Baustein eine Karte erstellen
  bausteine.forEach(b=>{
    const div = document.createElement("div");
    div.className="card";
    // Icon + Name in der Karte
    div.innerHTML=`<span style="font-size:24px">${b.icon}</span><span>${b.name}</span>`;

    // Klick-Event: Auswahl/Abwahl
    div.onclick=()=>{
      if(selectedBausteine.includes(b.name)){ // Wenn schon gewählt: abwählen
        selectedBausteine = selectedBausteine.filter(x=>x!==b.name);
        div.classList.remove("selected");
      } else if(selectedBausteine.length<3){ // Maximal 3 Bausteine wählbar
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
// Mindestens ein Baustein muss gewählt sein
  if(selectedBausteine.length===0){ alert("Bitte wähle mindestens einen Baustein!"); return;}
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");

  const container = document.getElementById("spezialisierungen");
  container.innerHTML = "";

  const possible = spezialisierungen.filter(spec =>
    spec.cores.some(c => selectedBausteine.includes(c))
  );

  // Jede mögliche Spezialisierung als klickbare Karte darstellen
  possible.forEach(spec=>{
    const div = document.createElement("div");
    div.className="card";
    div.style.background = "#ffe680"; // Farbe für Spezialisierungen
    div.innerHTML=`<strong>${spec.name}</strong>`;

    // Hover Animation
    div.onmouseover = ()=>div.style.transform="scale(1.05)";
    div.onmouseout = ()=>div.style.transform="scale(1)";

    // Klick: Stundenplan anzeigen
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

  // Kleine Pop-Animation beim Anzeigen
  result.style.transform="scale(0.8)";
  setTimeout(()=>result.style.transform="scale(1)",50);

  // Inhalte einfügen
  result.innerHTML=`
    <span style="color:#e0eeee;">
    <h2>${spec.name}</h2>
    <p>${spec.beschreibung}</p>
    <h3>Stundenplan:</h3>
    <ul>${spec.stundenplan.map(f=>`<li>${f}</li>`).join("")}</ul></span>
    <br><button class="reset" onclick="resetAll()">Neu starten</button>
  `;
}


// ----------------------------
// 8. Funktion: Alles zurücksetzen
// ----------------------------
function resetAll(){
  selectedBausteine = []; // Auswahl leeren
// Alle Steps ausblenden
  document.querySelectorAll("#step1,#step2,#step3,#result").forEach(div=>div.classList.add("hidden"));
// Zurück zum ersten Schritt
  document.getElementById("step1").classList.remove("hidden");
}

