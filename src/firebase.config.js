// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

console.log(process.env.NODE_ENV)

let firebaseConfig;

if (process.env.NODE_ENV === "production") {

  firebaseConfig = {
    apiKey: "AIzaSyBmrOFUnuWK3QPvgg8k3Td_D-qaKskKJmI",
    authDomain: "todo-2-1b843.firebaseapp.com",
    projectId: "todo-2-1b843",
    storageBucket: "todo-2-1b843.appspot.com",
    messagingSenderId: "821200481035",
    appId: "1:821200481035:web:6934a1e6823cb9d4b8500e"
  };

} else {

  firebaseConfig = {
   apiKey: "AIzaSyCwzCr1v7MwwbstZmscbfxDFizI_yzoEco",
   authDomain: "todo-app-30d30.firebaseapp.com",
   projectId: "todo-app-30d30",
   storageBucket: "todo-app-30d30.appspot.com",
   messagingSenderId: "1032137007425",
   appId: "1:1032137007425:web:63e04f7933de4aab4081c0"
 };
}



// Initialize Firebase
/* eslint-disable no-unused-vars */

const app = initializeApp(firebaseConfig); 

/* eslint-enable no-unused-vars */

export const db = getFirestore();