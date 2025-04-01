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
            currentUser.onSnapshot(userDoc => {
                if (userDoc.exists) {
                    $("#overlay").hide();
                    let bookmarks = userDoc.data().bookmarks || [];
                    displayCardsDynamically(bookmarks);
                    displayDealPopupsDynamically(bookmarks);
                }
            });
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

function displayCardsDynamically(bookmarks) {
    let cardTemplate = document.getElementById("dealCardTemplate"); 
    let itemContainer = document.getElementById("deals-go-here"); 
    itemContainer.innerHTML = ""; // Clear previous content

    if (bookmarks.length === 0) {
        itemContainer.innerHTML = "<p>No saved deals found.</p>";
        return;
    }

    let i = 1;  // Optional: Unique ID counter

    bookmarks.forEach(dealID => {
        db.collection("deals").doc(dealID).get().then(doc => {
            if (doc.exists) {
                let data = doc.data();
                let newcard = cardTemplate.content.cloneNode(true);

                // Populate card details
                newcard.querySelector('.card-item').innerHTML = data.name;
                newcard.querySelector('.card-deal').innerHTML = data.deal;
                newcard.querySelector('.card-price').innerHTML = `$${data.price}`;
                newcard.querySelector('.card-end-date').innerHTML = data.endDate;
                newcard.querySelector('.card-retailer').innerHTML = data.retailer;
                newcard.querySelector('.card-image').src = `./images/items/${data.code}`;

                // Assign a unique ID to the card
                let cardElement = newcard.querySelector(".card");
                if (cardElement) {
                    cardElement.setAttribute("id", doc.id);
                    cardElement.classList.add(doc.id);
                }

                // Append to gallery
                itemContainer.appendChild(newcard);
                i++;

                // Click handlers for popups
                $('.card').click(function () {
                    var theClass = $(this).attr('id');
                    $(`#popup_${theClass}`).show();
                });
                $(".card").click(function () {
                    $("#overlay").show();
                    $("#deals-popup-here").show();
                });
            }
        }).catch(error => console.error("Error loading deal:", error));
    });
}


function displayDealPopupsDynamically(bookmarks) {
    let popupTemplate = document.getElementById("dealPopupTemplate");
    let popupContainer = document.getElementById("deals-popup-here");
    
    if (!popupContainer) {
        console.error("Error: Element 'deals-popup-here' not found in the DOM.");
        return;
    }
    
    popupContainer.innerHTML = ""; // Clear previous popups

    if (!popupTemplate) {
        console.error("Error: Template 'dealPopupTemplate' not found.");
        return;
    }
    
    if (bookmarks.length === 0) {
        popupContainer.innerHTML = "<p>No saved deal popups found.</p>";
        return;
    }
    
    bookmarks.forEach(dealID => {
        db.collection("deals").doc(dealID).get().then(doc => {
            if (doc.exists) {
                let data = doc.data();
                let newPopup = popupTemplate.content.cloneNode(true);

                // Populate popup details
                newPopup.querySelector('.card-description').innerHTML = data.description;
                newPopup.querySelector('.card-item').innerHTML = data.name;
                newPopup.querySelector('.card-deal').innerHTML = data.deal;
                newPopup.querySelector('.card-price').innerHTML = `$${data.price}`;
                newPopup.querySelector('.card-brand').innerHTML = data.brand;
                newPopup.querySelector('.card-end-date').innerHTML = data.endDate;
                newPopup.querySelector('.card-retailer').innerHTML = `<a href="${data.retailerURL}" target="_blank">${data.retailer}</a>`;
                newPopup.querySelector('.card-image-popup').src = `./images/items/${data.code}`;
                
                let popupElement = newPopup.querySelector(".popup");
                if (popupElement) {
                    popupElement.setAttribute("id", "popup_" + doc.id);
                    popupElement.style.display = 'none';
                }

                // Bookmark handling
                let bookmarkIcon = newPopup.querySelector('.saveDealButton');
                if (bookmarkIcon) {
                    bookmarkIcon.id = 'save-' + doc.id;
                    bookmarkIcon.onclick = () => saveBookmark(doc.id);

                    currentUser.get().then(userDoc => {
                        var userBookmarks = userDoc.data().bookmarks;
                        if (userBookmarks.includes(doc.id)) {
                            bookmarkIcon.innerText = 'favorite';
                        }
                    });
                }

                popupContainer.appendChild(newPopup);
                 // Close popup logic
                $(".btn-close").click(function () {
                    $("#deals-popup-here").hide();
                    $("#overlay").hide();
                    $(".popup").hide();
                });
            }
        }).catch(error => console.error("Error loading deal popup:", error));
    });

   
}

function saveBookmark(dealDocID) {
    let iconID = 'save-' + dealDocID;
    let bookmarkIcon = document.getElementById(iconID);

    currentUser.get().then(userDoc => {
        if (userDoc.exists) {
            let bookmarks = userDoc.data().bookmarks || [];

            if (bookmarks.includes(dealDocID)) {
                // If the deal is already bookmarked, remove it
                currentUser.update({
                    bookmarks: firebase.firestore.FieldValue.arrayRemove(dealDocID)
                }).then(() => {
                    console.log("Bookmark removed for " + dealDocID);
                    bookmarkIcon.innerText = 'favorite_border'; // Change icon to unbookmarked
                }).catch(error => {
                    console.error("Error removing bookmark: ", error);
                });
            } else {
                // If the deal is not bookmarked, add it
                currentUser.update({
                    bookmarks: firebase.firestore.FieldValue.arrayUnion(dealDocID)
                }).then(() => {
                    console.log("Bookmark saved for " + dealDocID);
                    bookmarkIcon.innerText = 'favorite'; // Change icon to bookmarked
                }).catch(error => {
                    console.error("Error adding bookmark: ", error);
                });
            }
        }
    }).catch(error => {
        console.error("Error getting user document: ", error);
    });
}