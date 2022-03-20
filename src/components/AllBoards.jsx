import ListContent from "./ListContent";

function AllBoards() {
  return (
    <>
      <div className="board-half" id="board-1">
        <div className="board-title">
          <h1>Personal</h1>
        </div>
        <ListContent boardName={"personal"} />
      </div>
      <div className="board-half" id="board-2">
        <div className="board-title">
          <h1>Professional</h1>
        </div>

        <div>
          <ListContent boardName={"professional"} />
        </div>
      </div>
    </>
  );
}

export default AllBoards;
