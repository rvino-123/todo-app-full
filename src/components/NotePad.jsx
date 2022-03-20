import { useContext, useEffect, useState } from "react";
import { MdEdit, MdCheckCircleOutline } from "react-icons/md";
import { BsEraser } from "react-icons/bs";
import { editNote, getNotes } from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";

function NotePad() {
  const { note, dispatch, loading } = useContext(ListContext);
  const [editMode, setEditMode] = useState(false);
  const [editNoteForm, setEditNoteForm] = useState({
    description: "",
  });

  useEffect(() => {
    const setNoteAfterEdit = async () => {
      const newNote = await getNotes(note.data.itemRef);
      dispatch({ type: "GET_NOTE", payload: newNote });
    };

    setNoteAfterEdit();
  }, [editMode, dispatch, note.data.itemRef]);

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

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="board-content">
      <div>
        {note.data ? (
          editMode ? (
            note.data.description.length === 0 ? (
              <>
                <textarea
                  className="note-text-area"
                  value={editNoteForm.description}
                  onChange={handleChange}
                  placeholder="Write your note."
                ></textarea>
                <div className="notepad-icon">
                  <p>Save Changes</p>
                  <MdCheckCircleOutline size={"24px"} onClick={handleSubmit} />
                  <p>Erase</p>
                  <BsEraser size={"24px"} onClick={handleErase} />
                </div>
              </>
            ) : (
              <>
                <textarea
                  className="note-text-area"
                  value={editNoteForm.description}
                  onChange={handleChange}
                >
                  abraaaah
                </textarea>
                <div className="notepad-icon">
                  <p>Save Changes</p>
                  <MdCheckCircleOutline size={"24px"} onClick={handleSubmit} />
                  <BsEraser size={"24px"} onClick={handleErase} />
                </div>
              </>
            )
          ) : note.data.description.length === 0 ? (
            <>
              <p className="note-text">No Notes for this Task.</p>
              <div className="notepad-icon">
                <p>Add Note</p>
                <MdEdit size={"24px"} onClick={handleClick} id="add-note" />
              </div>
            </>
          ) : (
            <>
              <p className="note-text">{note.data.description}</p>
              <div className="notepad-icon">
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
    </div>
  );
}

export default NotePad;
