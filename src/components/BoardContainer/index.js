import styled from "styled-components";
import colors from "../../theme/colors";

export const BoardContainer = styled.div`
  height: 100vh;
  display: grid;
  background: ${colors.white};
  grid-template-columns: 20% auto;
  grid-template-rows:  auto;
`;