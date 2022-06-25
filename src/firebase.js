// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBYRaxjyI-SOTMuFD9NBcgz0abS_NxrAtk",
    authDomain: "kangshop-40c6e.firebaseapp.com",
    projectId: "kangshop-40c6e",
    storageBucket: "kangshop-40c6e.appspot.com",
    messagingSenderId: "25342148498",
    appId: "1:25342148498:web:fd0c4edecb56fec2970b4b",
    measurementId: "G-ER5N9YDM4V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app)

export { db, auth, analytics };