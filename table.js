// read data from jason and populate it on first load of the page
function populateTableFirst() {
  fetch("./color_default.json")
    .then((response) => response.json())
    .then((data) => {
      const root = document.getElementById("tableContent");
      data.colors.forEach((element) =>
        root.insertAdjacentHTML(
          "beforebegin",
          `<tr><td>${element.color}</td><td>${element.type}</td><td>${element.code.rgba[0]}</td><td>${element.code.rgba[1]}</td><td>${element.code.rgba[2]}</td></tr>`
        )
      );

      const colorTableString = JSON.stringify(data, null, 2);
      localStorage.setItem("colorData", colorTableString);

      const loadCount = "1";
      localStorage.setItem("pageLoadCount", loadCount);
      //    alert(loadCount);
    });
}

window.addEventListener("load", function () {
  const loadCount = localStorage.getItem("pageLoadCount");
  // alert(loadCount);
  // read data from color_default.json and populate it in tableContent on first page load

  if (loadCount === null) {
    populateTableFirst();
  }
  // next page load calls only populateTable with data from localStorage
  if (loadCount === "1") {
    populateTable();
  }
});
