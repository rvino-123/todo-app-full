import styled from "styled-components";
import colors from "../../theme/colors";


export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;
  justify-content: space-between;
`;

export const ListStyle = styled.div`
  text-decoration: ${(props) => props.textDecoration};
  color: ${(props) => props.textColor};
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 5px;
`;