// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZD8UfIrByxsws4TK7NpdLoLOQhKe4WKo",
  authDomain: "hotelchatroom-ca438.firebaseapp.com",
  projectId: "hotelchatroom-ca438",
  storageBucket: "hotelchatroom-ca438.appspot.com",
  messagingSenderId: "927945034835",
  appId: "1:927945034835:web:a78a0796fdfcfeb8074aa6",
  measurementId: "G-8HWGFEQBKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef=collection(firebaseDB,"users");
export const meetingsRef = collection(firebaseDB,"meetings");
export const roomsRef = collection(firebaseDB,"rooms");