import React from "react";

function UserContainer({ name }) {
  return (
    <div className="user-container">
      <div className="dropdown">
        <img
          src="./assets/images/profile-picture.jpg"
          alt="user"
          className="profile-image"
        />
        <span>{name}</span>

        <img src="./assets/arrow-down-black.svg" alt="" className="dropbtn" />
        <div className="dropdown-content">
          <a href="#">Account Settings</a>
          <a href="#">Notification Preferences</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </div>
  );
}

export default UserContainer;
