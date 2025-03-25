/***************************
 * ui.js
 ***************************/

/**
 * Initialize UI event listeners.
 *   - The "Add Item" button
 *   - Possibly other UI elements
 */
function initUI() {
  const addItemBtn = document.getElementById("addItemBtn");
  const itemInput = document.getElementById("itemInput");
  const recommendedItems = document.querySelectorAll(".recommended-item"); // Select all recommended item buttons

  // When user clicks "Add Item" (text input)
  addItemBtn.addEventListener("click", () => {
    const name = itemInput.value.trim();
    const user = firebase.auth().currentUser;
    if (user && name) {
      addItem(user.uid, name).then(() => {
        itemInput.value = "";
      });
    }
  });

  // Attach click listeners to recommended item buttons
  recommendedItems.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.dataset.item; // Get the item name from the data attribute
      const user = firebase.auth().currentUser;
      if (user) {
        addItem(user.uid, itemName); // Call addItem with user's UID and item name
      }
    });
  });
}

/**
 * Counts the number of deals for a specific item
 * @param {string} itemName - The name of the item to count deals for
 * @returns {Promise<number>} - A promise that resolves to the count of deals
 */
function countDealsForItem(itemName) {
  return db
    .collection("deals")
    .where("itemName", "==", itemName)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.size; // Returns the number of documents that match
    })
    .catch((error) => {
      console.error("Error counting deals:", error);
      return 0; // Return 0 if there's an error
    });
}

/**
 * Get the appropriate icon path for an item
 * Maps item names to their respective icon paths
 */
function getItemIconPath(itemName) {
  // Normalize the item name (lowercase and trim)
  const normalizedName = itemName.toLowerCase().trim();

  // Map of item names to icon paths
  const iconMap = {
    apples: "images/shoppingListIcons/apple.png",
    apple: "images/shoppingListIcons/apple.png",
    bacon: "images/shoppingListIcons/bacon.png",
    bananas: "images/shoppingListIcons/bananas.png",
    banana: "images/shoppingListIcons/bananas.png",
    bread: "images/shoppingListIcons/bread.png",
    breads: "images/shoppingListIcons/breads.png",
    broccoli: "images/shoppingListIcons/broccoli.png",
    butter: "images/shoppingListIcons/butter.png",
    cereals: "images/shoppingListIcons/cereal.png",
    cereal: "images/shoppingListIcons/cereal.png",
    cheese: "images/shoppingListIcons/cheese.png",
    chicken: "images/shoppingListIcons/chicken.png",
    chickens: "images/shoppingListIcons/chicken.png",
    cucumbers: "images/shoppingListIcons/cucumber.png",
    cucumber: "images/shoppingListIcons/cucumber.png",
    eggs: "images/shoppingListIcons/eggs.png",
    egg: "images/shoppingListIcons/eggs.png",
    lettuce: "images/shoppingListIcons/lettuce.png",
    milk: "images/shoppingListIcons/milk.png",
    "ice cream": "images/shoppingListIcons/sad-ice-cream-new.png",
    "toilet paper": "images/shoppingListIcons/toilet_paper.png",
    tomatoes: "images/shoppingListIcons/tomato.png",
    tomato: "images/shoppingListIcons/tomato.png",
    yogurt: "images/shoppingListIcons/yogurt.png",
    beef: "images/shoppingListIcons/beef.png",
    salmon: "images/shoppingListIcons/salmon.png",
    strawberries: "images/shoppingListIcons/strawberry.png",
    strawberry: "images/shoppingListIcons/strawberry.png",
    oranges: "images/shoppingListIcons/orange.png",
    orange: "images/shoppingListIcons/orange.png",
    peppers: "images/shoppingListIcons/pepper.png",
    pepper: "images/shoppingListIcons/pepper.png",
  };

  // Return the icon path if it exists, or a default icon if not
  return iconMap[normalizedName] || "images/shoppingListIcons/default-item.png";
}

function renderShoppingList(items) {
  const shoppingListEl = document.getElementById("shoppingList");

  // Clear existing content
  shoppingListEl.innerHTML = "";

  // Create table if it doesn't exist
  if (!document.getElementById("shopping-table")) {
    // Create table elements
    const table = document.createElement("table");
    table.id = "shopping-table";
    table.className = "table table-striped";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const thItem = document.createElement("th");
    thItem.textContent = "Item";

    const thDeals = document.createElement("th");
    thDeals.textContent = "Available Deals";

    const thAction = document.createElement("th");
    thAction.textContent = "Remove";

    headerRow.appendChild(thItem);
    headerRow.appendChild(thDeals);
    headerRow.appendChild(thAction);
    thead.appendChild(headerRow);

    // Create table body
    const tbody = document.createElement("tbody");
    tbody.id = "shopping-table-body";

    // Append elements to the table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append table to the shopping list element
    shoppingListEl.appendChild(table);
  }

  const tableBody =
    document.getElementById("shopping-table-body") || shoppingListEl;

  // Clear the table body
  tableBody.innerHTML = "";

  // For each item doc, create a row with item name and get deal count
  items.forEach((item) => {
    const row = document.createElement("tr");

    // Item name cell
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    // Deals count cell with loading indicator
    const dealsCell = document.createElement("td");
    dealsCell.textContent = "Loading...";

    // Action cell with remove button
    const actionCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-sm btn-danger removeButton";
    removeBtn.innerHTML = "&times;"; // × symbol

    removeBtn.addEventListener("click", () => {
      const user = firebase.auth().currentUser;
      if (user) {
        removeItem(user.uid, item.id);
      }
    });

    actionCell.appendChild(removeBtn);

    // Append cells to row
    row.appendChild(nameCell);
    row.appendChild(dealsCell);
    row.appendChild(actionCell);

    // Append row to table body
    tableBody.appendChild(row);

    // Get and update the deals count
    countDealsForItem(item.name).then((count) => {
      // Create the proper icon for the item
      const iconPath = getItemIconPath(item.name);

      // Create HTML for the deal count with icon
      if (count > 0) {
        dealsCell.classList.add("text-success");

        // Create a clickable element with icon for the deals count
        dealsCell.innerHTML = `
          <a href="search.html?item=${encodeURIComponent(
            item.name
          )}" class="deals-link">
            ${count} 
            <img src="${iconPath}" alt="${
          item.name
        }" class="item-icon" width="20" height="20">
          </a>`;

        // Add tooltip to indicate clickability
        dealsCell.setAttribute("title", `View all deals for ${item.name}`);
      } else {
        dealsCell.classList.add("text-muted");
        dealsCell.innerHTML = `
          ${count}
          <img src="${iconPath}" alt="${item.name}" class="item-icon-gray" width="20" height="20">
        `;
      }
    });
  });
}

// Event listener for clearing the shopping list
document.getElementById("clearList").addEventListener("click", () => {
  const user = firebase.auth().currentUser;
  if (user) {
    clearShoppingList(user.uid);
  }
});
