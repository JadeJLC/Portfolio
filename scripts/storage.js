// ***** Fonction de stockage et de récupération des préférences (langue, domaine) pour l'affichage du portfolio

// Récupère les informations dans les données locales
function getPreference(key, defaultValue) {
  const value = localStorage.getItem(key);
  return value !== null ? value : defaultValue;
}

// Stocke les informations dans les données locales
function setPreference(key, value) {
  localStorage.setItem(key, value);
}

// Fonction pour récupérer les données de l'URL et afficher la bonne version du portfolio
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export { getPreference, setPreference, getUrlParameter };
