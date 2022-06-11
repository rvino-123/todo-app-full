import styled from "styled-components";
import { Input } from "../Forms/standalone/Input";
import colors from "../../theme/colors";


export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;
  justify-content: space-between;
  align-items: center;
`;

export const StyledInput = styled(Input)`
  border: none;
  height: 100%;
  width: 80%;
  background-color: ${colors.white};
  font-size: 14px;
  align-self: center;

  &:focus {
    outline: none;
  }
`;