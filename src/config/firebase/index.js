import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBjqcpfYFIxYwy1WXYGnigbJbjKxjh80bo",
    authDomain: "crud-82db0.firebaseapp.com",
    databaseURL: "https://crud-82db0-default-rtdb.firebaseio.com",
    projectId: "crud-82db0",
    storageBucket: "crud-82db0.appspot.com",
    messagingSenderId: "119223414347",
    appId: "1:119223414347:web:1536d6dd333396a84f67ce"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;