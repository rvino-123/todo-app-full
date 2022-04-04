import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../theme/colors";

const StyledContainer = styled.div`
  padding: 1rem 0;
  font-weight: 300;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid
    ${(props) => (props.active ? colors.hotPink : colors.black)};
  color: ${(props) => (props.active ? colors.hotPink : colors.white)};
`;

const StyledText = styled.div`
  color: ${(props) => props.color};
`;

function NavItemSingle({ name, route }) {
  const [isActive, setActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === `/${route}`) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [route, location]);

  const handleClick = () => navigate(`/${route}`);

  return (
    <StyledContainer onClick={handleClick} active={isActive}>
      <StyledText>{name}</StyledText>
      <MdOutlineKeyboardArrowRight size={"26px"} />
    </StyledContainer>
  );
}

export default NavItemSingle;
