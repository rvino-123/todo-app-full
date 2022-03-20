import ListContext from "../context/lists/ListContext";
import CategorySelectItem from "./CategorySelectItem";
import { useContext } from "react";
import { addCategoryToListItem, getItems } from "../context/lists/ListActions";
import { getAuth } from "firebase/auth";

function CategorySelector({ currentCategory, board, listItem }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const { categories, dispatch } = useContext(ListContext);
  const handleClick = async (e) => {
    console.log(e.target.id);
    await addCategoryToListItem(listItem, e.target.id);
    const allItems = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: allItems });
  };
  return (
    <div className="category-selector-grid">
      {categories
        .filter((cat) => cat.data.board === board)
        .map((category) => {
          return (
            <CategorySelectItem
              category={category}
              key={category.id}
              id={category.id}
              onClick={handleClick}
              isActive={currentCategory === category.id ? true : false}
            />
          );
        })}
    </div>
  );
}

export default CategorySelector;
