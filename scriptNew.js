let itemForm = document.getElementById("item-form");

let itemInput = document.getElementById("item-input");

let itemList = document.getElementById("item-list");
let clearBtn = document.getElementById("clear");
let filterItems = document.getElementById("filter");

// Create list item function
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate input
  if (itemInput.value === "") {
    alert("Please add an item!");
    return;
  }

  const button = createButton("remove-item btn-link text-red");

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(button);

  localStorage.setItem(`${newItem}`, `${li.innerHTML}`);

  const liStored = localStorage.getItem(`${newItem}`);

  li.createTextNode = `${liStored}`;
  itemList.appendChild(li);

  checkUI();
  console.log(itemInput);
  itemInput.value = "";
}

// Create button function
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// Create icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// Function remove item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
    localStorage.removeItem(
      `${e.target.parentElement.parentElement.innerText}`
    );
  }
  checkUI();
}

// Clear All
function clearItems() {
  if (itemList.firstChild) {
    const list = itemList.querySelectorAll("li");
    list.forEach((item) => item.remove());
  }
  localStorage.clear();
  checkUI();
}

//Check UI function
function checkUI() {
  const checkStorage = Object.keys(localStorage);

  if (checkStorage.length == itemList.querySelectorAll("li").length) {
    console.log("works");
  } else {
    console.log(itemList.querySelectorAll("li").length);
    refreshWindow();
  }
  if (itemList.querySelector("li") === null) {
    clearBtn.style.display = "none";
    filterItems.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filterItems.style.display = "block";
  }
}

// Create new LI from the storage values

function refreshWindow() {
  const localStorageKeys = Object.keys(localStorage);

  if (localStorageKeys.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let li = document.createElement("li");
      let liValue = localStorage.getItem(`${localStorageKeys[i]}`);

      li.innerHTML = `${liValue}`;

      itemList.appendChild(li);
    }
  }
}

/*
// Filter items function ver1
function filterItemsList(e) {
  const arr = itemList.querySelectorAll("li");
  let search = e.target.value.toLocaleLowerCase();
  let newArr = [];
  let newArr2 = [];
  let test;

  for (let i = 0; i < arr.length; i++) {
    newArr.push(itemList.querySelector(`li:nth-child(${i + 1})`));
    newArr2.push(newArr[i].innerText.toLocaleLowerCase());
  }

  test = newArr2.indexOf(search);
  console.log(test);
  if (test !== -1) {
    findResult(test);
  }

  if (search === "") {
    let li = itemList.querySelectorAll("li");
    li.forEach((item) => (item.style.display = "flex"));
  }
}
*/

/*
// Function find result
function findResult(search) {
  let li = itemList.querySelectorAll("li");
  li.forEach((item) => (item.style.display = "none"));
  itemList.querySelector(`li:nth-child(${search + 1})`).style.display = "flex";
}
*/

// Filter function ver2

function filterItemsNew(e) {
  const search = e.target.value.toLocaleLowerCase();
  const liItems = document.querySelectorAll("li");

  liItems.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();
    if (itemName.indexOf(search) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

/*
//
// Test function
//

function testFunction() {
  let newItem2 = itemInput2.value;
  console.log(newItem2);

  const button2 = createButton("remove-item btn-link text-red");

  const li1 = document.createElement("li");
  li1.appendChild(document.createTextNode(newItem2));
  li1.appendChild(button2);
  itemList.appendChild(li1);

  localStorage.setItem(`${newItem2}`, `${li1.outerHTML}`);

  //itemList.appendChild(localStorage.getItem(`${newItem2}.textContent`));

  console.log(localStorage.getItem(`${newItem2}`));
  let htmlT = localStorage.getItem(`${newItem2}`);
  li1.appendChild(htmlT);
  itemList.appendChild(li1);
}
*/

// Function check edit mode

function checkEdit(e) {
  if (e.target.classList.contains("fa-solid")) {
    btnSubmitMode();
  } else {
    const itemToEdit = e.target;
    btnEditMode(itemToEdit);
  }
}

// Function button edit mode
function btnEditMode(item) {
  changeId();

  const editBtn = document.querySelector("button");
  const itemForm2 = document.getElementById("edit-mode-item-form");
  const itemInput2 = document.getElementById;
  editBtn.className = "btnEdit";
  editBtn.innerText = "Edit item";
  itemInput.value = item.innerText;

  editBtn.addEventListener(
    "click",
    btnSpecificMode(item, itemForm2, itemInput2)
  );
  //
}

// Function inside Button edit mode

function btnSpecificMode(item, form, input) {
  const newValue = itemInput.value;
  const button = createButton("remove-item btn-link text-red");

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newValue));
  li.appendChild(button);
  localStorage.removeItem(`${item}`);
  localStorage.setItem(`${newValue}`, `${li.innerHTML}`);
  const liStored = localStorage.getItem(`${newValue}`);
  li.createTextNode = `${liStored}`;
  itemList.appendChild(li);
}

// Function changinh ID;s

function changeId() {
  let editForm = itemForm;

  let editInput = itemInput;
  let editList = itemList;
  editForm.id = "edit-item-form";
}

// Function button submit mode
function btnSubmitMode() {
  const editBtn = document.querySelector("button");
  editBtn.className = "btn";
  editBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;

  console.log("btn edit mode off");
}

// Event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
filterItems.addEventListener("input", filterItemsNew);

itemList.addEventListener("click", checkEdit);

checkUI();
