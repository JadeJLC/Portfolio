// Fonction pour gérer le changement de domaine (traduction, dev, écriture) en modifiant le contenu affiché
import { setPreference } from "./storage.js";
import { DOMAIN_STORAGE_KEY } from "./display-data.js";
import { translations } from "./translation.js";
import { currentData } from "./display-data.js";

export function switchDomain(domainId, updateButtons = true) {
  const body = document.body;
  const domainSelector = document.getElementById("domain-selector");
  const domainButtons = domainSelector.querySelectorAll(".domain-btn");
  const domainContentWrappers = document.querySelectorAll(".domain-content");

  setPreference(DOMAIN_STORAGE_KEY, domainId);

  // 1. Met à jour le domaine actif pour gérer la visibilité des éléments de la page
  body.setAttribute("data-active-domain", domainId);

  // 2. Met à jour le bouton marqué actif en haut de la page
  if (updateButtons) {
    domainButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-domain-id") === domainId) {
        btn.classList.add("active");
      }
    });
  }

  // 3. Active la visibilité des compétences et des projets
  domainContentWrappers.forEach((wrapper) => {
    wrapper.classList.remove("domain-active");
    if (wrapper.getAttribute("data-domain-id") === domainId) {
      wrapper.classList.add("domain-active");
    }
  });

  // 4. Change les textes d'introduction selon le demaine
  const langDict = translations[currentData.currentLang];

  document.getElementById("skills-title").textContent =
    langDict[`skills_title_${domainId}`];
  document.getElementById("skills-intro").textContent =
    langDict[`skills_intro_${domainId}`];
  document.getElementById("projects-title").textContent =
    langDict[`projects_title_${domainId}`];
  document.getElementById("projects-intro").textContent =
    langDict[`projects_intro_${domainId}`];
}
