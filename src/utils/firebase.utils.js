import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const retreiveUserData= async (
    userAuth
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);

  
    return userSnapshot.data();
  };