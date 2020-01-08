import firebase from 'firebase';
import 'firebase/auth';

require ('dotenv').config();

// firebase configuration
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

console.log(this.firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;