function writeDeals() {
    //define a variable for the collection you want to create in Firestore to populate data
    var dealsRef = db.collection("deals");

    dealsRef.add({
        item: "Spaghetti",
        brand: "Barilla",
        type: "30% off",
        price: "$1.97",
        retailer: "No Frills", //replace with your own city?
        startDate: "3/5/2025",
        endDate: "4/5/2025",
        code: "https://product-images.metro.ca/images/h50/ha5/9530112049182.jpg",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    dealsRef.add({
        item: "Spaghetti",
        brand: "Barilla",
        type: "30% off",
        price: "$1.97",
        retailer: "No Frills", //replace with your own city?
        startDate: "3/5/2025",
        endDate: "4/5/2025",
        code: "https://product-images.metro.ca/images/h50/ha5/9530112049182.jpg",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}

db.collection("deals").get().then((querySnapshot) => {
    if (querySnapshot.size == 0) {
        writeDeals();
    }
})

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("dealCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allDeals => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allDeals.forEach(doc => { //iterate thru each doc
                var title = doc.data().item;       // get value of the "name" key
                var type = doc.data().type;
                var imageCode = doc.data().code;
                var dealStartDate = doc.data().startDate; // get value of the "details" key   //get unique ID to each hike to be used for fetching right image //gets the length field
                var dealEndDate = doc.data().endDate;
                var retailer = doc.data().retailer
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-item').innerHTML = title;

                //newcard.querySelector('.card-startdate').innerHTML = startdate;
                newcard.querySelector('.card-deal').innerHTML = type;
                newcard.querySelector('.card-end-date').innerHTML = dealEndDate;
                newcard.querySelector('.card-retailer').innerHTML = retailer;
                newcard.querySelector('.card-image').src = imageCode; //Example: NV01.jpg `./images/${imageCode}.png`
                //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //Optional: iterate variable to serve as unique ID
                $(".card").click(function () {
                    //window.location = "http://google.com"
                });
                $(".card").click(function () {
                    $(".popup").show();
                })
                $(".card").click(function () {
                    $("#deals-popup-here").show();
                })
            })
        })
}

function displayDealPopupsDynamically(collection) {
    let cardTemplate = document.getElementById("dealPopupTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allDeals => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allDeals.forEach(doc => { //iterate thru each doc
                var title = doc.data().item;       // get value of the "name" key
                var type = doc.data().type;
                var imageCode = doc.data().code;
                var dealStartDate = doc.data().startDate; // get value of the "details" key   //get unique ID to each hike to be used for fetching right image //gets the length field
                var dealEndDate = doc.data().endDate;
                var retailer = doc.data().retailer
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-item').innerHTML = title;

                //newcard.querySelector('.card-startdate').innerHTML = startdate;
                newcard.querySelector('.card-deal').innerHTML = type;
                newcard.querySelector('.card-end-date').innerHTML = dealEndDate;
                newcard.querySelector('.card-retailer').innerHTML = retailer;
                newcard.querySelector('.card-image').src = imageCode; //Example: NV01.jpg `./images/${imageCode}.png`
                //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-popup-here").appendChild(newcard);
                //i++;   //Optional: iterate variable to serve as unique ID
                $(".btn-close").click(function () {
                    $("#deals-popup-here").hide();
                })
            })
        })
}

function closeDeal() {
    $(".btn-close").click(function () {
        console.log("hello")
        $("#deals-popup-here").hide();
    })
}

displayCardsDynamically("deals");
displayDealPopupsDynamically("deals");
closeDeal();