// script.js
let tabla = ["", "", "", "", "", "", "", "", ""];
let jelenlegiJatekos = "X";
let aktivJatek = true;
let botAktiv = false;

const jatekTabla = document.getElementById("jatekTabla");
const statuszKiiratas = document.getElementById("statusz");
const ujrainditasGomb = document.getElementById("ujrainditas");
const ketJatekosModGomb = document.getElementById("ketJatekosMod");
const BotEllenGomb = document.getElementById("BotEllen");

// Indítsd el a játékot
function jatekInditas() {
    jatekTabla.innerHTML = "";
    tabla = ["", "", "", "", "", "", "", "", ""];
    jelenlegiJatekos = "X";
    aktivJatek = true;
    statuszKiiratas.textContent = "";
    ujrainditasGomb.style.display = "none";

    tabla.forEach((_, index) => {
        const cella = document.createElement("div");
        cella.classList.add("cella");
        cella.addEventListener("click", () => cellakKattintasak(index));
        jatekTabla.appendChild(cella);
    });
}

// Ellenőrzi, hogy nyert-e valaki
function nyertesEllenorzese() {
    const nyeresiLehetosegek = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // sorok
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // oszlopok
        [0, 4, 8], [2, 4, 6]            // átlók
    ];

    for (const minta of nyeresiLehetosegek) {
        const [a, b, c] = minta;
        if (tabla[a] && tabla[a] === tabla[b] && tabla[a] === tabla[c]) {
            return tabla[a];
        }
    }

    return tabla.includes("") ? null : "Döntetlen";
}

// Kezeli a cellák kattintását
function cellakKattintasak(index) {
    if (!aktivJatek || tabla[index]) return;

    tabla[index] = jelenlegiJatekos;
    jatekTabla.children[index].textContent = jelenlegiJatekos;
    jatekTabla.children[index].classList.add("hasznalt");

    const nyertes = nyertesEllenorzese();
    if (nyertes) {
        aktivJatek = false;
        statuszKiiratas.textContent = nyertes === "Döntetlen" ? "A játék döntetlen." : `${nyertes} játékos nyert.`;
        ujrainditasGomb.style.display = "block";
        return;
    }

    jelenlegiJatekos = jelenlegiJatekos === "X" ? "O" : "X";

    if (botAktiv && jelenlegiJatekos === "O") {
        ellenTamadas();
    }
}

// Számítógép véletlenszerű lépése
function ellenTamadas() {
    const uresCella = tabla.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
    const randomIndex = uresCella[Math.floor(Math.random() * uresCella.length)];
    cellakKattintasak(randomIndex);
}

// Új játék
ujrainditasGomb.addEventListener("click", jatekInditas);

// Játékmódok
ketJatekosModGomb.addEventListener("click", () => {
    botAktiv = false;
    jatekInditas();
});

BotEllenGomb.addEventListener("click", () => {
    botAktiv = true;
    jatekInditas();
});

// Indítás alapértelmezett módban
jatekInditas();
