// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUo417iAzT2vn_RdeNdPKFAXHZTt7raHU",
  authDomain: "house-marketplace-pratham.firebaseapp.com",
  projectId: "house-marketplace-pratham",
  storageBucket: "house-marketplace-pratham.appspot.com",
  messagingSenderId: "537593370059",
  appId: "1:537593370059:web:05bf514250fca313ba524e"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();