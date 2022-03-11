import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import CollapsibleMenu from "./CollapsibleMenu";

const boardRoutes = [
  {
    name: "View All Boards",
    route: "all-boards",
  },
  {
    name: "Personal Board",
    route: "personal",
  },
  {
    name: "Professional Board",
    route: "professional",
  },
];

function SideNav({ categories, setCategories }) {
  return (
    <nav className="sidenav">
      <div className="logo-container">
        <h2>Dashboard</h2>
      </div>
      <CollapsibleMenu
        boardName={boardRoutes[0].name}
        route={boardRoutes[0].route}
        canCreateCat={false}
        categories={categories}
      />
      <CollapsibleMenu
        boardName={boardRoutes[1].name}
        route={boardRoutes[1].route}
        canCreateCat={true}
        categories={categories.filter(
          (cat) => cat.data.board == boardRoutes[1].route
        )}
      />
      <CollapsibleMenu
        boardName={boardRoutes[2].name}
        route={boardRoutes[2].route}
        canCreateCat={true}
        categories={categories.filter(
          (cat) => cat.data.board == boardRoutes[2].route
        )}
      />
    </nav>
  );
}

export default SideNav;
