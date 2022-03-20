import { useContext, useEffect, useState } from "react";
import ListContext from "../context/lists/ListContext";
import Modal from "react-modal/lib/components/Modal";
import { getCategory } from "../context/lists/ListActions";
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
  const [hover, setHover] = useState(false);

  const { categories, dispatch } = useContext(ListContext);
  const [currentCategory, setCurentCategory] = useState(
    categories.filter((cat) => cat.id === currentCategoryId)[0]
  );

  const openModal = async () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setHover(false);
  };

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = (e) => setHover(false);

  return (
    <>
      {currentCategoryId ? (
        <div
          className="show-category"
          onClick={openModal}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          style={{
            backgroundColor: `${currentCategory.data.color}`,
            border: "none",
          }}
        ></div>
      ) : (
        <MdAddCircleOutline
          size={"24px"}
          onClick={openModal}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
        />
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
