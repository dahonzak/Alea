// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6lwEOE2nKQ-8hQMAquzuvXx9z8SCcfW4",
  authDomain: "alea-radio.firebaseapp.com",
  projectId: "alea-radio",
  storageBucket: "alea-radio.appspot.com",
  messagingSenderId: "217290148313",
  appId: "1:217290148313:web:5fe70e336af0767c9a71c8",
  measurementId: "G-BPPJ6DBM9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);