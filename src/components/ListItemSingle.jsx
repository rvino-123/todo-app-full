import { getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { MdFlag, MdOutlinedFlag, MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  editListItem,
  getItems,
  deleteListItem,
  getNotes,
  createNote,
} from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";
import { db } from "../firebase.config";

// Plan to edit/add category
// When hover, an empty circle or plus icon appears.
// User can click on that and a select appears for available categories.
// options should only be available depending on the board.

function ListItem({ listItem, listId }) {
  const { description, isDone, isPriority, categoryRef } = listItem;
  const [editList, setEditList] = useState(listItem);
  // State for modal.
  const [hover, setHover] = useState(false);
  const { dispatch } = useContext(ListContext);
  const auth = getAuth();
  const user = auth.currentUser;

  // Get all Categories

  const handleChecked = async () => {
    let formData = editList;
    isDone ? (formData["isDone"] = false) : (formData["isDone"] = true);

    editList.EditedAt = serverTimestamp();
    await editListItem(listId, formData);
    const newLists = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newLists });
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

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleClick = async (e) => {
    const note = await getNotes(listId);
    if (!note) {
      await createNote({ description: "", itemRef: listId });
    }
    const newNote = await getNotes(listId);
    dispatch({ type: "GET_NOTE", payload: note || newNote });
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
        {/* Add menu icon here */}
        {hover && <MdOutlineDelete size={"22px"} onClick={handleDelete} />}
      </div>
    </div>
  );
}

export default ListItem;
