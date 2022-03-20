import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function NavItem({ name, route }) {
  const [isActive, setActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.slice(1) == route) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location]);

  const navigateOnClick = () => {
    if (location.pathname.slice(1) !== route) {
      navigate(`/${route}`);
    }
  };

  return (
    <div
      className={`link ${isActive ? "active" : ""}`}
      onClick={navigateOnClick}
    >
      <span>{name}</span>
      <MdOutlineKeyboardArrowRight size={"26px"} />
    </div>
  );
}

export default NavItem;
