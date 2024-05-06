import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDRKk1uLpGaQEJLNW_XQ7dMVv8D5JdcpAM",
    authDomain: "fir-reactjs-890c4.firebaseapp.com",
    projectId: "fir-reactjs-890c4",
    storageBucket: "fir-reactjs-890c4.appspot.com",
    messagingSenderId: "465450185100",
    appId: "1:465450185100:web:b6df8a389f8f4cc294e6a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service

const db = getFirestore(app);

// auth 

 const auth = getAuth(app);



 export  {db , auth}