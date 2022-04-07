import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { createItem, getItems } from "../../context/lists/ListActions";
import ListContext from "../../context/lists/ListContext";
import styled from "styled-components";
import { Input } from "../Forms/standalone/Input";
import colors from "../../theme/colors";

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled(Input)`
  border: none;
  height: 100%;
  width: 80%;
  background-color: ${colors.white};
  font-size: 14px;
  align-self: center;

  &:focus {
    outline: none;
  }
`;

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
    formData.rank = 0;

    await createItem(formData);

    const newItems = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newItems });
    setFormData((prevState) => ({
      ...prevState,
      description: "",
    }));
  };
  return (
    <StyledContainer>
      <div style={{ display: "flex" }}>
        <MdAddCircleOutline
          size={"24px"}
          onClick={submitListItem}
          className="submit-list-item"
        />
        <StyledInput
          id="description"
          type="text"
          placeholder="Add a task..."
          value={description}
          onChange={handleChange}
        />
      </div>
    </StyledContainer>
  );
}

export default AddItem;
