import { useState } from "react";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
import { MdAddCircleOutline } from "react-icons/md";

function AddItem() {
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
  );
}

export default AddItem;
