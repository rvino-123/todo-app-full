import React, { useContext, useEffect } from "react";
import SideNav from "../components/SideNav";
import { getAuth } from "firebase/auth";
import AllBoards from "../components/AllBoards";
import UserContainer from "../components/UserContainer";
import ListContext from "../context/lists/ListContext";
import { getItems, getCategories } from "../context/lists/ListActions";

function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { listItems, dispatch, categories } = useContext(ListContext);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const getListItemsAndCategories = async () => {
      const listData = await getItems(user.uid);
      dispatch({ type: "GET_ITEMS", payload: listData });
      const categories = await getCategories(user.uid);
      dispatch({ type: "GET_CATEGORIES", payload: categories });
    };
    getListItemsAndCategories();

    // getEntity("items", user.uid, setListItems);
  }, [dispatch, user.uid]);

  return (
    <div className="container">
      <SideNav categories={categories} />
      <div className="dashboard">
        <UserContainer />
        <AllBoards listItems={listItems} />
      </div>
    </div>
  );
}

export default Home;
