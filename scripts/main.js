function writeDeals() {
    //define a variable for the collection you want to create in Firestore to populate data
    var dealsRef = db.collection("deals");

    dealsRef.add({
        item: "Spaghetti",
        brand: "Barilla",
        type: "50% off",
        retailer: "No Frills", //replace with your own city?
        startdate: "3/5/2025",
        enddate: "4/5/2025",
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
    console.log("hello");
    let cardTemplate = document.getElementById("dealCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allDeals => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allDeals.forEach(doc => { //iterate thru each doc
                var title = doc.data().item;       // get value of the "name" key
                var type = doc.data().type;
                var dealstartdate = doc.data().startdate; // get value of the "details" key   //get unique ID to each hike to be used for fetching right image //gets the length field
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-item').innerHTML = title;

                //newcard.querySelector('.card-startdate').innerHTML = startdate;
                newcard.querySelector('.card-deal').innerHTML = type;
                //newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
                //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                console.log("hello");
                document.getElementById(collection + "-go-here").appendChild(newcard);
                console.log("hello");
                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("deals");