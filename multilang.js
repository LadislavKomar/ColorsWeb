// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");
    element.innerHTML = langData[key];
  });
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
  location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`languages/${lang}.json`);
  return response.json();
}

// Function to change language
async function changeLanguage(lang) {
  await setLanguagePreference(lang);

  const langData = await fetchLanguageData(lang);
  updateContent(langData);
}

function changeStyle() {
  var lang = localStorage.getItem("language");
  var theme = document.getElementById("theme");
  if (lang === "en") {
    theme.setAttribute("href", "styles/en.css");
  }
  if (lang === "fr") {
    theme.setAttribute("href", "styles/fr.css");
  }
}

function alertMessage1(lang) {
  var message1 = {
    en: "Color name is mandatory!",
    fr: "Le nom de la couleur est obligatoire !",
  };
  alert(message1[lang]);
}

function alertMessage2(lang) {
  var message2 = {
    en: "Color code is not valid!",
    fr: "Le code couleur n'est pas valide !",
  };
  alert(message2[lang]);
}

function placeHolderSearch(lang) {
  //  var input = document.getElementById("searchInput");
  var placeTextSearch = {
    en: "  Search ...",
    fr: "  Cherche ...",
  };
  var lang = localStorage.getItem("language");
  document.getElementById("searchInputId").placeholder = placeTextSearch[lang];
}

function placeHolderColor(lang) {
  //  var input = document.getElementById("searchInput");
  var placeTextColor = {
    en: "*required",
    fr: "*obligatoire",
  };
  var lang = localStorage.getItem("language");
  document.getElementById("colorNameRecq").placeholder = placeTextColor[lang];
}

// Call updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  placeHolderSearch(langData);
  placeHolderColor(langData);
  changeStyle();
});
