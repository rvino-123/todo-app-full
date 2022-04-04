import styled from "styled-components";
import colors from "../../../theme/colors";

export const Input = styled.input`
  width: 40vw;
  height: 7vh;
  font-size: 20px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: ${({ bg }) => bg || colors.darkBlue};
`;
