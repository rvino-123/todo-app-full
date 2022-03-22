import { useContext, useState, useEffect } from "react";
import ListContext from "../context/lists/ListContext";
import Modal from "react-modal/lib/components/Modal";
import CategorySelector from "./CategorySelector";
import { MdAddCircleOutline } from "react-icons/md";

const customStyles = {
  content: {
    width: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

function SelectCategory({ listItemId, currentCategoryId, board }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { categories } = useContext(ListContext);
  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
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
    return <></>;
  }
  return (
    <>
      {currentCategoryId ? (
        <div
          className="show-category"
          onClick={openModal}
          style={{
            backgroundColor: `${currentCategory && currentCategory.data.color}`,
            border: "none",
          }}
        ></div>
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

        <div className="form-control modal-buttons">
          <button
            type="submit"
            className="modal-submit-button"
            onClick={closeModal}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}

export default SelectCategory;

// Specify PropTypes
