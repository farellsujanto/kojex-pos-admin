import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let config = {
    apiKey: "AIzaSyDkdz96J2Jx_lNtzbzLCOHwO36yAo96yvE",
    authDomain: "shopping-management-8cffb.firebaseapp.com",
    databaseURL: "https://shopping-management-8cffb.firebaseio.com",
    projectId: "shopping-management-8cffb",
    storageBucket: "shopping-management-8cffb.appspot.com",
    messagingSenderId: "950455181652",
    appId: "1:950455181652:web:79998645d4b8df45bda8c1",
    measurementId: "G-FEJFBC6RLC"
};

let firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export { firebaseApp };