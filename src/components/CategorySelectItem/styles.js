
import styled from "styled-components";
import colors from "../../theme/colors";
import { ColorIcon } from "../ColorIcon";
export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: ${(props) =>
    props.isActive ? colors.lightGray : colors.white};
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const StyledColorIcon = styled(ColorIcon)`
  border: none;
`;