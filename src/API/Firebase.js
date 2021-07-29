import firebase from 'firebase/app'; //必須
import "firebase/storage";
import 'firebase/firestore'; 


var firebaseConfig = {
    apiKey: "AIzaSyA2eRwtxI2bbsF3CRh45zLgCauK1mxQJyU",
    authDomain: "lunch-app-backend.firebaseapp.com",
    databaseURL: "https://lunch-app-backend-default-rtdb.firebaseio.com",
    projectId: "lunch-app-backend",
    storageBucket: "lunch-app-backend.appspot.com",
    messagingSenderId: "1023254959511",
    appId: "1:1023254959511:web:e24258a1387f864c31a0d2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage_obj = firebase.storage();
export const storage = storage_obj;
export const db = firebase.firestore();