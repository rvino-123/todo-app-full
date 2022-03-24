import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { MdFlag, MdOutlinedFlag, MdOutlineDelete } from "react-icons/md";
import {
  editListItem,
  getItems,
  getNotes,
  createNote,
} from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";
import SelectCategory from "./SelectCategory";

function ListItemSingle({ listItem, listId }) {
  const { description, isDone, isPriority, categoryRef } = listItem;
  const [editList] = useState(listItem);
  const [hover, setHover] = useState(false);
  const { dispatch } = useContext(ListContext);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleChecked = async () => {
    let formData = editList;
    isDone ? (formData["isDone"] = false) : (formData["isDone"] = true);

    editList.EditedAt = serverTimestamp();
    await editListItem(listId, formData);
    const newLists = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newLists });
  };

  const handleClick = async (e) => {
    const note = await getNotes(listId);
    if (!note) {
      await createNote({ description: "", itemRef: listId });
    }
    const newNote = await getNotes(listId);
    dispatch({ type: "GET_NOTE", payload: note || newNote });
  };

  const handlePriority = async () => {
    let formData = editList;
    isPriority
      ? (formData["isPriority"] = false)
      : (formData["isPriority"] = true);

    editList.EditedAt = serverTimestamp();
    await editListItem(listId, formData);
    const newLists = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newLists });
  };

  const handleDelete = async () => {
    let formData = editList;
    formData["isDeleted"] = true;

    editList.EditedAt = serverTimestamp();
    await editListItem(listId, formData);
    const newLists = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newLists });
  };

  useEffect(() => {
    return () => setHover(false);
  }, [categoryRef]);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <div
      className="list-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={isDone ? "completed" : ""}>
        <input type="checkbox" checked={isDone} onChange={handleChecked} />
        <span>{description}</span>
      </div>
      <div className="icons-list">
        {categoryRef && (
          <SelectCategory
            listItemId={listId}
            board={listItem?.board}
            currentCategoryId={categoryRef}
          />
        )}
        {isDone ? (
          <MdFlag size={"24px"} color={"grey"} />
        ) : isPriority ? (
          <MdFlag size={"24px"} color={"red"} onClick={handlePriority} />
        ) : (
          <MdOutlinedFlag
            size={"24px"}
            color={"red"}
            onClick={handlePriority}
          />
        )}

        {hover && (
          <>
            {categoryRef ? (
              <></>
            ) : (
              <SelectCategory
                listItemId={listId}
                board={listItem?.board}
                currentCategoryId={categoryRef}
              />
            )}

            <MdOutlineDelete size={"22px"} onClick={handleDelete} />
          </>
        )}
      </div>
    </div>
  );
}

export default ListItemSingle;
