const switchLanguage = (code) => {
  const languages = {
    fr: {
      colorText: "Colour",
      tableName: "Nom",
      tableType: "Type",
    },
    en: {
      colorText: "Color",
      tableName: "Name",
      tableType: "Type",
    },
  };
  for (let lang of Object.keys(languages["fr"])) {
    document.querySelector(`.${lang}`).innerText = languages[code][lang];
  }
};

document.querySelector("#language").addEventListener("change", function () {
  switchLanguage(this.value);
});
