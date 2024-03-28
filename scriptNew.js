const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterItems = document.getElementById("filter");

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
  itemList.appendChild(li);
  checkUI();
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
  }
}

// Clear All
function clearItems() {
  if (itemList.firstChild) {
    const list = itemList.querySelectorAll("li");
    list.forEach((item) => item.remove());
  }
  checkUI();
}

//Check UI function
function checkUI() {
  if (itemList.querySelector("li") === null) {
    clearBtn.style.display = "none";
    filterItems.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filterItems.style.display = "block";
  }
}

// Filter items function
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

// Function find result
function findResult(search) {
  let li = itemList.querySelectorAll("li");
  li.forEach((item) => (item.style.display = "none"));
  itemList.querySelector(`li:nth-child(${search + 1})`).style.display = "flex";
}

// Event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
filterItems.addEventListener("input", filterItemsList);
