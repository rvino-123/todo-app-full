import { StyledContainer } from "./styles";
import NavCategoryItem from "../../NavCategoryItem";
import NavItemSingle from "../../NavItemSingle";
import Accordion from "../../Accordion";
import { useContext } from "react";
import ListContext from "../../../context/lists/ListContext";

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

function SideNav() {
  const { categories } = useContext(ListContext);

  const handleClick = () => {};
  return (
    <StyledContainer>
      <div style={{ height: "10%" }}>
        <h2>Dashboard</h2>
      </div>
      <Accordion name={boardRoutes[0].name} route={boardRoutes[0].route}>
        {categories &&
          categories.map((category) => {
            return (
              <NavCategoryItem
                key={category.id}
                category={category.data}
                categoryId={category.id}
              />
            );
          })}
      </Accordion>
      <Accordion name={boardRoutes[1].name} route={boardRoutes[1].route}>
        {categories &&
          categories
            .filter((cat) => cat.data.board === boardRoutes[1].route)
            .map((category) => (
              <NavCategoryItem
                key={category.id}
                category={category.data}
                categoryId={category.id}
              />
            ))}
      </Accordion>
      <Accordion name={boardRoutes[2].name} route={boardRoutes[2].route}>
        {categories &&
          categories
            .filter((cat) => cat.data.board === boardRoutes[2].route)
            .map((category) => (
              <NavCategoryItem
                key={category.id}
                category={category.data}
                categoryId={category.id}
              />
            ))}
      </Accordion>
      <NavItemSingle
        name={boardRoutes[3].name}
        route={boardRoutes[3].route}
        onClick={handleClick}
      />
    </StyledContainer>
  );
}

export default SideNav;
