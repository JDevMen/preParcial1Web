var data = "./data.json";

let array = [];
let table = document.getElementById("table").getElementsByTagName("tbody")[0];

fetch(data)
  .then((res) => res.json())
  .then((resp) => {
    array = resp;

    array.forEach((contenido) => {
      let newRow = table.insertRow();
      let cell2 = newRow.insertCell();
      let cell3 = newRow.insertCell();
      let cell4 = newRow.insertCell();
      let cell5 = newRow.insertCell();
      let cell6 = newRow.insertCell();
      let cell7 = newRow.insertCell();

      cell2.innerHTML = contenido.last_name;
      cell3.innerHTML = contenido.first_name;
      cell4.innerHTML = contenido.email;
      cell5.outerHTML = `<td><img src ="${contenido.photo}"></img></td>`;
      cell6.outerHTML =
        "<td> <button type='button' class='btn btn-warning' onClick='makeRowEditable(this)'> Editar </button> </td> ";
      cell7.outerHTML =
        "<td> <button type='button' class='btn btn-danger' onclick='deleteRow(this)' value='Delete'> Eliminar </button> </td> ";
    });
  });

function sortTable(n) {
  var rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

let lastName = document.getElementById("lastName");
lastName.addEventListener("click", () => {
  sortTable(0);
});

let firstName = document.getElementById("firstName");

firstName.addEventListener("click", () => {
  sortTable(1);
});

let email = document.getElementById("email");

email.addEventListener("click", () => {
  sortTable(2);
});

let photo = document.getElementById("photo");

photo.addEventListener("click", () => {
  sortTable(3);
});

const addForm = document.forms["add"];

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newLast = addForm.querySelector('input[id="lastNameForm"]').value;
  const newFirst = addForm.querySelector('input[id="firstNameForm"]').value;
  const newEmail = addForm.querySelector('input[id="emailForm"]').value;
  const newPhoto = addForm.querySelector('input[id="photoForm"]').value;

  //   var jsonObject = `{"last_name":"${newLast}","first_name":"${newFirst}","email":"${newEmail}","photo":"${newPhoto}"}`;
  //   var json = JSON.parse(jsonObject);

  let newRow = table.insertRow();
  let cell2 = newRow.insertCell();
  let cell3 = newRow.insertCell();
  let cell4 = newRow.insertCell();
  let cell5 = newRow.insertCell();
  let cell6 = newRow.insertCell();
  let cell7 = newRow.insertCell();

  cell2.innerHTML = newLast;
  cell3.innerHTML = newFirst;
  cell4.innerHTML = newEmail;
  cell5.outerHTML = `<td><img src ="${newPhoto}"></img></td>`;
  cell6.outerHTML =
    "<td> <button type='button' class='btn btn-warning' onClick='makeRowEditable(this)'> Editar </button> </td>";
  cell7.outerHTML =
    "<td> <button type='button' class='btn btn-danger' onclick='deleteRow(this)' value='Delete'> Eliminar </button> </td>";

  addForm.reset();
});

function deleteRow(row) {
  var d = row.parentNode.rowIndex;
  console.log(d);
  table.deleteRow(d);
}

function makeRowEditable(row) {
  var d = row.parentNode.parentNode.rowIndex - 1;
  var r = table.rows[d];
  var cells = r.cells;

  for (var i = 0; i < cells.length - 2; i++) {
    let editable = cells[i].getAttribute("contenteditable");
    if (editable != null) {
      editable = editable.toLowerCase() === "true";
      if (editable) {
        cells[i].setAttribute("contenteditable", false);
      } else {
        cells[i].setAttribute("contenteditable", true);
      }
    } else {
      cells[i].setAttribute("contenteditable", true);
    }
    editable = cells[i].getAttribute("contenteditable");
  }

  if (cells[0].getAttribute("contenteditable") != null) {
    let editable = cells[0].getAttribute("contenteditable") === "true";
    if (editable) {
      cells[4].innerHTML =
        "<td> <button type='button' class='btn btn-warning' onClick='makeRowEditable(this)'> Editando </button> </td>";
    } else {
      cells[4].innerHTML =
        "<td> <button type='button' class='btn btn-warning' onClick='makeRowEditable(this)'> Editar</button> </td>";
    }
  } else {
    cells[4].outerHTML =
      "<td> <button type='button' class='btn btn-warning' onClick='makeRowEditable(this)'> Editando </button> </td>";
  }
}

let eliminarTabla = document.getElementById("autodestruccion");

eliminarTabla.addEventListener("click", () => {
  table.remove();
});
