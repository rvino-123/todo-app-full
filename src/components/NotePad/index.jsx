import { useContext, useEffect, useState } from "react";
import { MdEdit, MdCheckCircleOutline } from "react-icons/md";
import { BsEraser } from "react-icons/bs";
import { editNote, getNotes } from "../../context/lists/ListActions";
import ListContext from "../../context/lists/ListContext";
import styled from "styled-components";
import colors from "../../theme/colors";

const StyledContainer = styled.div`
  background-color: ${colors.white};
  display: flex;
  padding: 1rem;
  flex-direction: column;
  border-radius: 1rem;
  margin-top: 1rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  max-height: 20rem;
  height: auto;
  resize: none;
  min-height: 10rem;
`;

const StyledText = styled.p`
  border: 1px solid ${colors.black};
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 5px;
  white-space: pre-line;
`;

function NotePad({}) {
  const { note, dispatch, loading } = useContext(ListContext);
  const [editMode, setEditMode] = useState(false);
  const [editNoteForm, setEditNoteForm] = useState({
    description: "",
  });

  useEffect(() => {
    const setNoteAfterEdit = async () => {
      const newNote = await getNotes(note.data?.itemRef);
      dispatch({ type: "GET_NOTE", payload: newNote });
      console.log("launched");
    };

    console.log("useEffect fired");

    setNoteAfterEdit();
  }, [editMode, dispatch, note.length, note.data?.itemRef]);

  const handleClick = () => {
    editMode ? setEditMode(false) : setEditMode(true);
    setEditNoteForm({ description: note.data.description });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING" });
    await editNote(note.id, note.data.itemRef, editNoteForm);
    setEditMode(false);
    setEditNoteForm({ description: "" });
  };

  const handleChange = (e) => {
    setEditNoteForm((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
    console.log(editNoteForm);
  };

  const handleErase = (e) => {
    setEditNoteForm({
      description: "",
    });
  };

  return (
    <StyledContainer>
      <div>
        {note.data ? (
          editMode ? (
            note.data.description.length === 0 ? (
              <>
                <StyledTextArea
                  value={editNoteForm.description}
                  onChange={handleChange}
                  placeholder="Write your note."
                ></StyledTextArea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <p>Save Changes</p>
                  <MdCheckCircleOutline size={"24px"} onClick={handleSubmit} />
                  <p>Erase</p>
                  <BsEraser size={"24px"} onClick={handleErase} />
                </div>
              </>
            ) : (
              <>
                <StyledTextArea
                  value={editNoteForm.description}
                  onChange={handleChange}
                >
                  abraaaah
                </StyledTextArea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <p>Save Changes</p>
                  <MdCheckCircleOutline size={"24px"} onClick={handleSubmit} />
                  <BsEraser size={"24px"} onClick={handleErase} />
                </div>
              </>
            )
          ) : note.data.description.length === 0 ? (
            <>
              <StyledText>No Notes for this Task.</StyledText>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <p>Add Note</p>
                <MdEdit size={"24px"} onClick={handleClick} id="add-note" />
              </div>
            </>
          ) : (
            <>
              <StyledText>{note.data.description}</StyledText>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <p>Edit</p>
                <MdEdit size={"24px"} onClick={handleClick} id="add-note" />
              </div>
            </>
          )
        ) : (
          <></>
        )}
      </div>
      <div></div>
    </StyledContainer>
  );
}

export default NotePad;
