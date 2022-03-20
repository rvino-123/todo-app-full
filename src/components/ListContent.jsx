import { useContext, useRef, useState } from "react";
import ListContext from "../context/lists/ListContext";
import ListItem from "./ListItem";
import { MdAddCircleOutline } from "react-icons/md";
import AddItem from "./AddItem";
import ListItemSingle from "./ListItemSingle";

function ListContent({ boardName, isSingleView }) {
  const { listItems, filteredItems, isFiltered, dispatch } =
    useContext(ListContext);
  const [currentboardName, setBoardName] = useState(boardName);
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
                return listitems.data.board == boardName;
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
                return listitems.data.board == boardName;
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
