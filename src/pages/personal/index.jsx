import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import SideNav from "../../components/layout/Sidenav";
import Header from "../../components/layout/Header";
import { getCategories, getItems } from "../../context/lists/ListActions";
import ListContext from "../../context/lists/ListContext";
import { Board } from "../../components/Board/index";
import { BoardTitle } from "../../components/BoardTitle";
import ListContent from "../../components/ListContent";
import { BoardContainer } from "../../components/BoardContainer";
import NotePad from "../../components/NotePad";

function PersonalBoard() {
  const { note, dispatch } = useContext(ListContext);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const getListItemsAndCategories = async () => {
      const listData = await getItems(user.uid);
      dispatch({ type: "GET_ITEMS", payload: listData });
      const categories = await getCategories(user.uid);
      dispatch({ type: "GET_CATEGORIES", payload: categories });
    };
    getListItemsAndCategories();

    // getEntity("items", user.uid, setListItems);
  }, [dispatch, user.uid]);
  return (
    <BoardContainer>
      <SideNav />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />
        {/* <AllBoards listItems={listItems} /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: "2rem",
            padding: "1rem 2rem",
            marginBottom: "1rem",
          }}
        >
          <Board>
            <BoardTitle>Personal</BoardTitle>
            <ListContent boardName={"personal"} />
          </Board>
          <Board>
            <BoardTitle>Notes</BoardTitle>
            <NotePad noteData={note} />
          </Board>
        </div>
      </div>
    </BoardContainer>
  );
}

export default PersonalBoard;
