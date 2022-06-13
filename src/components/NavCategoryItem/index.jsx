import { useState, useEffect, useContext } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListContext from "../../context/lists/ListContext";
import { ColorIcon } from "../ColorIcon";
import { StyledContainer } from "./styles";

const NavCategoryItem = ({ category, categoryId }) => {
  const [isActive, setActive] = useState(false);

  const { dispatch, listItems, filteredItems } = useContext(ListContext);

  useEffect(() => {
    if (isActive) {
      if (filteredItems[0]?.data.categoryRef !== categoryId) {
        setActive(false);
      } else if (filteredItems.length == 0) {
        setActive(true);
      }
    }
  }, [filteredItems]);

  const handleClick = () => {
    if (!isActive) {
      dispatch({ type: "RESET_FILTER" });
      const filteredItems = listItems.filter(
        (item) => item.data.categoryRef === categoryId
      );
      setActive(true);

      dispatch({ type: "FILTER_ITEMS", payload: filteredItems });

      if (filteredItems.length == 0) {
        toast.error("No tasks with this category");
        dispatch({ type: "RESET_FILTER" });
      }
    } else {
      dispatch({ type: "RESET_FILTER" });
      setActive(false);
    }
  };

  return (
    <StyledContainer onClick={handleClick} active={isActive}>
      <span>{category?.name}</span>
      <ColorIcon color={category?.color} active={isActive} />
    </StyledContainer>
  );
};

export default NavCategoryItem;
