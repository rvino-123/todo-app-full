import styled from "styled-components";
import colors from "../../theme/colors";
import { ColorIcon } from "../ColorIcon";

const StyledContainer = styled.div`
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

const StyledColorIcon = styled(ColorIcon)`
  border: none;
`;

function CategorySelectItem({ category, isActive, onClick, id }) {
  const { color, name } = category.data;
  return (
    <StyledContainer onClick={onClick} id={id} isActive={isActive}>
      <span id={id}>{name}</span>
      <StyledColorIcon id={id} color={color} />
    </StyledContainer>
  );
}

export default CategorySelectItem;
