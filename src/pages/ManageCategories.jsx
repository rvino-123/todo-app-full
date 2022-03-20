import CategoryTable from "../components/CategoryTable";
import SideNav from "../components/SideNav";
import UserContainer from "../components/UserContainer";

function ManageCategories() {
  return (
    <div className="container">
      <SideNav />
      <div className="dashboard">
        <UserContainer />
        <CategoryTable />
      </div>
    </div>
  );
}

export default ManageCategories;
