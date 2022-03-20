import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function UserContainer() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    return auth.signOut();
  };
  return (
    <div className="user-container">
      <div className="dropdown">
        <div
          src="./assets/images/profile-picture.jpg"
          alt="user"
          className="profile-image"
        >
          <FaUserCircle size={"44px"} color={"grey"} />
        </div>
        <span>{user.displayName}</span>

        <img src="./assets/arrow-down-black.svg" alt="" className="dropbtn" />
        <div className="dropdown-content">
          <div href="#">Account Settings</div>
          <div href="#">Notification Preferences</div>
          <div href="#" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserContainer;
