import firebase from 'firebase';
import 'firebase/auth';

// firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBl8vMtZqPbI1PUPVdNUlPGhtV3pVOgMEg",
    authDomain: "guitarapp-a7d23.firebaseapp.com",
    databaseURL: "https://guitarapp-a7d23.firebaseio.com",
    projectId: "guitarapp-a7d23",
    storageBucket: "guitarapp-a7d23.appspot.com",
    messagingSenderId: "178706043908",
    appId: "1:178706043908:web:6a3368ec0a06758b0f5151",
    measurementId: "G-YF4LJDTY3V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;