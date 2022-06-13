import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  editCategory,
  getCategory,
  getItems,
} from "../../context/lists/ListActions";
import ListContext from "../../context/lists/ListContext";
import { MdAddCircleOutline, MdOutlineDelete } from "react-icons/md";
import Modal from "react-modal/lib/components/Modal";
import { TwitterPicker } from "react-color";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  customStyles,
  StyledContainer,
  StyledTable,
  StyledColorIcon,
  FormContainer,
  StyledInput,
  StyledSelect,
  StyledButton,
} from "./styles";
import colors from "../../theme/colors";

const CategoryTable = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const { categories, category, dispatch } = useContext(ListContext);

  const auth = getAuth();
  const user = auth.currentUser;

  const [newCategoryForm, setNewCategoryForm] = useState({
    name: "",
    color: "",
    board: "",
    userRef: user.uid,
  });

  const [editCategoryForm, setEditCategoryForm] = useState({
    name: "",
    color: "",
    userRef: "",
  });

  const openCreateModal = () => setCreateModalIsOpen(true);
  const closeCreateModal = () => setCreateModalIsOpen(false);

  const openEditModal = async (e) => {
    const categoryRes = await getCategory(e.target.id);
    dispatch({ type: "GET_CATEGORY", payload: categoryRes });
    setEditCategoryForm(category.data);

    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setEditCategoryForm({
      name: "",
      color: "",
      board: "",
      userRef: user.uid,
    });
  };

  useEffect(() => {
    const addCategories = async (userId) => {
      const results = await getCategories(userId);
      // TODO
      dispatch({ type: "GET_CATEGORIES", payload: results });
    };

    addCategories(user.uid);
  }, [dispatch, user.uid]);

  const handleDelete = async (e) => {
    const listItems = await getItems(user.uid);
    console.log(listItems);
    const foundItem = listItems.find((x) => x.data.categoryRef === e.target.id);
    if (foundItem) {
      return toast.error(
        "Please unlink this category from all list items before proceding."
      );
    }
    await deleteCategory(e.target.id);
    const results = await getCategories(user.uid);
    dispatch({ type: "GET_CATEGORIES", payload: results });
  };

  const handleChangeCreateForm = (e) => {
    setNewCategoryForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeEditForm = (e) => {
    setEditCategoryForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeCompleteCreate = (color, e) => {
    setNewCategoryForm((prevState) => ({
      ...prevState,
      color: color.hex,
    }));
  };
  const handleChangeCompleteEdit = (color, e) => {
    setEditCategoryForm((prevState) => ({
      ...prevState,
      color: color.hex,
    }));
  };
  const submitNewCategory = async (e) => {
    e.preventDefault();
    const formData = newCategoryForm;
    if (
      formData.board === "" ||
      formData.name === "" ||
      formData.color === ""
    ) {
      toast.error("Missing Data, Try again. ");
    } else {
      await createCategory(formData);
    }
    closeCreateModal();
    const results = await getCategories(user.uid);
    dispatch({ type: "GET_CATEGORIES", payload: results });
  };

  const submitEditedCategory = async (e) => {
    e.preventDefault();
    closeEditModal();
    const formData = editCategoryForm;
    if (formData.name === "" || formData.color === "") {
      toast.error("Missing Data, Try again. ");
    } else {
      await editCategory(category.id, formData);
    }

    const results = await getCategories(user.uid);
    dispatch({ type: "GET_CATEGORIES", payload: results });
  };

  return (
    <StyledContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Board</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.data.name}</td>
                <td>{category.data.board}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <StyledColorIcon color={category.data.color} />
                </td>
                <td>
                  <BsThreeDots
                    size="26px"
                    onClick={openEditModal}
                    id={category.id}
                  />
                  <MdOutlineDelete
                    size={"26px"}
                    color={"red"}
                    style={{ marginLeft: "10px" }}
                    id={category.id}
                    onClick={handleDelete}
                  />
                </td>
              </tr>
            );
          })}
          <tr style={{ border: "none" }}>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <MdAddCircleOutline size={"28px"} onClick={openCreateModal} />
            </td>
          </tr>
        </tbody>
      </StyledTable>
      <Modal
        isOpen={createModalIsOpen}
        onRequestClose={closeCreateModal}
        style={customStyles}
        contentLabel="Add Category"
      >
        <h2>Create Category</h2>

        <form onSubmit={submitNewCategory}>
          <FormContainer>
            <label htmlFor="name">Choose a Name</label>
            <StyledInput
              type="text"
              placeholder="Name"
              id="name"
              onChange={handleChangeCreateForm}
              value={newCategoryForm.name}
              bg={colors.lightGray}
            />
          </FormContainer>
          <FormContainer>
            <label htmlFor="board">Select A Board</label>
            <StyledSelect
              name="board"
              id="board"
              onChange={handleChangeCreateForm}
            >
              <option selected disabled>
                Board
              </option>
              <option value="personal">Personal</option>
              <option value="professional">Professional</option>
            </StyledSelect>
          </FormContainer>
          <FormContainer>
            <h3>Pick a Color</h3>
            <TwitterPicker
              onChangeComplete={handleChangeCompleteCreate}
              id="color"
            />
          </FormContainer>
          <FormContainer>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <StyledButton
                type="button"
                onClick={closeCreateModal}
                background={colors.red}
              >
                Back
              </StyledButton>
              <StyledButton type="submit" background={colors.darkBlue}>
                Confirm
              </StyledButton>
            </div>
          </FormContainer>
        </form>
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        style={customStyles}
        contentLabel="Add Category"
      >
        <h2>Edit Category</h2>

        <form onSubmit={submitEditedCategory}>
          <FormContainer>
            <label htmlFor="name">Choose a Name</label>
            <StyledInput
              type="text"
              placeholder="New Name"
              id="name"
              onChange={handleChangeEditForm}
              bg={colors.lightGray}
            />
          </FormContainer>
          <FormContainer>
            <h3>Pick a Color</h3>
            <TwitterPicker
              onChangeComplete={handleChangeCompleteEdit}
              id="color"
            />
          </FormContainer>
          <FormContainer>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <StyledButton
                type="button"
                onClick={closeEditModal}
                background={colors.red}
              >
                Back
              </StyledButton>
              <StyledButton type="submit" background={colors.darkBlue}>
                Confirm
              </StyledButton>
            </div>
          </FormContainer>
        </form>
      </Modal>
    </StyledContainer>
  );
};

export default CategoryTable;
