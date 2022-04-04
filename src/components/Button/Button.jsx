import styled from "styled-components";
import colors from "../../theme/colors";

export const Button = styled.button`
  background-color: ${({ bg }) => bg || colors.darkBlue};
  height: 40px;
  color: ${({ color }) => color || colors.white};
  height: 40px;
  width: 100px;
  &:hover {
    background: ${({ color }) => color || colors.darkishBlue};
  }
`;
