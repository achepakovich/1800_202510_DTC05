var currentUser

function checkLogin() {
    firebase.auth().onAuthStateChanged(function (currentUser) {
        if (!currentUser) {
            console.log("Not logged in")
            window.location.replace("../login.html");
        } else {
            console.log("Logged in")
        }
    })
}

checkLogin();