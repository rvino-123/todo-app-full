import { useContext, useEffect } from "react";
import SideNav from "../../components/layout/Sidenav";
import Header from "../../components/layout/Header";
import { getAuth } from "firebase/auth";
import ListContext from "../../context/lists/ListContext";
import { getItems, getCategories } from "../../context/lists/ListActions";
import { BoardTitle } from "../../components/BoardTitle";
import { BoardContainer } from "../../components/BoardContainer";
import { Board } from "../../components/Board/index";
import ListContent from "../../components/ListContent/index";

function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { listItems, dispatch, categories } = useContext(ListContext);

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
            <ListContent boardName={"personal"} completed={false} />
            <ListContent boardName={"personal"} completed={true} />
          </Board>
          <Board>
            <BoardTitle>Professional</BoardTitle>
            <ListContent boardName={"professional"} completed={false} />
            <ListContent boardName={"professional"} completed={true} />
          </Board>
        </div>
      </div>
    </BoardContainer>
  );
}

export default Home;
