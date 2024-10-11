// read data from color_default.json and populate it in tableContent
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
  });
