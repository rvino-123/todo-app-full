import { useState, useEffect, useContext } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdFlag,
  MdOutlinedFlag,
  MdAddCircleOutline,
} from "react-icons/md";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  filterListItemsByCategory,
  getItems,
} from "../context/lists/ListActions";
import ListContext from "../context/lists/ListContext";
import { getAuth } from "firebase/auth";

function CollapsibleMenu({ boardName, route, categories, setModalIsOpen }) {
  const [isActive, setActive] = useState(false);
  const [subMenuActive, setSubMenuActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  // const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const { listItems, dispatch, isFiltered } = useContext(ListContext);

  useEffect(() => {
    if (location.pathname.slice(1) == route) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location]);

  const navigateOnClick = () => {
    if (!isActive) {
      setActive(true);
    } else {
      setActive(false);
    }

    if (location.pathname.slice(1) !== route) {
      navigate(`/${route}`);
    }
  };

  const filterByCategory = async (e) => {
    if (!isFiltered) {
      console.log(e.target.id);
      const filteredItems = filterListItemsByCategory(e.target.id, listItems);
      dispatch({ type: "FILTER_ITEMS", payload: filteredItems });
      setFilterActive(true);
    } else {
      dispatch({ type: "RESET_FILTER" });
      setFilterActive(false);
    }
  };

  const filterByPriority = () => {
    if (!isFiltered) {
      const filteredItems = listItems.filter((item) => item.data.isPriority);
      dispatch({ type: "FILTER_ITEMS", payload: filteredItems });
      setFilterActive(true);
    } else {
      dispatch({ type: "RESET_FILTER" });
      setFilterActive(false);
    }
  };

  return (
    <>
      <div
        className={`link collapsible ${isActive ? "active" : ""}`}
        onClick={navigateOnClick}
      >
        <span>{boardName}</span>
        {isActive ? (
          <MdOutlineKeyboardArrowDown size={"26px"} />
        ) : (
          <MdOutlineKeyboardArrowRight size={"26px"} />
        )}
      </div>
      {isActive && (
        <div className={`sublinks collapsible`}>
          <div className="sublink" onClick={filterByPriority}>
            <span>Priority</span>
            <MdFlag size={"22px"} color={"red"} />
          </div>
          {categories &&
            categories.map((cat) => {
              return (
                <div
                  className="sublink"
                  onClick={filterByCategory}
                  key={cat.id}
                  id={cat.id}
                >
                  <span id={cat.id}>{cat.data.name}</span>
                  <div
                    className="category-color"
                    style={{ backgroundColor: `${cat.data.color}` }}
                    id={cat.id}
                  ></div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default CollapsibleMenu;
