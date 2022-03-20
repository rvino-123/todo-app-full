import React, { useContext } from "react";
import ListContext from "../context/lists/ListContext";
import CollapsibleMenu from "./CollapsibleMenu";
import NavItem from "./NavItem";

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
  {
    name: "Manage Categories",
    route: "categories",
  },
];

function SideNav({ setModalIsOpen }) {
  const { categories } = useContext(ListContext);
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
          (cat) => cat.data.board === boardRoutes[1].route
        )}
        setModalIsOpen={setModalIsOpen}
      />
      <CollapsibleMenu
        boardName={boardRoutes[2].name}
        route={boardRoutes[2].route}
        canCreateCat={true}
        categories={categories.filter(
          (cat) => cat.data.board === boardRoutes[2].route
        )}
        setModalIsOpen={setModalIsOpen}
      />
      <NavItem name={boardRoutes[3].name} route={boardRoutes[3].route} />
    </nav>
  );
}

export default SideNav;
