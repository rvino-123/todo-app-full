import { useContext, useEffect, useState } from "react";
import { MdEdit, MdCheckCircleOutline } from "react-icons/md";
import { BsEraser } from "react-icons/bs";
import { editNote, getNotes } from "../../context/lists/ListActions";
import ListContext from "../../context/lists/ListContext";
import { StyledTextArea, StyledContainer, StyledText } from "./styles";

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
