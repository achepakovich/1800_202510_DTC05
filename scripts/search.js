var currentUser;
let filter_open = false;

function titleCase(item) {
    item = item.toLowerCase().split(' ').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
    });
    return item.join(' ');
}
// Function to read URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


// Function that calls everything needed for the deals page
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); // global
            console.log(currentUser);

            // Handle URL search parameter
            const itemParam = getURLParameter("item");
            if (itemParam) {
                const searchBox = document.getElementById("searchBox");
                if (searchBox) {
                    const decodedItem = decodeURIComponent(itemParam);
                    searchBox.value = decodedItem;
                    localStorage.setItem("searchItem", decodedItem);

                    const searchButton = document.getElementById("searchButton");
                    if (searchButton) {
                        setTimeout(() => {
                            searchButton.click();
                        }, 100);
                    }
                }
            }
            // Filtering event handlers
            $("#price").click(() => {
                filterDeals("price");
                displayCardsDynamically("deals");
            });
            $(".discount").click(() => {
                filterDeals();
                displayCardsDynamically("deals");
            });
            $("#newest").click(() => {
                filterDeals();
                displayCardsDynamically("deals");
            });
            $("#enddate").click(() => {
                filterDeals("endDate");
                displayCardsDynamically("deals");
            });
            $("#retailer").click(() => {
                filterDeals("retailer");
                displayCardsDynamically("deals");
            });
            $("#brand").click(() => {
                filterDeals("brand");
                displayCardsDynamically("deals");
            });
            $(".walmart").click(function () {
                displayCardsDynamically("deals");
            });
            $(".superstore").click(function () {
                displayCardsDynamically("deals");
            });
            $(".save_on_foods").click(function () {
                displayCardsDynamically("deals");
            });
            // $(".whole_foods").click(function () {
            //     displayCardsDynamically("deals");
            // });
            $(".min-price").change(function () {
                displayCardsDynamically("deals");
            });
            $(".max-price").change(function () {
                displayCardsDynamically("deals");
            });
            $(".filter_brand").change(function () {
                displayCardsDynamically("deals");
            });
            $(".filter_enddate").change(function () {
                displayCardsDynamically("deals");
            });
            // $("#open_close").click(function () {
            //     $("#filter_contents").toggle();  // Toggles visibility of the element
            //     if (filter_open == false) {
            //         filter_open = true;
            //         $("#open_close").html("<div id='open_close' class='text - center'><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' width='30px' class='size-6'><path stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /></svg><div>")
            //     } else {
            //         filter_open = false
            //         $("#open_close").html("<div id='open_close' class='text - center'><svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' width='30px' class='size-6'><path stroke-linecap='round' stroke-linejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' /></svg></div>")
            //     }
            // });
            $("#toggleSidebar").click(function () {
                $(".sidebar").toggle(); // Toggle sidebar
            });


            populateSearchBoxValue();
            colourActiveFilter();
            displayCardsDynamically("deals");
            displayDealPopupsDynamically("deals");
        } else {
            // No user is signed in
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}

doAll();
// Function to read URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Check if we have an item parameter in the URL
document.addEventListener("DOMContentLoaded", function () {
    const itemParam = getURLParameter("item");

    if (itemParam) {
        // Set the search box value to the item parameter
        const searchBox = document.getElementById("searchBox");
        if (searchBox) {
            const decodedItem = decodeURIComponent(itemParam);
            searchBox.value = decodedItem;

            // Also store in localStorage for the search functionality
            localStorage.setItem("searchItem", decodedItem);

            // Trigger the search - either by clicking the button or calling the search function
            const searchButton = document.getElementById("searchButton");
            if (searchButton) {
                // Delay slightly to ensure everything is loaded
                setTimeout(() => {
                    searchButton.click();
                }, 100);
            }
        }
    }
});


// This is to control how the filter bar behaves when moving between small and larger screen sizes
document.addEventListener("DOMContentLoaded", function () {
    function updateOffcanvas() {
        const offcanvasElement = document.getElementById("offcanvasTop");

        if (window.innerWidth < 768) { // Small screens
            offcanvasElement.classList.remove("offcanvas-start");
            offcanvasElement.classList.add("offcanvas-top");
        } else { // Medium and larger screens
            offcanvasElement.classList.remove("offcanvas-top");
            offcanvasElement.classList.add("offcanvas-start");
            offcanvasElement.classList.add("show");
        }
    }
    // Run on page load
    updateOffcanvas();
    // Run on window resize
    window.addEventListener("resize", updateOffcanvas);
});


// handle filtering the deals
filterActivated = false;
filterField = "price";
function filterDeals(filter) {
    filterActivated = true;
    filterField = filter;
    $("#deals-go-here").empty();
}

function colourActiveFilter() {
    // Attach event listeners once when the page loads
    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", function () {
            // Remove "active" from all dropdown items
            document.querySelectorAll(".dropdown-item").forEach(el => el.classList.remove("active"));
            // Add "active" class to clicked item
            this.classList.add("active");
        });
    });
}

function formatEndDateForDatabase(endDate) {
    endDate_split = endDate.split("-")
    endDate_formatted = endDate_split[1] + "/" + endDate_split[2] + "/" + endDate_split[0]
    console.log(endDate_formatted)
    return endDate_formatted
}

// Apply filters by adding where clause to database query
function addWhereClauses(collection) {
    let searchNameGet = localStorage.getItem("searchItem");
    let search = db.collection(collection).where("itemName", "==", searchNameGet);

    // Retailer
    let retailer = [];
    if ($(".no_frills").is(":checked")) {
        retailer.push("no_frills");
    }
    if ($(".save_on_foods").is(":checked")) {
        retailer.push("Save-On-Foods");
    }
    if ($(".walmart").is(":checked")) {
        retailer.push("walmart");
    }
    if ($(".superstore").is(":checked")) {
        retailer.push("Superstore");
    }
    // Add retailer filter only if at least one is selected
    if (retailer.length > 0) {
        search = search.where("retailer", "in", retailer);
    }

    // Price
    let min = $(".min-price").val() ? parseFloat($(".min-price").val()) : 0;
    let max = $(".max-price").val() ? parseFloat($(".max-price").val()) : Infinity;
    if ($(".min-price").val()) {
        search = search.where("price", ">=", min);
    }
    if ($(".max-price").val()) {
        search = search.where("price", "<=", max);
    }

    // Brands
    if (brand_to_filter_by = $(".filter_brand").val()) {
        brand_to_filter_by_title_case = titleCase(brand_to_filter_by)
        search = search.where("brand", "==", brand_to_filter_by_title_case);
    }

    // End Date
    if (enddate_to_filter_by = $(".filter_enddate").val()) {
        let endDate = new Date(enddate_to_filter_by)
        let firestoreEndDate = new firebase.firestore.Timestamp.fromDate(endDate);
        console.log(endDate)
        console.log(firestoreEndDate)
        search = search.where("expiryDate", ">", firestoreEndDate);
    }

    $("#deals-go-here").empty();
    return search
}


function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("dealCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.
    let searchNameGet = localStorage.getItem("searchItem");
    if (filterActivated == false) {
        dbCollection = addWhereClauses(collection)
    } else if (filterActivated == true) {
        dbCollection = addWhereClauses(collection).orderBy(filterField)
    }
    dbCollection.get().then((allDeals) => {
        if (allDeals.empty) {
            $("#no-results").html("<h1>No deals found for this item. Sorry!</h1>");
            $("#no-results").after(
                "<div class='text-center'><img class='mt-5' src='https://cdn-icons-png.freepik.com/256/6179/6179016.png?ga=GA1.1.1263291304.1741026299&semt=ais_hybrid'></div>"
            );
            $("#deals-container").attr("style", "display: none !important;");
        } else {
            $("#deals-container").attr("style", "display: flex !important;");
        }
        var i = 1; //Optional: if you want to have a unique ID for each hike
        allDeals.forEach((doc) => {
            //iterate thru each doc
            var title = doc.data().name; // get value of the "name" key
            var deal = doc.data().deal;
            console.log(title);
            var price = doc.data().price;
            var imageCode = doc.data().code;
            var dealStartDate = doc.data().startDate; // get value of the "details" key   //get unique ID to each hike to be used for fetching right image //gets the length field
            var dealEndDate = doc.data().endDate;
            var retailer = doc.data().retailer;
            var UPC = doc.data().UPC;
            let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
            //update title and text and image
            newcard.querySelector(".card-item").innerHTML = title;
            newcard.querySelector(".card-deal").innerHTML = deal;
            newcard.querySelector(".card-price").innerHTML = `$${price}`;
            newcard.querySelector(".card-end-date").innerHTML = dealEndDate;
            newcard.querySelector(".card-retailer").innerHTML = retailer;
            newcard.querySelector(".card-image").src = `./images/items/${imageCode}`; //`.images/items/${imageCode}`; //Example: NV01.jpg `./images/${imageCode}.png`

            // Assign a unique ID to the cloned card
            let cardElement = newcard.querySelector(".card");
            if (cardElement) {
                cardElement.setAttribute("id", doc.id);
                cardElement.classList.add(doc.id);
            }
            document.getElementById(collection + "-go-here").appendChild(newcard);
            i++; //Optional: iterate variable to serve as unique ID
            $(".card").click(function () {
                var theClass = $(this).attr("id");
                $(`#popup_${theClass}`).show();
            });
            $(".card").click(function () {
                $("#overlay").show();
                $("#deals-popup-here").show();
            });
        });
    });
}

function displayDealPopupsDynamically(collection) {
    let popupTemplate = document.getElementById("dealPopupTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable.
    let searchNameGet = localStorage.getItem("searchItem");
    let searchName = $('input[name="item"]').val();
    db.collection(collection)
        .where("itemName", "==", searchNameGet)
        .get()
        .then((allDeals) => {
            var i = 1; //Optional: if you want to have a unique ID for each hike
            allDeals.forEach((doc) => {
                //iterate thru each doc
                var description = doc.data().description;
                var title = doc.data().name; // get value of the "name" key
                var deal = doc.data().deal;
                var imageCode = doc.data().code;
                var price = doc.data().price;
                var brand = doc.data().brand;
                var dealStartDate = doc.data().startDate; // get value of the "details" key   //get unique ID to each hike to be used for fetching right image //gets the length field
                var dealEndDate = doc.data().endDate;
                var retailer = doc.data().retailer;
                var UPC = doc.data().UPC;
                var retailerURL = doc.data().retailerURL;
                var docID = doc.id;
                let newcard = popupTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                //update title and text and image
                newcard.querySelector('.card-description').innerHTML = description;
                newcard.querySelector(".card-item").innerHTML = title;
                newcard.querySelector(".card-deal").innerHTML = deal;
                newcard.querySelector(".card-price").innerHTML = price;
                newcard.querySelector('.card-brand').innerHTML = brand;
                newcard.querySelector(".card-end-date").innerHTML = dealEndDate;
                newcard.querySelector(".card-retailer").innerHTML = `<a href="${retailerURL}" target="_blank">${retailer}</a>`;
                newcard.querySelector(
                    ".card-image-popup"
                ).src = `./images/items/${imageCode}`;

                let popupElement = newcard.querySelector(".popup");
                if (popupElement) {
                    popupElement.setAttribute("id", "popup_" + doc.id);
                    popupElement.style.display = "none";
                    popupElement.classList.add(i);
                }

                newcard
                    .querySelector(".saveDealButton")
                    .setAttribute("id", "saveDeal" + i);
                $("#saveDeal").click(function () {
                    $("#saveDeal").css({
                        "background-color": "green",
                    });
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
                //attach to gallery, Example: "hikes-go-here"
                document
                    .getElementById(collection + "-popup-here")
                    .appendChild(newcard);
                i++; //Optional: iterate variable to serve as unique ID
                $(".btn-close").click(function () {
                    $("#deals-popup-here").hide();
                    $("#overlay").hide();
                    $(".popup").hide();
                });
            });
        });
}

// This ensures that the search item name remains in the search box after search
function populateSearchBoxValue() {
    let searchNameGet = localStorage.getItem("searchItem");
    $("#searchBox").val(searchNameGet);
}

// $(document).ready(function () {
//     $("#price").click(function () {
//         filterDeals("price");
//         displayCardsDynamically("deals");
//     });
//     $("#discount").click(function () {
//         filterDeals();
//         displayCardsDynamically("deals");
//     });
//     $("#newest").click(function () {
//         filterDeals();
//         displayCardsDynamically("deals");
//     });
//     $("#enddate").click(function () {
//         filterDeals("endDate");
//         displayCardsDynamically("deals");
//     });
//     $("#retailer").click(function () {
//         filterDeals("retailer");
//         displayCardsDynamically("deals");
//     });
//     $("#brand").click(function () {
//         filterDeals("brand");
//         displayCardsDynamically("deals");
//     });
//     populateSearchBoxValue();
//     colourActiveFilter();
//     displayCardsDynamically("deals");
//     displayDealPopupsDynamically("deals");
// });

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
};

// Implementing the scroll to to top button
let mybutton = document.getElementById("scrollToTopButton");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
