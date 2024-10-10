fetch("./color_default.json")
  .then((response) => response.json())
  .then((data) => {
    const colorString = JSON.stringify(data, null, 2);
    localStorage.setItem("colorData", colorString);
  });

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

  if (r < 0 || r > 255) alert("r is out of bounds; " + r);
  if (g < 0 || g > 255) alert("g is out of bounds; " + g);
  if (b < 0 || b > 255) alert("b is out of bounds; " + b);

  return match
    ? {
        rgba: [r, g, b],
      }
    : {};
}

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

function addColor() {
  clearTable();

  const form = document.getElementById("myForm");
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
