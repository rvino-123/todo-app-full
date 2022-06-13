import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  MdFlag,
  MdOutlinedFlag,
  MdOutlineDelete,
  MdOutlineInfo,
} from "react-icons/md";
import {
  editListItem,
  getItems,
  getNotes,
  createNote,
} from "../../context/lists/ListActions";
import ListContext from "../../context/lists/ListContext";
import CategoryDisplay from "../CategoryDisplay";
import colors from "../../theme/colors";
import { StyledContainer, ListStyle, IconsContainer } from "./styles";

function ListItem({ listItem, listId }) {
  const { description, isDone, isPriority, categoryRef } = listItem;
  const [editList] = useState(listItem);
  const [hover, setHover] = useState(false);
  const { dispatch, listItems } = useContext(ListContext);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleChecked = async () => {
    let formData = editList;
    const NUMBER_OF_NOTES = listItems.length;

    if (isDone) {
      formData["isDone"] = false;
      formData["rank"] = 0;
    } else {
      formData["isDone"] = true;
      formData["rank"] = NUMBER_OF_NOTES + 1;
    }
    // TO DO
    editList.EditedAt = serverTimestamp();
    await editListItem(listId, formData);
    const newLists = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newLists });
  };

  const handleClick = async (e) => {
    // TODO
    // Not sure if need to fix though
    const note = await getNotes(listId);
    if (!note) {
      await createNote({ description: "", itemRef: listId });
    }
    const newNote = await getNotes(listId);
    dispatch({ type: "GET_NOTE", payload: note || newNote });
  };

  const handlePriority = async () => {
    let formData = editList;
    isPriority
      ? (formData["isPriority"] = false)
      : (formData["isPriority"] = true);

    editList.EditedAt = serverTimestamp();
    await editListItem(listId, formData);
    const newLists = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newLists });
  };

  const handleDelete = async () => {
    let formData = editList;
    formData["isDeleted"] = true;

    editList.EditedAt = serverTimestamp();
    await editListItem(listId, formData);
    const newLists = await getItems(user.uid);
    dispatch({ type: "GET_ITEMS", payload: newLists });
  };

  useEffect(() => {
    return () => setHover(false);
  }, [categoryRef]);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <StyledContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListStyle
        textDecoration={isDone ? "line-through" : ""}
        textColor={isDone ? colors.battleshipGrey : colors.black}
      >
        <input type="checkbox" checked={isDone} onChange={handleChecked} />
        <span>{description}</span>
      </ListStyle>
      <IconsContainer>
        {categoryRef && (
          <CategoryDisplay
            listItemId={listId}
            board={listItem?.board}
            currentCategoryId={categoryRef}
          />
        )}
        <MdOutlineInfo size={"24px"} onClick={handleClick} />
        {isDone ? (
          <MdFlag size={"24px"} color={"grey"} />
        ) : isPriority ? (
          <MdFlag size={"24px"} color={"red"} onClick={handlePriority} />
        ) : (
          <MdOutlinedFlag
            size={"24px"}
            color={"red"}
            onClick={handlePriority}
          />
        )}

        {hover && (
          <>
            {categoryRef ? (
              <></>
            ) : (
              <CategoryDisplay
                listItemId={listId}
                board={listItem?.board}
                currentCategoryId={categoryRef}
              />
            )}

            <MdOutlineDelete size={"22px"} onClick={handleDelete} />
          </>
        )}
      </IconsContainer>
    </StyledContainer>
  );
}

export default ListItem;
