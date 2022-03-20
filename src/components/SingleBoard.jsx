import ListContent from "./ListContent";
import NotePad from "./NotePad";

function SingleBoard({ boardName, boardTitle }) {
  return (
    <>
      <div className="board-half" id="board-1">
        <div className="board-title">
          <h1>{boardTitle}</h1>
        </div>
        <ListContent boardName={boardName} isSingleView={true} />
      </div>
      <div className="board-half" id="board-2">
        <div className="board-title">
          <h1>Notes</h1>
        </div>

        <div>
          <NotePad />
        </div>
      </div>
    </>
  );
}

export default SingleBoard;
