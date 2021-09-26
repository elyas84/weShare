import React from "react";
import "../styles/Profile.css";
import Post from "../layouts/Post";
export default function Profile() {
  return (
    <div className="myProfile">
      <div className="start">
        <ul className="following">
          <h5>Following</h5>
          <li>Jesur</li>
          <li>Jesur</li>
          <li>Jesur</li>
        </ul>
        <ul className="follower">
          <h5>Followers</h5>
          <li>Jesur</li>
          <li>Jesur</li>
          <li>Jesur</li>
        </ul>
      </div>
      <div className="left">
        <div className="profileCard">
          <div className="cardHeader">
            <div className="profilBg">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
            <div className="profileImg">
              <img
                src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="cardBody">
            <h3>Elyas </h3>
            <div className="friendInfo">
              <button>
                {" "}
                <i className="fas fa-user-friends"></i>
              </button>
              <span>10 friends</span>
            </div>
          </div>
        </div>
        <Post />
      </div>
      <div className="right">
        <h4>Update Profile</h4>
        <form>
          <div className="updateInputs">
            <label htmlFor="bg">
              <i className="fas fa-camera"></i>Background image
            </label>
            <input type="file" id="bg" />
          </div>
          <div className="updateInputs">
            <label htmlFor="profile">
              <i className="fas fa-image"></i>Profile image
            </label>
            <input type="file" id="profile" />
          </div>
        </form>
      </div>
    </div>
  );
}
