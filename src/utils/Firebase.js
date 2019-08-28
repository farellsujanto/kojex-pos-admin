import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDCsR0Vblguy17fkHDFyhGS0L14zuXnqW8",
    authDomain: "reavern-tech.firebaseapp.com",
    databaseURL: "https://reavern-tech.firebaseio.com",
    projectId: "reavern-tech",
    storageBucket: "reavern-tech.appspot.com",
    messagingSenderId: "492974507286",
    appId: "1:492974507286:web:7a19fd2f3292eb2f"
};

let firebaseApp, secondaryApp;

firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
secondaryApp = firebase.apps.length < 2 ? firebase.initializeApp(config, "Secondary")  : firebase.app("Secondary");

export { firebaseApp, secondaryApp } ;