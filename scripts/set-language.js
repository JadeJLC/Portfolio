//  Récupère les données de traduction pour afficher le portfolio dans la bonne langue
import { switchDomain } from "./domain.js";
import { translations } from "./translation.js";
import { currentData, LANG_STORAGE_KEY } from "./display-data.js";
import { setPreference } from "./storage.js";

function setLanguage(langCode) {
  const langSelector = document.getElementById("language-selector");
  const langButtons = langSelector.querySelectorAll(".lang-btn");

  currentData.currentLang = langCode;
  setPreference(LANG_STORAGE_KEY, langCode);
  const langDict = translations[langCode];

  // 1. Change le drapeau affiché
  langButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-lang") === langCode) {
      btn.classList.add("active");
    }
  });

  // 2. Traduis tous les éléments avec les bonnes données
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const text = langDict[key] || "";

    if (key.includes("_subtitle") || key.includes("_description")) {
      element.innerHTML = text;
    } else {
      element.textContent = text;
    }
  });

  // 3. Change les "title" des liens
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const fullKey = element.getAttribute("data-i18n-title");
    const parts = fullKey.split("|");
    const key = parts[0]; // Clé de traduction (ex. "link_project_lead")
    const param = parts[1]; // Paramètre optionnel (ex. "Alex Smith")

    const basePhrase = langDict[key];

    if (basePhrase) {
      let finalTitle = basePhrase;

      if (param) {
        finalTitle = basePhrase.replace("%s", param);
      }
      element.setAttribute("title", finalTitle);
    }
  });

  // 4. Relance le script de changement de domaine pour mettre à jour le texte
  switchDomain(currentData.currentDomain, false);
}

export { setLanguage };
