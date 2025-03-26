//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
var currentUser;

// Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); // Global reference
            insertNameFromFirestore(user);
            console.log(currentUser);

            getBookmarks(user);  // Retrieve and display the user's bookmarks
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";  // Redirect to login page
        }
    });
}
doAll();

//----------------------------------------------------------
// Wouldn't it be nice to see the User's Name on this page?
// Let's do it!  (Thinking ahead:  This function can be carved out, 
// and put into script.js for other pages to use as well).
//----------------------------------------------------------//----------------------------------------------------------
function insertNameFromFirestore(user) {
    db.collection("users").doc(user.uid).get().then(userDoc => {
        console.log(userDoc.data().name);
        let userName = userDoc.data().name;
        document.getElementById("name-goes-here").innerHTML = userName;
    });
}
//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getBookmarks(user) {
    let itemContainer = document.getElementById("bookmarks-here");
    itemContainer.innerHTML = ""; // Clear existing content

    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            let bookmarks = userDoc.data().bookmarks || [];

            if (bookmarks.length === 0) {
                itemContainer.innerHTML = "<p>No saved deals found.</p>";
                return;
            }

            let newcardTemplate = document.getElementById("dealsCardTemplate");
            console.log(bookmarks)
            bookmarks.forEach(thisItemID => {
                db.collection("deals").doc(thisItemID).get().then(doc => {
                    if (doc.exists) {
                        let data = doc.data();
                        let newcard = newcardTemplate.content.cloneNode(true);

                        newcard.querySelector('.card-title').innerHTML = data.name;
                        newcard.querySelector('.card-price').innerHTML = `$${data.price}`;
                        newcard.querySelector('.card-deal').innerHTML = data.deal;
                        newcard.querySelector('.card-retailer').innerHTML =
                            `Retailer: <a href="${data.retailerURL}" target="_blank">${data.retailer}</a>`;
                        newcard.querySelector('.card-end-date').innerHTML = `Deal ends: ${data.endDate}`;
                        newcard.querySelector('.card-image').src = `./images/items/${data.code}`;


                        itemContainer.appendChild(newcard);
                    }
                });
            });
        })
        .catch(error => console.error("Error loading bookmarks:", error));
}
