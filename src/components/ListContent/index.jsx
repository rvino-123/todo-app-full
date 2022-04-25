import { useContext, useEffect, useRef, useState } from "react";
import ListContext from "../../context/lists/ListContext";
import ListItem from "../ListItem/index";
import AddItem from "../AddItem";
import styled from "styled-components";
import colors from "../../theme/colors";
import { useLocation } from "react-router-dom";

const StyledContainer = styled.div`
  background: ${colors.white};
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  flex-direction: column;
  margin-top: 1rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

function ListContent({ boardName, completed }) {
  const location = useLocation();
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
}

//   return (
//     <div className="board-content">
//       {listItems &&
//         listItems
//           .filter((listitems) => {
//             return listitems.data.board == boardName;
//           })
//           .map((item, index) => {
//             // console.log(item);
//             return (
//               <ListItem key={item.id} listItem={item.data} listId={item.id} />
//             );
//           })}
//       <AddItem boardName={currentboardName} listLength={listLength.current} />
//     </div>
//   );
// }

export default ListContent;
