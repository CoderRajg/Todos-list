function getupdate() {
  if (document.getElementById("item").value != "") {
    let tit = document.getElementById("item").value;
    let desc = document.getElementById("description").value;
    if (localStorage.getItem("itemsJson") == null) {
      itemsJsonArray = [];
      localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
    } else {
      itemsJsonArraystr = localStorage.getItem("itemsJson");
      itemsJsonArray = JSON.parse(itemsJsonArraystr);
      itemsJsonArray.push([tit, desc]);
      localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
    }
    update();
  }
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemsJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  } else {
    itemsJsonArraystr = localStorage.getItem("itemsJson");
    itemsJsonArray = JSON.parse(itemsJsonArraystr);
  }

  // now we have to add item in table
  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemsJsonArray.forEach((element, index) => {
    str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td>
        </tr> `;
  });
  tableBody.innerHTML = str;
}
let add = document.getElementById("add");
add.addEventListener("click", getupdate);
update();

function deleted(itemIndex) {
  console.log("delete", itemIndex);
  itemsJsonArraystr = localStorage.getItem("itemsJson");
  itemsJsonArray = JSON.parse(itemsJsonArraystr);
  //here we are deleting item from array
  itemsJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  update();
}

function cleared() {
  if (confirm("Do you really want to clear the list?")) {
    localStorage.clear();
    update();
  }
}
