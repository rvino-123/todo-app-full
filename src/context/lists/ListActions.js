import { db } from "../../firebase.config";
import {
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";


export const getItems = async (userId) => {
    const items = [];
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("userRef", "==", userId));

    try {
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        return items.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(items);
      return items

    } catch (err) {
      console.log(err)
    }
  };

export const getListItemById = async(itemId) => {
    const item = await getDoc(doc(db, "items", itemId))
    return item;
}

export const editListItem = async (itemId, editedItem) => {
    let formData = editedItem;

    formData.timestamp = serverTimestamp();

    await setDoc(doc(db, "items", itemId), formData);
}

//   export const getItemById = async (itemId) => {
//     try {
//         return db.collection('list-items').where(firebase.firestore.FieldPath.documentId(), '==', itemId).get()
//     } catch (error) {
//         console.log(error)
//     }
// };