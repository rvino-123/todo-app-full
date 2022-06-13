import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledContainer, StyledText } from "./styles";

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
