import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { createItem, getItems } from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";

function AddItem({ boardName, listLength }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const { dispatch } = useContext(ListContext);

  const [formData, setFormData] = useState({
    description: "",
    board: boardName,
    userRef: user.uid,
    isDone: false,
    isDeleted: false,
    isPriority: false,
    categoryRef: "",
  });

  const { description } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const submitListItem = async (e) => {
    let formDataCopy = formData;
    console.log(formData);

    if (formDataCopy.description === "") {
      return toast.error("Can't Upload Empty Task");
    }
    console.log(listLength);
    formData.rank = listLength + 1;

    const newItem = await createItem(formData);

    const newItems = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newItems });
    setFormData((prevState) => ({
      ...prevState,
      description: "",
    }));
  };
  return (
    <div className="list-item add-icon">
      <div>
        <MdAddCircleOutline
          size={"24px"}
          onClick={submitListItem}
          className="submit-list-item"
        />
        <input
          id="description"
          type="text"
          placeholder="Add a task..."
          value={description}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default AddItem;
