import styled from "styled-components";
import colors from "../../theme/colors";

export const StyledContainer = styled.div`
  padding: 1rem 0;
  font-weight: 300;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid
    ${(props) => (props.active ? colors.hotPink : colors.black)};
  color: ${(props) => (props.active ? colors.hotPink : colors.white)};
`;