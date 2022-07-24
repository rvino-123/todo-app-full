import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
  DropDownDiv,
  DropDownItem,
  StyledContainer,
  UserContainer,
} from "./styles";
import { useContext } from "react";
import UserContext from "../../../context/users/UserContext";
import { getAuth } from "firebase/auth";

const auth = getAuth();

function Header() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  // const auth = getAuth();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {}, [currentUser]);

  const handleLogout = () => {
    navigate("/login");
    return auth.signOut();
  };

  const handleClick = () => setActive(!active);

  return (
    <StyledContainer>
      <UserContainer onClick={handleClick}>
        <FaUserCircle size={"44px"} color={"grey"} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{currentUser?.name}</span>
          {active ? (
            <MdOutlineKeyboardArrowUp size={"20px"} />
          ) : (
            <MdOutlineKeyboardArrowDown size={"20px"} />
          )}
        </div>
      </UserContainer>
      {active && (
        <DropDownDiv>
          <DropDownItem>Account Settings</DropDownItem>
          <DropDownItem>Notification Preferences</DropDownItem>
          <DropDownItem onClick={handleLogout}>Logout</DropDownItem>
        </DropDownDiv>
      )}
    </StyledContainer>
  );
}

export default Header;
