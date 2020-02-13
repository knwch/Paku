import firebase from 'firebase/app';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyDayQTQKc0vXI76guRe4GGHxbH2oTwsuLE",
    authDomain: "paku-d43d9.firebaseapp.com",
    databaseURL: "https://paku-d43d9.firebaseio.com",
    projectId: "paku-d43d9",
    storageBucket: "paku-d43d9.appspot.com",
    messagingSenderId: "193367907855",
    appId: "1:193367907855:web:f559ba38c0cda7ce064d7a",
    measurementId: "G-83KHJWX916"
};

firebase.initializeApp(firebaseConfig);

let storage = firebase.storage();

export {
    storage, firebase as default
}