import React from "react";
import "../utils/Auth.css";

const EditProfile = () => {
  return (
    <div class="center">
      <h1>Edit Profile</h1>
      <form>
        <div class="txt_field">
          <input type="text" required />
          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field">
          <input type="text" required />
          <span></span>
          <label>Email</label>
        </div>
        <div class="txt_field">
          <input type="password" required />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default EditProfile;
