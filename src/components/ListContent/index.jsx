import { useContext, useRef, useState } from "react";
import ListContext from "../../context/lists/ListContext";
import ListItem from "../ListItem/index";
import AddItem from "../AddItem";
import styled from "styled-components";
import colors from "../../theme/colors";

const StyledContainer = styled.div`
  background: ${colors.white};
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  flex-direction: column;
  margin-top: 1rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

function ListContent({ boardName }) {
  const { listItems, filteredItems, isFiltered } = useContext(ListContext);
  const [currentboardName] = useState(boardName);
  const listLength = useRef(null);
  listLength.current = listItems.length;
  console.log(listLength);

  // if (isSingleView) {
  return (
    <StyledContainer>
      {isFiltered ? (
        <>
          {filteredItems &&
            filteredItems
              .filter((listitems) => {
                return listitems.data.board === boardName;
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
                return listitems.data.board === boardName;
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

      <AddItem boardName={currentboardName} listLength={listLength.current} />
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
