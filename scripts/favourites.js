///////////
///////////This is for futurue JS code for the favourites page. Just threw in some code from hiking demo for now. Need to updates favourites collection within user document with deal
///////////that is saved when pressing saved deal button in popup currently

function writeFavouriteDeal() {
    console.log("inside write review");
    let itemName = document.getElementById("card-item").value;
    let price = document.getElementById("level").value;
    let pricedByWeight = document.getElementById("season").value;
    let hikeDescription = document.getElementById("description").value;
    let hikeFlooded = document.querySelector('input[name="flooded"]:checked').value;
    let hikeScrambled = document.querySelector('input[name="scrambled"]:checked').value;

    name: "Roma Tomatoes", deal: "Save $0.13", price: 0.55, pricedByWeight: true, brand: "N/A", retailer: "Loblaws", endDate: "03/12/2025", UPC: "00000000004087", code: "00000000004087.jpg"
};

    // Get the star rating
    // Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
    // Initialize a variable 'hikeRating' to keep track of the rating count
    let hikeRating = 0;
    // Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
        // Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
            // If the condition is met, increment the 'hikeRating' by 1
            hikeRating++;
        }
    });

    console.log(hikeTitle, hikeLevel, hikeSeason, hikeDescription, hikeFlooded, hikeScrambled, hikeRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            hikeDocID: hikeDocID,
            userID: userID,
            title: hikeTitle,
            level: hikeLevel,
            season: hikeSeason,
            description: hikeDescription,
            flooded: hikeFlooded,
            scrambled: hikeScrambled,
            rating: hikeRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
}