function writeDeals() {
    //define a variable for the collection you want to create in Firestore to populate data
    var dealsRef = db.collection("deals");

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
    dealsRef.add({ name: "Yellow Onions", deal: "Save $1.13", price: 1.86, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004093", code: "00000000004093.jpg" });
    dealsRef.add({ name: "Red Onions", deal: "Save $1.13", price: 2.58, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004082", code: "00000000004082.jpg" });
    dealsRef.add({ name: "Russet Potatoes", deal: "Save $1.13", price: 1.9, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004072", code: "00000000004072.jpg" });
    dealsRef.add({ name: "Anaheim Peppers", deal: "Save $1.13", price: 0.25, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00000000004677", code: "00000000004677.jpg" });
    dealsRef.add({ name: "Maple Leaf - Prime Chicken Breasts, Boneless Skinless, 1 Each", deal: "Save $1.13", price: 20.0, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00777262503609", code: "00777262503609.jpg" });
    dealsRef.add({ name: "Lilydale Boneless Skinless Thighs Value Pack, 10-14 pieces per tray, 1.06 - 1.44 kg", deal: "Save $1.13", price: 25.89, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00222650000005", code: "00222650000005.jpg" });
    dealsRef.add({ name: "Maple Leaf Fresh Boneless Pork Chops Center and Rib End, Combo Pack 9 Pieces, 1.00 - 1.35 kg", deal: "Save $1.13", price: 16.17, pricedByWeight: true, brand: "N/A", retailer: "No Frills", endDate: "03/25/2025", UPC: "00221372000003", code: "00221372000003.jpg" });
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
    let cardTemplate = document.getElementById("dealPopupTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allDeals => {
            var i = 1;  //Optional: if you want to have a unique ID for each hike
            allDeals.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var deal = doc.data().deal;
                var imageCode = doc.data().code;
                var dealStartDate = doc.data().startDate; // get value of the "details" key   //get unique ID to each hike to be used for fetching right image //gets the length field
                var dealEndDate = doc.data().endDate;
                var retailer = doc.data().retailer
                var UPC = doc.data().UPC;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                //update title and text and image
                newcard.querySelector('.card-item').innerHTML = title;

                //newcard.querySelector('.card-startdate').innerHTML = startdate;
                newcard.querySelector('.card-deal').innerHTML = deal;
                newcard.querySelector('.card-end-date').innerHTML = dealEndDate;
                newcard.querySelector('.card-retailer').innerHTML = retailer;
                newcard.querySelector('.card-image-popup').src = `./images/items/${imageCode}`; //Example: NV01.jpg `./images/${imageCode}.png`
                //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                let popupElement = newcard.querySelector(".popup");
                if (popupElement) {
                    popupElement.setAttribute("id", "popup_" + doc.id);
                    popupElement.style.display = 'none'
                    popupElement.classList.add(i)
                }

                //Optional: give unique ids to all elements for future use
                newcard.querySelector('.saveDealButton').setAttribute("id", "saveDeal" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
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

function closeDeal() {
    $(".btn-close").click(function () {
        console.log("hello")
        $("#deals-popup-here").hide();
        $("#overlay").hide();
    })
}

function reply_click(clicked_id) {
    $(`#${clicked_id}`).css({
        'background-color': 'green',
    })
    let popupID = $(`#${clicked_id}`).parents('.popup').last().prop('id');
    let dealDocumentID = (popupID.split("_"))[1]
    console.log(dealDocumentID);
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


displayCardsDynamically("deals");
displayDealPopupsDynamically("deals");
reply_click();
saveItem();
closeDeal();