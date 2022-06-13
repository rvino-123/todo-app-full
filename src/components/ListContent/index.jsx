import { useContext, useEffect, useRef, useState } from "react";
import ListContext from "../../context/lists/ListContext";
import ListItem from "../ListItem/index";
import AddItem from "../AddItem";
import { StyledContainer } from "./styles";
import { useLocation } from "react-router-dom";

const ListContent = ({ boardName, completed }) => {
  const { listItems, filteredItems, isFiltered } = useContext(ListContext);
  const completedItems = listItems.filter((listItem) => listItem.data.isDone);
  const [hidden, setHidden] = useState(false);
  const [currentboardName] = useState(boardName);

  useEffect(() => {
    const checkIfHidden = () => {
      if (
        completed &&
        completedItems.filter((listItem) => listItem.data.board === boardName)
          .length === 0
      ) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    checkIfHidden();
  }, [completedItems]);

  if (hidden) {
    return <></>;
  }

  return (
    <StyledContainer>
      {isFiltered ? (
        <>
          {filteredItems &&
            filteredItems
              .filter((listitems) => {
                if (completed) {
                  return (
                    listitems.data.board === boardName && listitems.data.isDone
                  );
                } else {
                  return (
                    listitems.data.board === boardName && !listitems.data.isDone
                  );
                }
              })
              .map((item) => {
                // console.log(item);
                return (
                  <ListItem
                    key={item.id}
                    listItem={item.data}
                    listId={item.id}
                  />
                );
              })}
        </>
      ) : (
        <>
          {listItems &&
            listItems
              .filter((listitems) => {
                if (completed) {
                  return (
                    listitems.data.board === boardName && listitems.data.isDone
                  );
                } else {
                  return (
                    listitems.data.board === boardName && !listitems.data.isDone
                  );
                }
              })
              .map((item) => {
                // console.log(item);
                return (
                  <ListItem
                    key={item.id}
                    listItem={item.data}
                    listId={item.id}
                  />
                );
              })}
        </>
      )}

      {completed ? "" : <AddItem boardName={currentboardName} />}
    </StyledContainer>
  );
};

export default ListContent;
