//Global variable pointing to the current user's Firestore document
var currentUser;

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            console.log(currentUser);


            displayCardsDynamically("deals");
            displayDealPopupsDynamically("deals");
            reply_click();
            saveItem();
            closeDeal();
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();

function writeDeals() {
    //define a variable for the collection you want to create in Firestore to populate data
    var dealsRef = db.collection("deals");

    dealsRef.add({ name: "Roma Tomatoes", itemName: "Tomatoes", deal: "Save $0.13", price: 0.55, pricedByWeight: true, brand: "N/A", retailer: "Loblaws", endDate: "03/12/2025", UPC: "00000000004087", code: "00000000004087.jpg" });
    dealsRef.add({ name: "Celery Bunch", itemName: "Celery", deal: "Save $1.13", price: 4.45, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004070", code: "00000000004070.jpg" });
    dealsRef.add({ name: "Carrots", itemName: "Carrots", deal: "Save $1.13", price: 0.66, pricedByWeight: true, brand: "N/A", retailer: "Superstore", endDate: "03/25/2025", UPC: "00000000004562", code: "00000000004562.jpg" });
    dealsRef.add({ name: "Bell Peppers - Red", itemName: "Peppers", deal: "Save $1.13", price: 2.98, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004688", code: "00000000004688.jpg" });
    dealsRef.add({ name: "Yellow Onions", itemName: "Onions", deal: "Save $1.13", price: 1.86, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004093", code: "00000000004093.jpg" });
    dealsRef.add({ name: "Red Onions", itemName: "Onions", deal: "Save $1.13", price: 2.58, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004082", code: "00000000004082.jpg" });
    dealsRef.add({ name: "Russet Potatoes", itemName: "Potatoes", deal: "Save $1.13", price: 1.9, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004072", code: "00000000004072.jpg" });
    dealsRef.add({ name: "Anaheim Peppers", itemName: "Peppers", deal: "Save $1.13", price: 0.25, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004677", code: "00000000004677.jpg" });
    dealsRef.add({ name: "Maple Leaf - Prime Chicken Breasts, Boneless Skinless, 1 Each", itemName: "Chicken", deal: "Save $1.13", price: 20.0, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00777262503609", code: "00777262503609.jpg" });
    dealsRef.add({ name: "Lilydale Boneless Skinless Thighs Value Pack, 10-14 pieces per tray, 1.06 - 1.44 kg", itemName: "Chicken", deal: "Save $1.13", price: 25.89, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00222650000005", code: "00222650000005.jpg" });
    dealsRef.add({ name: "Maple Leaf Fresh Boneless Pork Chops Center and Rib End, Combo Pack 9 Pieces, 1.00 - 1.35 kg", itemName: "Pork Chops", deal: "Save $1.13", price: 16.17, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00221372000003", code: "00221372000003.jpg" });
    dealsRef.add({ name: "Dempster's - White Bread, 570 Gram", itemName: "Bread", deal: "Buy one get one", price: 4.99, pricedByWeight: false, brand: "Dempster's", retailer: "Choices Markets", endDate: "04/25/2025", UPC: "00068721022336", code: "00068721022336.jpg" })
    dealsRef.add({ name: "Dempster's - Honey & Oatmeal Bread, 600 Gram", itemName: "Bread", deal: "Save $1.00", price: 5.49, pricedByWeight: false, brand: "Dempster's", retailer: "Superstore", endDate: "05/25/2025", UPC: "00068721902492", code: "00068721902492.jpg" })
    dealsRef.add({ name: "Dempster's - Extra Crisp English Muffins, 6 Each", itemName: "Bread", deal: "Buy one get one", price: 4.50, pricedByWeight: false, brand: "Dempster's", retailer: "walmart", endDate: "04/26/2025", UPC: "00068721192114", code: "00068721192114.jpg" })
    dealsRef.add({ name: "Terra Breads - French Baguette, 300 Gram", itemName: "Bread", deal: "Buy one get one", price: 4.99, pricedByWeight: false, brand: "Terra Bread's", retailer: "Save-On-Foods", endDate: "04/27/2025", UPC: "00779324000507", code: "00779324000507.jpg" })
    dealsRef.add({ name: "King's Hawaiian - Hawaiian Sweet Roll (Slider Buns) - Original, 12 Each", itemName: "Bread", deal: "Buy one get one", price: 5.49, pricedByWeight: false, brand: "King's Hawaiian", retailer: "Save-On-Foods", endDate: "04/27/2025", UPC: "00073435080701", code: "00073435080701.jpg" })
    dealsRef.add({ name: "D Italiano - Brizzolio Sausage Buns, 6 Each", itemName: "Bread", deal: "Save $1.50", price: 4.49, pricedByWeight: false, brand: "D Italiano", retailer: "Superstore", endDate: "04/27/2025", UPC: "00063400059498", code: "00063400059498.jpg" })
    dealsRef.add({ name: "Dempster's - Signature The Classic Burger Buns, 8 Each", itemName: "Bread", deal: "Buy one get one", price: 5.49, pricedByWeight: false, brand: "Dempster's", retailer: "Save-On-Foods", endDate: "04/23/2025", UPC: "00068721300151", code: "00068721300151.jpg" })
}

db.collection("deals").get().then((querySnapshot) => {
    if (querySnapshot.size == 0) {
        writeDeals();
    }
})

function writeFavouriteDeals() {
    //define a variable for the collection you want to create in Firestore to populate data
    var dealsRef = db.collection("favourites");

    // dealsRef.add({
    //     name: "Spaghetti Pasta 16.00 oz",
    //     brand: "Barilla",
    //     type: "30% off",
    //     price: "$1.97",
    //     saved: "false",
    //     retailer: "No Frills", //replace with your own city?
    //     startDate: "3/5/2025",
    //     endDate: "4/5/2025",
    //     code: "https://product-images.metro.ca/images/h50/ha5/9530112049182.jpg",
    //     UPC: "076808280081",
    //     last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    // });

    dealsRef.add({ name: "Roma Tomatoes", deal: "Save $0.13", price: 0.55, pricedByWeight: true, brand: "N/A", retailer: "Loblaws", endDate: "03/12/2025", UPC: "00000000004087", code: "00000000004087.jpg" });
    dealsRef.add({ name: "Celery Bunch", deal: "Save $1.13", price: 4.45, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004070", code: "00000000004070.jpg" });
    dealsRef.add({ name: "Carrots", deal: "Save $1.13", price: 0.66, pricedByWeight: true, brand: "N/A", retailer: "Superstore", endDate: "03/25/2025", UPC: "00000000004562", code: "00000000004562.jpg" });
    dealsRef.add({ name: "Bell Peppers - Red", deal: "Save $1.13", price: 2.98, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004688", code: "00000000004688.jpg" });
}

db.collection("favourites").get().then((querySnapshot) => {
    if (querySnapshot.size == 0) {
        writeFavouriteDeals();
    }
})

db.collection("favourites").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
});

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("dealCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allDeals => {
            var i = 1;  //Optional: if you want to have a unique ID for each hike
            allDeals.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var deal = doc.data().deal;
                var price = doc.data().price;
                var imageCode = doc.data().code;
                var dealStartDate = doc.data().startDate; // get value of the "details" key   //get unique ID to each hike to be used for fetching right image //gets the length field
                var dealEndDate = doc.data().endDate;
                var retailer = doc.data().retailer;
                var UPC = doc.data().UPC;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                //update title and text and image
                newcard.querySelector('.card-item').innerHTML = title;

                //newcard.querySelector('.card-startdate').innerHTML = startdate;
                newcard.querySelector('.card-deal').innerHTML = deal;
                newcard.querySelector('.card-price').innerHTML = `$${price}`;
                newcard.querySelector('.card-end-date').innerHTML = dealEndDate;
                newcard.querySelector('.card-retailer').innerHTML = retailer;
                newcard.querySelector('.card-image').src = `./images/items/${imageCode}` //`.images/items/${imageCode}`; //Example: NV01.jpg `./images/${imageCode}.png`
                //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                // Assign a unique ID to the cloned card
                let cardElement = newcard.querySelector(".card");
                if (cardElement) {
                    cardElement.setAttribute("id", doc.id);
                    cardElement.classList.add(doc.id)
                }

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;   //Optional: iterate variable to serve as unique ID
                // $(`#${i}`).click(function () {
                //     $(`.${i}`).show();
                // })
                $('.card').click(function () {
                    var theClass = $(this).attr('id');
                    $(`#popup_${theClass}`).show();
                });
                $(".card").click(function () {
                    $("#overlay").show();
                    $("#deals-popup-here").show();
                })
            })
        })
}

function displayDealPopupsDynamically(collection) {
    let popupTemplate = document.getElementById("dealPopupTemplate");

    db.collection(collection).get()
        .then(allDeals => {
            var i = 1;
            allDeals.forEach(doc => {
                var description = doc.data().description;
                var title = doc.data().name;
                var deal = doc.data().deal;
                var imageCode = doc.data().code;
                var price = doc.data().price;
                var brand = doc.data().brand;
                var dealStartDate = doc.data().startDate;
                var dealEndDate = doc.data().endDate;
                var retailer = doc.data().retailer;
                var UPC = doc.data().UPC;
                var retailerURL = doc.data().retailerURL;
                var docID = doc.id; // Get document ID

                let newcard = popupTemplate.content.cloneNode(true);

                newcard.querySelector('.card-description').innerHTML = description;
                newcard.querySelector('.card-item').innerHTML = title;
                newcard.querySelector('.card-deal').innerHTML = deal;
                newcard.querySelector('.card-price').innerHTML = `$${price}`;
                newcard.querySelector('.card-brand').innerHTML = brand;
                newcard.querySelector('.card-end-date').innerHTML = dealEndDate;
                newcard.querySelector('.card-retailer').innerHTML = `<a href="${retailerURL}" target="_blank">${retailer}</a>`;
                newcard.querySelector('.card-image-popup').src = `./images/items/${imageCode}`;

                let popupElement = newcard.querySelector(".popup");
                if (popupElement) {
                    popupElement.setAttribute("id", "popup_" + doc.id);
                    popupElement.style.display = 'none';
                    popupElement.classList.add(i);
                }

                newcard.querySelector('.saveDealButton').setAttribute("id", "saveDeal" + i);

                $("#saveDeal").click(function () {
                    $('#saveDeal').css({ 'background-color': 'green' });
                });

                // Bookmark handling
                let bookmarkIcon = newcard.querySelector('.saveDealButton');
                if (bookmarkIcon) {
                    bookmarkIcon.id = 'save-' + docID;
                    bookmarkIcon.onclick = () => saveBookmark(docID);

                    currentUser.get().then(userDoc => {
                        var bookmarks = userDoc.data().bookmarks;
                        if (bookmarks.includes(docID)) {
                            bookmarkIcon.innerText = 'favorite';
                        }
                    });
                }


                document.getElementById(collection + "-popup-here").appendChild(newcard);
                i++;

                $(".btn-close").click(function () {
                    $("#deals-popup-here").hide();
                    $("#overlay").hide();
                    $(".popup").hide();
                });
            });
        });
}


function closeDeal() {
    $(".btn-close").click(function () {
        console.log("hello")
        $("#deals-popup-here").hide();
        $("#overlay").hide();
    })
}

// This function adds the saved deal to favourite deals collection under user in Firestore
function reply_click(clicked_id) {
    $(`#${clicked_id}`).css({
        'background-color': 'green',
    })
    let popupID = $(`#${clicked_id}`).parents('.popup').last().prop('id');
    let dealDocumentID = (popupID.split("_"))[1]
    console.log(dealDocumentID);

    const favouriteDealsDocRef = firebase.firestore().collection('users').doc('user').collection("favourite_deals").doc('dealDocumentID');
    const dealsDocRef = firebase.firestore().collection('deals').doc(dealDocumentID);

    favouriteDealsDocRef.get().then((doc) => {
        if (doc.exists) {
            console.log('Document data:', doc.data());
        } else {
            dealsDocRef.get().then((dealDoc) => {
                if (dealDoc.exists) {
                    // Set the data in favouriteDealsDocRef
                    favouriteDealsDocRef.set(dealDoc.data())
                        .then(() => {
                            console.log('Deal successfully added to favourites!');
                        })
                        .catch((error) => {
                            console.error('Error adding deal to favourites:', error);
                        });
                } else {
                    console.log('Deal document does not exist!');
                }
            }).catch((error) => {
                console.error('Error getting deal document:', error);
            });
            console.log('No such document!');
        }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
}

function saveItem() {
    $('').click(function () {
        var theClass = $(this).attr('id');
        $(`#popup${theClass}`).show();
    });
    $("#saveDeal").click(function () {
        console.log("hello");
        $('#saveDeal').css({
            'background-color': 'green',
        })
    })
};
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
