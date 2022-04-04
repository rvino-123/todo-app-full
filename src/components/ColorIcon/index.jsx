import styled from "styled-components";
import colors from "../../theme/colors";

export const ColorIcon = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.active ? colors.hotPink : colors.black)};
  background-color: ${(props) => props.color || colors.lightGray};
`;
