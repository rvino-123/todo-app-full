import styed from 'styled-components'


function CreateCategoryForm({category}) {
    const [newCategoryForm, setNewCategoryForm] = useState({
        name: "",
        color: "",
        board: "",
        userRef: user.uid,
      });

    
      const submitNewCategory = () => {

    }

    const handleChange = () => {
        setNewCategoryForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
          }));
    }

    const handleChangeCompleteCreate = () => {

    }


  return (
    <form onSubmit={submitNewCategory}>
          <div className="form-control">
            <label htmlFor="name">Choose a Name</label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={handleChange}
              value={newCategoryForm.name}
            />
          </div>
          <div className="form-control">
            <label htmlFor="board">Select A Board</label>
            <select name="board" id="board" onChange={handleChange}>
              <option selected disabled>
                Board
              </option>
              <option value="personal">Personal</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <div className="form-control">
            <h3>Pick a Color</h3>
            <TwitterPicker
              onChangeComplete={handleChangeCompleteCreate}
              id="color"
            />
          </div>
          <div className="form-control modal-buttons">
            <button
              type="button"
              onClick={closeEditModal}
              className="modal-close-button"
              id="modal-close"
            >
              Back
            </button>
            <button type="submit" className="modal-submit-button">
              Confirm
            </button>
          </div>
        </form>
  )
}

export default CreateCategoryForm


