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

  // When user clicks "Add Item"
  addItemBtn.addEventListener("click", () => {
    const name = itemInput.value.trim();
    const user = firebase.auth().currentUser; // v8 style
    if (user && name) {
      addItem(user.uid, name).then(() => {
        itemInput.value = "";
      });
    }
  });
}

/**
 * Renders the array of items into <ul id="shoppingList"> in the DOM.
 * Called whenever Firestore changes the list.
 */
function renderShoppingList(items) {
  const shoppingListEl = document.getElementById("shoppingList");

  // Clear existing
  shoppingListEl.innerHTML = "";

  // For each item doc
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = " X ";
    removeBtn.style.marginLeft = "10px";
    removeBtn.addEventListener("click", () => {
      const user = firebase.auth().currentUser;
      if (user) {
        removeItem(user.uid, item.id);
      }
    });

    li.appendChild(removeBtn);
    shoppingListEl.appendChild(li);
  });
}
