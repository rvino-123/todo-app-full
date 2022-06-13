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
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuid4 } from "uuid";

// List Items
export const getItems = async (userId) => {
  const items = [];
  const itemsRef = collection(db, "items");
  const q = query(
    itemsRef,
    where("userRef", "==", userId),
    where("isDeleted", "==", false)
  );

  try {
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      return items.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    const sortedItems = items
      .sort((a, b) => (a.data.createdAt < b.data.createdAt ? 1 : -1))
      .sort((a, b) => a.data.isDone - b.data.isDone);
    return sortedItems;
  } catch (err) {
    console.log(err);
  }
};

export const getListItemById = async (itemId) => {
  const item = await getDoc(doc(db, "items", itemId));
  return item;
};

export const createItem = async (formData) => {
  const id = uuid4();
  formData.createdAt = serverTimestamp();

  try {
    await setDoc(doc(db, "items", id), formData);
  } catch (err) {
    console.log(err);
  }
};

export const editListItem = async (itemId, editedItem) => {
  let formData = editedItem;

  formData.timestamp = serverTimestamp();

  await setDoc(doc(db, "items", itemId), formData);
};

export const filterListItemsByCategory = (categoryid, listItems) => {
  console.log("filtering");
  return listItems.filter((item) => item.data.categoryRef === categoryid);
};

export const deleteListItem = async (listId, listItems, formData) => {
  await setDoc(doc(db, "items", listId), formData);
  return listItems.filter((item) => item.id !== listId);
};

// Categories

export const getCategories = async (userId) => {
  const items = [];
  const categoriesRef = collection(db, "categories");
  const q = query(categoriesRef, where("userRef", "==", userId));

  try {
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      return items.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return items;
  } catch (err) {
    console.log(err);
  }
};

export const getCategory = async (id) => {
  const categoryRef = doc(db, "categories", id);

  const docSnap = await getDoc(categoryRef);

  return { id: docSnap.id, data: docSnap.data() };
};

export const createCategory = async (formData) => {
  const id = uuid4();
  formData.createdAt = serverTimestamp();

  try {
    await setDoc(doc(db, "categories", id), formData);
  } catch (err) {
    console.log(err);
  }
};

export const editCategory = async (categoryId, formData) => {
  formData.editedAt = serverTimestamp();
  console.log(categoryId);

  try {
    await setDoc(doc(db, "categories", categoryId), formData);
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategory = async (id) => {
  try {
    await deleteDoc(doc(db, "categories", id));
  } catch (err) {
    console.log(err);
  }
};

export const addCategoryToListItem = async (id, categoryRef) => {
  const item = await getListItemById(id);
  console.log("this is id: ", item);
  const editedItem = {
    ...item.data(),
    categoryRef,
    editedAt: serverTimestamp(),
  };

  console.log("this is edited item: ", editedItem);

  try {
    await setDoc(doc(db, "items", id), editedItem);
  } catch (err) {
    console.log(err);
  }
};

// Notes
export const getNotes = async (itemRef) => {
  const notes = [];
  const notesRef = collection(db, "notes");
  const q = query(notesRef, where("itemRef", "==", itemRef));

  try {
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      return notes.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return notes[0];
  } catch (err) {
    console.log(err);
  }
};

export const createNote = async (formData) => {
  const id = uuid4();
  formData.createdAt = serverTimestamp();
  try {
    await setDoc(doc(db, "notes", id), formData);
  } catch (err) {
    console.log(err);
  }
};

export const editNote = async (noteId, itemRef, formData) => {
  formData["editedAt"] = serverTimestamp();
  formData["itemRef"] = itemRef;
  try {
    const result = await setDoc(doc(db, "notes", noteId), formData);
    console.log(result);
    if (result) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};
