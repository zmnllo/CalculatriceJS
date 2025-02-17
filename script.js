// 1 Création de la calculatrice
const calculatrice = document.createElement("div");
calculatrice.style.width = "300px"; // Cadre NOIR
calculatrice.style.margin = "50px auto";
calculatrice.style.padding = "20px";
calculatrice.style.border = "2px solid #333";
calculatrice.style.borderRadius = "10px";
calculatrice.style.background = "#222";
calculatrice.style.textAlign = "center";

// 2️ Création de l'écran
const ecran = document.createElement("div");
ecran.style.width = "calc(100% - 20px)"; // Même largeur que la calculatrice 
ecran.style.height = "50px";
ecran.style.background = "#FFF";
ecran.style.marginBottom = "20px"; // Espace entre nombre et résultat
ecran.style.fontSize = "24px";
ecran.style.fontFamily = "sans-serif";
ecran.style.lineHeight = "50px";
ecran.style.textAlign = "right";
ecran.style.padding = "0 10px";
ecran.style.borderRadius = "5px";
ecran.textContent = "0";
calculatrice.appendChild(ecran);

// 3️ Création des boutons
const boutons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
];

const touchesContainer = document.createElement("div");
touchesContainer.style.display = "grid";
touchesContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
touchesContainer.style.gap = "5px";

boutons.forEach(symbole => {
    const bouton = document.createElement("button");
    bouton.textContent = symbole;
    bouton.style.fontSize = "20px";
    bouton.style.padding = "15px";
    bouton.style.cursor = "pointer";
    bouton.style.border = "none";
    bouton.style.borderRadius = "5px";
    bouton.style.background = "#444";
    bouton.style.color = "white";

    // Pour que le bouton "C" prenne toute la largeur de la calculette
    if (symbole === "C") {
        bouton.style.gridColumn = "span 4";
    }

    // Action des boutons
    bouton.addEventListener("click", () => gererClic(symbole));

    touchesContainer.appendChild(bouton);
});

calculatrice.appendChild(touchesContainer);
document.body.appendChild(calculatrice);

// 4️ Fonction pour gérer les clics
function gererClic(valeur) {
    if (valeur === "C") {
        ecran.textContent = "0"; // Reset
    } else if (valeur === "=") {
        try {
            ecran.textContent = eval(ecran.textContent); // Calcul
        } catch {
            ecran.textContent = "Erreur";
        }
    } else {
        if (ecran.textContent === "0" || ecran.textContent === "Erreur") {
            ecran.textContent = valeur;
        } else {
            ecran.textContent += valeur;
        }
    }
}

// Pour que l'ont puisse utiliser le clavier directement au lieu de taper avec la souris 
document.addEventListener("keydown", (event) => {
    const key = event.key; // Récupère la touche pressée

    // Vérifie si la touche est un chiffre ou une opération reconnue
    const touchesValides = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "Enter", "Backspace", "c", "C"];

    if (touchesValides.includes(key)) {
        if (key === "Enter") {
            gererClic("="); // Appuie sur "Entrée" => Calcul
        } else if (key === "Backspace") {
            ecran.textContent = ecran.textContent.slice(0, -1); // Efface un caractère
        } else if (key.toLowerCase() === "c") {
            gererClic("C"); // Touche "C" (clear)
        } else {
            gererClic(key); // Ajoute la touche pressée à l'écran
        }
    }
});
