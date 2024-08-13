// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqH0GqN15K7l3EJBJwqFJriqVNX8bcV98",
  authDomain: "flashcard-saas-aa2eb.firebaseapp.com",
  projectId: "flashcard-saas-aa2eb",
  storageBucket: "flashcard-saas-aa2eb.appspot.com",
  messagingSenderId: "510220762781",
  appId: "1:510220762781:web:27964a583dab38e5e49e74",
  measurementId: "G-RLV28TBHN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };