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

// function to change style for each language
function changeStyle() {
  var lang = localStorage.getItem("language");
  var theme = document.getElementById("theme");
  if (lang === "en") {
    theme.setAttribute("href", "styles/en.css");
  }
  if (lang === "fr") {
    theme.setAttribute("href", "styles/fr.css");
  }
  if (lang === null) {
    theme.setAttribute("href", "styles/en.css");
  }
}

// alert message 1 translation
function alertMessage1(lang) {
  var message1 = {
    en: "Color name is mandatory!",
    fr: "Le nom de la couleur est obligatoire !",
  };
  alert(message1[lang || "en"]);
}

// alert message 2 translation
function alertMessage2(lang) {
  var message2 = {
    en: "Color code is not valid!",
    fr: "Le code couleur n'est pas valide !",
  };
  alert(message2[lang || "en"]);
}

//placeholder 1 translation
function placeHolderSearch() {
  var placeTextSearch = {
    en: "  Search ...",
    fr: "  Cherche ...",
  };
  var lang = localStorage.getItem("language") || "en";
  document.getElementById("searchInputId").placeholder = placeTextSearch[lang];
}

//placeholder 2 translation
function placeHolderColor() {
  var placeTextColor = {
    en: "*required",
    fr: "*obligatoire",
  };
  var lang = localStorage.getItem("language") || "en";
  document.getElementById("colorNameRecq").placeholder = placeTextColor[lang];
}

// Call updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  placeHolderSearch();
  placeHolderColor();
  changeStyle();
});
