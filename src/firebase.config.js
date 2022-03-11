// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwzCr1v7MwwbstZmscbfxDFizI_yzoEco",
  authDomain: "todo-app-30d30.firebaseapp.com",
  projectId: "todo-app-30d30",
  storageBucket: "todo-app-30d30.appspot.com",
  messagingSenderId: "1032137007425",
  appId: "1:1032137007425:web:63e04f7933de4aab4081c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();