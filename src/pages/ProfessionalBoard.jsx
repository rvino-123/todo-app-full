import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import SideNav from "../components/SideNav";
import SingleBoard from "../components/SingleBoard";
import { getCategories, getItems } from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";

function ProfessionalBoard() {
  const { listItems, listItem, dispatch, categories } = useContext(ListContext);
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
  }, [dispatch]);
  return (
    <div className="container">
      <SideNav categories={categories} />
      <div className="dashboard">
        <SingleBoard boardName={"professional"} boardTitle={"Professional"} />
      </div>
    </div>
  );
}

export default ProfessionalBoard;
