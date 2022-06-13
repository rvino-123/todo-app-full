import { useContext, useState, useEffect } from "react";
import ListContext from "../../context/lists/ListContext";
import Modal from "react-modal/lib/components/Modal";
import CategorySelector from "../CategorySelector";
import { MdAddCircleOutline } from "react-icons/md";
import { StyledContainer, StyledButton, customStyles } from "./styles";

function CategoryDisplay({ listItemId, currentCategoryId, board }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { categories } = useContext(ListContext);
  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    // TODO: Could this be a function or passed on as Prop?
    setLoading(true);
    setCurrentCategory(
      categories.filter((cat) => cat.id === currentCategoryId)[0]
    );
    setLoading(false);
  }, [currentCategoryId, categories]);

  const openModal = async () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      {currentCategoryId ? (
        <StyledContainer
          className="show-category"
          onClick={openModal}
          style={{
            backgroundColor: `${currentCategory && currentCategory.data.color}`,
            border: "none",
          }}
        ></StyledContainer>
      ) : (
        <MdAddCircleOutline size={"24px"} onClick={openModal} />
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Category"
      >
        <h2 style={{ textAlign: "center" }}>Select Category</h2>
        <CategorySelector
          currentCategory={currentCategoryId}
          board={board}
          listItem={listItemId}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <StyledButton
            type="submit"
            className="modal-submit-button"
            onClick={closeModal}
          >
            Confirm
          </StyledButton>
        </div>
      </Modal>
    </>
  );
}

export default CategoryDisplay;
