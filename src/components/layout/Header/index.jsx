import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import styled from "styled-components";
import {
  DropDownDiv,
  DropDownItem,
  StyledContainer,
  UserContainer,
} from "./styles";
import { getAuth } from "firebase/auth";

function Header() {
  const [active, setActive] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

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
          <span>{user.displayName}</span>
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
