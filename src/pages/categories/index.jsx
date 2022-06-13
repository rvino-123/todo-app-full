import CategoryTable from "../../components/CategoryTable";
import Header from "../../components/layout/Header";
import SideNav from "../../components/layout/Sidenav";
import styled from "styled-components";
import colors from "../../theme/colors";
import { BoardContainer } from "../../components/BoardContainer";

function Categories() {
  return (
    <BoardContainer>
      <SideNav />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <CategoryTable />
      </div>
    </BoardContainer>
  );
}

export default Categories;
