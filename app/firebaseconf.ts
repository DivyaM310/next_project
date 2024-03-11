// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMhb6ZT0i6q3oXnE8F_IzzSCj1LNQ5vNM",
  authDomain: "asses1-7427d.firebaseapp.com",
  projectId: "asses1-7427d",
  storageBucket: "asses1-7427d.appspot.com",
  messagingSenderId: "1079478941884",
  appId: "1:1079478941884:web:2e90cde8ca0ff13159b8b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

export {db};