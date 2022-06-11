import { StyledContainer, StyledColorIcon } from "./styles";

const CategorySelectItem = ({ category, isActive, onClick, id }) => {
  const { color, name } = category.data;
  return (
    <StyledContainer onClick={onClick} id={id} isActive={isActive}>
      <span id={id}>{name}</span>
      <StyledColorIcon id={id} color={color} />
    </StyledContainer>
  );
};

export default CategorySelectItem;
