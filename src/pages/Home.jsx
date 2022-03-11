import React, { useContext, useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { db } from "../firebase.config";
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
import { v4 as uuid4 } from "uuid";
import { getAuth } from "firebase/auth";
import AllBoards from "../components/AllBoards";
import UserContainer from "../components/UserContainer";
import { toast } from "react-toastify";
import ListContext from "../context/lists/ListContext";
import { getItems } from "../context/lists/ListActions";

function Home() {
  const [categories, setCategories] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  // const [listItems, setListItems] = useState([]);
  const { listItems, listItem, dispatch } = useContext(ListContext);

  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  const getUserDetails = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log(docSnap);
        setUserDetails(docSnap.data());
      } else {
        throw "User Not Found";
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const getEntity = async (collectionName, userId, setState) => {
    const entity = [];
    const entityRef = collection(db, collectionName);
    const categoryQuery = query(entityRef, where("userRef", "==", userId));

    try {
      const querySnap = await getDocs(categoryQuery);
      querySnap.forEach((doc) => {
        return entity.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(entity);
      setState(entity);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    getUserDetails();
    getEntity("categories", user.uid, setCategories);
    const getListItems = async () => {
      const listData = await getItems(user.uid);
      dispatch({ type: "GET_ITEMS", payload: listData });
    };
    getListItems();
    // getEntity("items", user.uid, setListItems);
  }, [dispatch]);

  return (
    <div className="container">
      <SideNav categories={categories} />
      <div className="dashboard">
        <UserContainer name={userDetails.name} />
        <AllBoards listItems={listItems} />
      </div>
    </div>
  );
}

export default Home;
