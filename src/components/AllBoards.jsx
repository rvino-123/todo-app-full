import { useContext } from "react";
import { filterListItemsByCategory } from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";
import ListContent from "./ListContent";

function AllBoards() {
  const { dispatch, listItems } = useContext(ListContext);
  const handleClick = () => {
    const filteredItems = filterListItemsByCategory(
      "326417a6-28e4-44a4-b57a-e1ab25029f48",
      listItems
    );
    dispatch({ type: "FILTER_ITEMS", payload: filteredItems });
  };
  return (
    <>
      <div className="board-half" id="board-1">
        <div className="board-title">
          <h1>Personal</h1>
        </div>
        <ListContent boardName={"personal"} />
      </div>
      <div className="board-half" id="board-2">
        <div className="board-title">
          <h1>Professional</h1>
        </div>

        <div>
          <ListContent boardName={"professional"} />
        </div>
      </div>
    </>
  );
}

export default AllBoards;
