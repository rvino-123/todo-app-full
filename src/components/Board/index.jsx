import styled from "styled-components";
import colors from "../../theme/colors";

export const Board = styled.div`
  background: ${colors.battleshipGrey};
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
