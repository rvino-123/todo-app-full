import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import { toast } from "react-toastify";
import { getItems } from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";
import { db } from "../firebase.config";
import ListItem from "./ListItem";

function AllBoards({ setListItems, listItems }) {
  const { dispatch } = useContext(ListContext);
  const boardsRef = useRef([]);
  const textInput = useRef;
  boardsRef.current = listItems;
  const auth = getAuth();
  const user = auth.currentUser;
  const initialStatePersonal = {
    description: "",
    board: "personal",
    userRef: user.uid,
    isDone: false,
    isPriority: false,
    categoryRef: "",
  };
  const initialStateProfessional = {
    description: "",
    board: "professional",
    userRef: user.uid,
    isDone: false,
    isPriority: false,
    categoryRef: "",
  };

  const [itemFormPersonal, setItemFormPersonal] = useState();
  const [itemFormProfessional, setItemFormProfessional] = useState();

  useEffect(() => {
    setItemFormPersonal(initialStatePersonal);
    setItemFormProfessional(initialStateProfessional);
  }, [boardsRef]);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "professional":
        setItemFormProfessional((prevState) => ({
          ...prevState,
          description: e.target.value,
        }));
        break;
      case "personal":
        setItemFormPersonal((prevState) => ({
          ...prevState,
          description: e.target.value,
        }));
    }
  };

  const submitListItem = async (e) => {
    let formData = {};
    switch (e.target.id) {
      case "professionalSubmit":
        formData = { ...itemFormProfessional };
        break;
      case "personalSubmit":
        formData = { ...itemFormPersonal };
        break;
    }
    console.log(formData);
    const inputTag = document.getElementsByClassName(`${formData.board}`);
    inputTag.value = "";
    formData.board == "personal"
      ? setItemFormPersonal(initialStatePersonal)
      : setItemFormProfessional(initialStateProfessional);

    if (formData.description == "") {
      return toast.error("Can't Upload Empty Task");
    }
    const id = uuid4();

    formData.timestamp = serverTimestamp();
    boardsRef.current.push({ id, data: formData });
    const listReference = await setDoc(doc(db, "items", id), formData);

    console.log(boardsRef.current);

    toast.success("Task Created");
  };
  return (
    <>
      <div className="board-half" id="board-1">
        <div className="board-title">
          <h1>Personal</h1>
        </div>
        <div className="board-content">
          {listItems &&
            boardsRef.current
              .filter((listitems) => {
                return listitems.data.board == "personal";
              })
              .map((item, index) => {
                // console.log(item);
                return (
                  <ListItem
                    key={item.id}
                    listItem={item.data}
                    listId={item.id}
                    setListItems={setListItems}
                  />
                );
              })}
          <div className="list-item add-icon">
            <div>
              <MdAddCircleOutline
                size={"24px"}
                id="personalSubmit"
                onClick={submitListItem}
                className="submit-list-item"
              />
              <input
                type="text"
                placeholder="Add a task..."
                onChange={handleChange}
                id="personal"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="board-half" id="board-2">
        <div className="board-title">
          <h1>Professional</h1>
        </div>

        <div>
          <div className="board-content">
            {listItems &&
              boardsRef.current
                .filter((listitems) => {
                  return listitems.data.board == "professional";
                })
                .map((item, index) => {
                  // console.log(item);
                  return <ListItem listItem={item.data} key={index} />;
                })}
            <div className="list-item add-icon">
              <div>
                <MdAddCircleOutline
                  size={"24px"}
                  onClick={submitListItem}
                  id="professionalSubmit"
                  className="submit-list-item"
                />
                <input
                  id="professional"
                  type="text"
                  placeholder="Add a task..."
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBoards;
