// function to filter table based on searchInput string, searching in 1st column
function tableFilter() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInputId");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  var filterString = document.getElementById("searchInputId").value;
  localStorage.setItem("filterInput", filterString);
  //  const filterString1 = localStorage.getItem("filterInput");
  //  alert(filterString1);
}

function filterLoad() {
  var filterString = localStorage.getItem("filterInput");
  if (filterString) {
    document.getElementById("searchInputId").value = filterString;
    tableFilter();
    //  alert(filterString);
  }
}
