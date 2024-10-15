// read default data from json and store it in localStorage
fetch("./color_default.json")
  .then((response) => response.json())
  .then((data) => {
    const colorString = JSON.stringify(data, null, 2);
    localStorage.setItem("colorData", colorString);
  });

// function to convert hex color code to RGB values and format as json object
function hexRGB() {
  var inp = document.getElementById("code").value;
  const div = document.createElement("div");
  div.style.color = inp;
  const rgbColor = JSON.stringify(div.style.color, null, 2);

  var match = rgbColor.match(
    /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
  );

  var r = match[1];
  var g = match[2];
  var b = match[3];

  return match
    ? {
        rgba: [r, g, b],
      }
    : {};
}

// function for validation if hex color code is valid
function colorValid() {
  var inp = document.getElementById("code").value;
  let Reg_Exp = /(^#[0-9A-F]{8}$)|(^#[0-9A-F]{6}$)/i;

  return Reg_Exp.test(inp);
}

function checkColorName() {
  var colorName = document.getElementById("colorNameRecq").value;
  if (!colorName) {
    var tru = 0;
  } else {
    tru = 1;
  }

  return tru;
}

function changeBoxColor() {
  var box = document.getElementById("rectangle");
  var inpColor = document.getElementById("code").value;
  box.style.background = inpColor;
}

// function to clear whole table before read a new json with data from the form
function clearTable() {
  var table = document.getElementById("dataTable");
  for (var i = 1; i < table.rows.length; i++) {
    var row = table.rows[i];
    var cells = row.cells;
    for (var j = 0; j < cells.length; j++) {
      table.deleteRow(i);
      i--;
      break;
    }
  }
}

//function to add new color data to existing json in localStorage and populate it in table
// before adding to table, color name is checked, color code validity is checked and table content is deleted
function addColor() {
  if (checkColorName() === 0) {
    alert("Color name is mandatory!");
  } else {
    if (colorValid() == false) alert("Color code is not valid");
    else {
      clearTable();

      const form = document.getElementById("addColorForm");
      const formData = new FormData(form);
      const jsonFromForm = {};

      formData.forEach((value, key) => {
        jsonFromForm[key] = value;
      });

      const rgbValue = hexRGB();
      jsonFromForm.code = rgbValue;

      const savedColorData = localStorage.getItem("colorData");
      const colorTable = JSON.parse(savedColorData);
      colorTable.colors.push(jsonFromForm);

      const colorTableString = JSON.stringify(colorTable, null, 2);
      localStorage.setItem("colorData", colorTableString);

      var tableBody = document.getElementById("tableBody");

      colorTable.colors.forEach(function (item) {
        var row = document.createElement("tr");

        var colorCell = document.createElement("td");
        colorCell.textContent = item.color;
        row.appendChild(colorCell);

        var typeCell = document.createElement("td");
        typeCell.textContent = item.type;
        row.appendChild(typeCell);

        var rCell = document.createElement("td");
        rCell.textContent = item.code.rgba[0];
        row.appendChild(rCell);

        var gCell = document.createElement("td");
        gCell.textContent = item.code.rgba[1];
        row.appendChild(gCell);

        var bCell = document.createElement("td");
        bCell.textContent = item.code.rgba[2];
        row.appendChild(bCell);

        tableBody.appendChild(row);
      });
    }
  }
}
