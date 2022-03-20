import { useContext, useRef, useState } from "react";
import ListContext from "../context/lists/ListContext";
import ListItem from "./ListItem";
import AddItem from "./AddItem";

function ListContent({ boardName }) {
  const { listItems, filteredItems, isFiltered } = useContext(ListContext);
  const [currentboardName] = useState(boardName);
  const listLength = useRef(null);
  listLength.current = listItems.length;
  console.log(listLength);

  // if (isSingleView) {
  return (
    <div className="board-content">
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
    </div>
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
