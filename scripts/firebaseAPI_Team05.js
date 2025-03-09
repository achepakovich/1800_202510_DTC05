//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDQMc07uA1vj6TI7iwTWdj-90ri_l5wLjs",
    authDomain: "dtc05-e0f80.firebaseapp.com",
    projectId: "dtc05-e0f80",
    storageBucket: "dtc05-e0f80.firebasestorage.app",
    messagingSenderId: "255051613314",
    appId: "1:255051613314:web:ba5e360dafa6b87b96e09b",
    measurementId: "G-10GFV7PDLZ"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();