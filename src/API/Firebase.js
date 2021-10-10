import firebase from 'firebase/app'; //必須
import "firebase/storage";
import 'firebase/firestore'; 
import "firebase/auth";


var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain:process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_SB,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSI,
    appId: process.env.REACT_APP_FIREBASE_APPID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage_obj = firebase.storage();
export const storage = storage_obj;
export const db = firebase.firestore();