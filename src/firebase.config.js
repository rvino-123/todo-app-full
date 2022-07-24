// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

let firebaseConfig;
if (process.env.NODE_ENV === "production ") {

  firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_PROD,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN_PROD,
    projectId: process.env.REACT_APP_PROJECT_ID_PROD,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_PROD,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_PROD,
    appId: process.env.REACT_APP_APP_ID_PROD
  };

} else {

  firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_DEV,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN_DEV,
    projectId: process.env.REACT_APP_PROJECT_ID_DEV,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
    appId: process.env.REACT_APP_APP_ID_DEV
  };
}



// Initialize Firebase
/* eslint-disable no-unused-vars */

const app = initializeApp(firebaseConfig); 

/* eslint-enable no-unused-vars */

export const db = getFirestore();