import CategoryTable from "../../components/CategoryTable";
import Header from "../../components/layout/Header";
import SideNav from "../../components/layout/Sidenav";
import styled from "styled-components";
import colors from "../../theme/colors";

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  background: ${colors.white};
  grid-template-columns: 22% auto;
  grid-template-rows: auto;
`;

function Categories() {
  return (
    <StyledContainer>
      <SideNav />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <CategoryTable />
      </div>
    </StyledContainer>
  );
}

export default Categories;
