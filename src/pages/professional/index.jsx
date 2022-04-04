import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import SideNav from "../../components/layout/Sidenav";
import Header from "../../components/layout/Header";
import { getCategories, getItems } from "../../context/lists/ListActions";
import ListContext from "../../context/lists/ListContext";
import { Board } from "../../components/Board/index";
import ListContent from "../../components/ListContent";
import styled from "styled-components";
import colors from "../../theme/colors";
import NotePad from "../../components/NotePad";

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  background: ${colors.white};
  grid-template-columns: 22% auto;
  grid-template-rows: auto;
`;
const BoardTitle = styled.div`
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background: ${colors.white};
  font-weight: bold;
  font-size: 28px;
`;

function PersonalBoard() {
  const { dispatch } = useContext(ListContext);
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
    <StyledContainer>
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
            <BoardTitle>Professional</BoardTitle>
            <ListContent boardName={"professional"} />
          </Board>
          <Board>
            <BoardTitle>Notes</BoardTitle>
            <NotePad />
          </Board>
        </div>
      </div>
    </StyledContainer>
  );
}

export default PersonalBoard;
