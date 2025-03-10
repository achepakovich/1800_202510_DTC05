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
    .onSnapshot((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      callback(items);
    });
}

/**
 * Add a new item to the user's shopping list in Firestore.
 */
function addItem(userUID, itemName) {
  return db.collection("users").doc(userUID).collection("shoppingList").add({
    name: itemName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    // or you can just store new Date()
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

function clearShoppingList(userUID) {
  // Reference all documents in user’s shoppingList subcollection
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
