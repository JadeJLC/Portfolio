// Création des icones lucide
lucide.createIcons();

// Import des modules externes
import { getPreference, setPreference, getUrlParameter } from "./storage.js";
import { switchDomain } from "./domain.js";
import { setLanguage } from "./set-language.js";

// Fonction pour ouvrir ou fermer le menu de navigation sur téléphone
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("open");
}

// Variables pour le stockage dans les données locales
export const LANG_STORAGE_KEY = "userLang";
export const DOMAIN_STORAGE_KEY = "userDomain";

// 1. Vérifie les paramètres de l'URL
const urlLang = getUrlParameter("lang");
const urlDomain = getUrlParameter("domain");

// 2. Détermine l'affichage du portfolio : URL > localStorage > Default
export let currentData = {
  currentLang: urlLang || getPreference(LANG_STORAGE_KEY, "en"),
  currentDomain: urlDomain || getPreference(DOMAIN_STORAGE_KEY, "dev"),
};

// 3. Change l'affichage
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const domainSelector = document.getElementById("domain-selector");
  const domainButtons = domainSelector.querySelectorAll(".domain-btn");
  const langSelector = document.getElementById("language-selector");
  const langButtons = langSelector.querySelectorAll(".lang-btn");
  let domainId = currentData.currentDomain;

  switchDomain(domainId, true);

  // Boutons de changement de langue
  langButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const lang = event.target.getAttribute("data-lang");
      if (lang) {
        setLanguage(lang);
      }
    });
  });

  // Boutons de changement de domaine
  domainButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const domainId = event.target.getAttribute("data-domain-id");
      if (domainId) {
        switchDomain(domainId);
      }
    });
  });

  // Initialisation du domaine et de la langue par défaut
  if (urlLang) setPreference(LANG_STORAGE_KEY, urlLang);
  if (urlDomain) setPreference(DOMAIN_STORAGE_KEY, urlDomain);

  setLanguage(currentData.currentLang);
  body.setAttribute("data-active-domain", currentData.currentDomain);
  switchDomain(currentData.currentDomain);
});

export { toggleMobileMenu };
