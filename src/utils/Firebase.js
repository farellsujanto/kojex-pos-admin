import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyBaGDygm6e6XYpAF0QVbiWr86cuB_AwzVg",
    authDomain: "company-management-a007f.firebaseapp.com",
    databaseURL: "https://company-management-a007f.firebaseio.com",
    projectId: "company-management-a007f",
    storageBucket: "company-management-a007f.appspot.com",
    messagingSenderId: "72804554904",
    appId: "1:72804554904:web:5265cf4cdb679bdd46d8ed",
    measurementId: "G-NB4DDJNDZ7"
};

let firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export { firebaseApp };