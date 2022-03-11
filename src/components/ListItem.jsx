import { getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { editListItem, getItems } from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";
import { db } from "../firebase.config";

function ListItem({ listItem, listId }) {
  const { description, isDone, isPriority, categoryRef } = listItem;
  const [editList, setEditList] = useState(listItem);
  const { dispatch } = useContext(ListContext);
  const auth = getAuth();
  const user = auth.currentUser;

  //   console.log(isDone);
  //   console.log(listItem);
  const handleChecked = async () => {
    let formData = editList;

    if (!isDone) {
      formData["isDone"] = true;
    } else {
      formData["isDone"] = false;
    }
    console.log(formData);
    editList.timestamp = serverTimestamp();
    console.log(listId);
    await editListItem(listId, formData);
    const newLists = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newLists });
  };

  return (
    <div className="list-item">
      <div className={isDone ? "completed" : ""}>
        <input type="checkbox" checked={isDone} onChange={handleChecked} />
        <span>{description}</span>
      </div>
    </div>
  );
}

export default ListItem;
