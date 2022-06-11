import styled from "styled-components";
import { ColorIcon } from "../ColorIcon";
import { Input } from "../Forms/standalone/Input";
import colors from "../../theme/colors";

export const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

export const StyledContainer = styled.div`
  grid-area: 2 / span 2;
  padding: 2rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  & tr {
    border-bottom: 1px solid black;
  }

  & td,
  th {
    padding: 1rem;
    text-align: center;
  }
`;

export const StyledColorIcon = styled(ColorIcon)`
  border: none;
  height: 25px;
  width: 25px;
`;

export const FormContainer = styled.div`
  margin-bottom: 2rem;
  & label {
    display: block;
    font-size: 24px;
  }
`;

export const StyledInput = styled(Input)`
  width: 30vw;
  border-radius: 5px;
`;

export const StyledSelect = styled.select`
  width: 30vw;
  height: 7vh;
  border-radius: 5px;
  background: ${colors.lightGray};
  font-size: 20px;
`;

export const StyledButton = styled.button`
  background-color: ${(props) => props.background};
  color: ${colors.white};
  width: 8rem;
  height: 3rem;
  font-size: 18px;
  border-radius: 1rem;
`;