filterActivated = false;
filterField = 'price'
function filterDeals(filter) {
    filterActivated = true;
    filterField = filter;
    $("#deals-go-here").empty()
    console.log(filterActivated)
}

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("dealCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 
    let searchNameGet = localStorage.getItem('searchItem');
    if (filterActivated == false) {
        dbCollection = db.collection(collection).where("itemName", "==", searchNameGet).get()
    } else if (filterActivated == true) {
        dbCollection = db.collection(collection).where("itemName", "==", searchNameGet).orderBy(filterField).get()
    }
    dbCollection.then(allDeals => {
        if (allDeals.empty) {
            $("#no-results").html("<h1>No deals found for this item. Sorry!</h1>")
            $("#no-results").after("<div class='text-center'><img class='mt-5' src='https://cdn-icons-png.freepik.com/256/6179/6179016.png?ga=GA1.1.1263291304.1741026299&semt=ais_hybrid'></div>")
        }
        var i = 1;  //Optional: if you want to have a unique ID for each hike
        allDeals.forEach(doc => { //iterate thru each doc
            var title = doc.data().name;       // get value of the "name" key
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
            newcard.querySelector('.card-item').innerHTML = title;
            newcard.querySelector('.card-deal').innerHTML = deal;
            newcard.querySelector('.card-price').innerHTML = price;
            newcard.querySelector('.card-end-date').innerHTML = dealEndDate;
            newcard.querySelector('.card-retailer').innerHTML = retailer;
            newcard.querySelector('.card-image').src = `./images/items/${imageCode}` //`.images/items/${imageCode}`; //Example: NV01.jpg `./images/${imageCode}.png`

            // Assign a unique ID to the cloned card
            let cardElement = newcard.querySelector(".card");
            if (cardElement) {
                cardElement.setAttribute("id", doc.id);
                cardElement.classList.add(doc.id)
            }
            document.getElementById(collection + "-go-here").appendChild(newcard);
            i++;   //Optional: iterate variable to serve as unique ID
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
    let popupTemplate = document.getElementById("dealPopupTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 
    let searchNameGet = localStorage.getItem('searchItem');
    let searchName = $('input[name="item"]').val()
    db.collection(collection).where("itemName", "==", searchNameGet).get()
        .then(allDeals => {
            var i = 1;  //Optional: if you want to have a unique ID for each hike
            allDeals.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var deal = doc.data().deal;
                var imageCode = doc.data().code;
                var price = doc.data().price;
                var dealStartDate = doc.data().startDate; // get value of the "details" key   //get unique ID to each hike to be used for fetching right image //gets the length field
                var dealEndDate = doc.data().endDate;
                var retailer = doc.data().retailer
                var UPC = doc.data().UPC;
                let newcard = popupTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                //update title and text and image
                newcard.querySelector('.card-item').innerHTML = title;
                newcard.querySelector('.card-deal').innerHTML = deal;
                newcard.querySelector('.card-price').innerHTML = price;
                newcard.querySelector('.card-end-date').innerHTML = dealEndDate;
                newcard.querySelector('.card-retailer').innerHTML = retailer;
                newcard.querySelector('.card-image-popup').src = `./images/items/${imageCode}`;

                let popupElement = newcard.querySelector(".popup");
                if (popupElement) {
                    popupElement.setAttribute("id", "popup_" + doc.id);
                    popupElement.style.display = 'none'
                    popupElement.classList.add(i)
                }

                newcard.querySelector('.saveDealButton').setAttribute("id", "saveDeal" + i);
                $("#saveDeal").click(function () {
                    $('#saveDeal').css({
                        'background-color': 'green',
                    })
                })
                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-popup-here").appendChild(newcard);
                i++;   //Optional: iterate variable to serve as unique ID
                $(".btn-close").click(function () {
                    $("#deals-popup-here").hide();
                    $("#overlay").hide();
                    $(".popup").hide();
                })
            })
        })
}

// This ensures that the search item name remains in the search box after search
function populateSearchBoxValue() {
    let searchNameGet = localStorage.getItem('searchItem');
    $("#searchBox").val(searchNameGet)
}

$(document).ready(function () {
    $("#price").click(function () {
        filterDeals("price")
        displayCardsDynamically("deals")
    })
    $("#discount").click(function () {
        filterDeals()
        displayCardsDynamically("deals")
    })
    $("#newest").click(function () {
        filterDeals()
        displayCardsDynamically("deals")
    })
    $("#enddate").click(function () {
        filterDeals("endDate")
        displayCardsDynamically("deals")
    })
    $("#retailer").click(function () {
        filterDeals("retailer")
        displayCardsDynamically("deals")
    })
    $("#brand").click(function () {
        filterDeals("brand")
        displayCardsDynamically("deals")
    })
    populateSearchBoxValue()
    displayCardsDynamically("deals");
    displayDealPopupsDynamically("deals");
}); 