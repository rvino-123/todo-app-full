import { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdFlag,
  MdAddCircleOutline,
} from "react-icons/md";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function CollapsibleMenu({ boardName, route, canCreateCat, categories }) {
  const [isActive, setActive] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    color: "",
  });

  // const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleChange = (e) => {};

  useEffect(() => {
    if (location.pathname.slice(1) == route) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location]);

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
          <div className="sublink">
            <span>Priority</span>
            <MdFlag size={"22px"} color={"red"} />
          </div>
          {categories &&
            categories.map((cat) => {
              return (
                <div className="sublink">
                  <span>{cat.data.name}</span>
                  <div
                    className="category-color"
                    style={{ backgroundColor: `${cat.data.color}` }}
                  ></div>
                </div>
              );
            })}
          {canCreateCat && (
            <div className="sublink">
              <span>Add A Category</span>
              <MdAddCircleOutline size={"24px"} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CollapsibleMenu;
