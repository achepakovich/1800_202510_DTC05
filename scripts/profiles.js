var currentUser;  // Points to the document of the user who is logged in

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            // Get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    // Get the data fields of the user
                    let userName = userDoc.data().name;
                    let userCity = userDoc.data().city;
                    let userPostalCode = userDoc.data().postalCode;
                    let userFavouriteFruit = userDoc.data().favouriteFruit;

                    // If the data fields are not empty, then write them into the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userPostalCode != null) {
                        document.getElementById("postalInput").value = userPostalCode;
                    }
                    if (userFavouriteFruit != null) {
                        document.getElementById("favouriteFruit").value = userFavouriteFruit;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

// Call the function to run it 
populateUserInfo();

function editUserInfo() {
    // Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    // a) Get user entered values
    userName = document.getElementById('nameInput').value;     
    userCity = document.getElementById('cityInput').value;    
    userPostalCode = document.getElementById('postalInput').value;    
    userFavouriteFruit = document.getElementById('favouriteFruit').value;    
    
    // b) Update user's document in Firestore
    currentUser.update({
        name: userName,
        city: userCity,
        postalCode: userPostalCode,
        favouriteFruit: userFavouriteFruit
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });

    // c) Disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}
