/***************************
 * firestore.js
 ***************************/

/**
 * Listen for real-time updates to the given user's shopping list.
 * Calls `callback(items)` with an array of item objects whenever the list changes.
 */
function subscribeToShoppingList(userUID, callback) {
  // We assume 'db' is globally available (from your firebase initialization)
  // e.g., db = firebase.firestore();
  db.collection("users")
    .doc(userUID)
    .collection("shoppingList")
    .orderBy("createdAt", "desc") // Sort by creation time (newest first)
    .onSnapshot((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      callback(items);
    });
}

/**
 * Check if an item with the same name already exists in the user's shopping list
 *
 * @param {string} userUID - The user's UID
 * @param {string} itemName - The name of the item to check
 * @returns {Promise<boolean>} - A promise that resolves to true if item exists, false otherwise
 */
function checkItemExists(userUID, itemName) {
  // Normalize the item name (lowercase and trim whitespace)
  const normalizedName = itemName.toLowerCase().trim();

  return db
    .collection("users")
    .doc(userUID)
    .collection("shoppingList")
    .where("normalizedName", "==", normalizedName)
    .get()
    .then((querySnapshot) => {
      return !querySnapshot.empty; // Returns true if the item exists
    });
}

/**
 * Add a new item to the user's shopping list in Firestore.
 * Prevents duplicates by adding a normalized version of the name.
 *
 * @param {string} userUID - User's UID
 * @param {string} itemName - Item name to add
 * @returns {Promise} - Promise that resolves when the item is added
 */
function addItem(userUID, itemName) {
  // Trim the item name and create a normalized (lowercase) version for comparison
  const trimmedName = itemName.trim();
  const normalizedName = trimmedName.toLowerCase();

  // First check if this item already exists
  return checkItemExists(userUID, itemName).then((exists) => {
    if (exists) {
      // Item already exists, return a rejected promise
      console.log(`Item "${itemName}" already exists in shopping list`);
      return Promise.reject(new Error("Duplicate item"));
    } else {
      // Item doesn't exist, add it with normalized name for future comparisons
      return db
        .collection("users")
        .doc(userUID)
        .collection("shoppingList")
        .add({
          name: trimmedName,
          normalizedName: normalizedName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
  });
}

/**
 * Remove an item from the user's shopping list in Firestore by doc ID.
 */
function removeItem(userUID, itemID) {
  return db
    .collection("users")
    .doc(userUID)
    .collection("shoppingList")
    .doc(itemID)
    .delete();
}

/**
 * Clear all items from a user's shopping list.
 */
function clearShoppingList(userUID) {
  // Reference all documents in user's shoppingList subcollection
  const listRef = db
    .collection("users")
    .doc(userUID)
    .collection("shoppingList");

  // Get all documents, then batch-delete them
  listRef
    .get()
    .then((snapshot) => {
      const batch = db.batch();
      snapshot.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });
      // Commit the batch
      return batch.commit();
    })
    .then(() => {
      console.log("All items removed!");
    })
    .catch((err) => {
      console.error("Error clearing list:", err);
    });
}
