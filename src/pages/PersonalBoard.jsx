import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import SideNav from "../components/SideNav";
import SingleBoard from "../components/SingleBoard";
import UserContainer from "../components/UserContainer";
import { getCategories, getItems } from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";

function PersonalBoard() {
  const { dispatch, categories } = useContext(ListContext);
  const auth = getAuth();
  const user = auth.currentUser;

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
        <SingleBoard boardName={"personal"} boardTitle={"Personal"} />
      </div>
    </div>
  );
}

export default PersonalBoard;
