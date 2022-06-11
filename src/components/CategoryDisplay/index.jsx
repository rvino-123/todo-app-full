import { useContext, useState, useEffect } from "react";
import ListContext from "../../context/lists/ListContext";
import Modal from "react-modal/lib/components/Modal";
import CategorySelector from "../CategorySelector";
import { MdAddCircleOutline } from "react-icons/md";
import styled from "styled-components";
import colors from "../../theme/colors";
import { Button } from "../Button/Button";

const StyledContainer = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid ${colors.black};
  border-radius: 50%;
`;

const StyledButton = styled(Button)`
  color: ${colors.white};
  width: 8rem;
  height: 3rem;
  font-size: 18px;
  border-radius: 1rem;
`;

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

function CategoryDisplay({ listItemId, currentCategoryId, board }) {
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
