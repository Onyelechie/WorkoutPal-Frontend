import { useState } from "react";
import Navbar from "../Navbar";
import Profile from "../Profile";

function UserProfile() {
  return (
    <>
      <Navbar />
      <div id="profileContainer">
        <div id="sidebar">
        </div>
        <Profile/>
      </div>
    </>
  );
}

export default UserProfile;
