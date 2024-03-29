const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

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

// Filter items
function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
