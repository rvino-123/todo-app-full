import styled from "styled-components";
import colors from "../../theme/colors";
import { Button } from "../Button/Button";

export const StyledContainer = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid ${colors.black};
  border-radius: 50%;
`;

export const StyledButton = styled(Button)`
  color: ${colors.white};
  width: 8rem;
  height: 3rem;
  font-size: 18px;
  border-radius: 1rem;
`;

export const customStyles = {
  content: {
    width: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};