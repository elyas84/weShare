import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/userAction";
import { useHistory } from "react-router-dom";
import Search from "./Search";
export default function Header() {
  const loginUser = useSelector((state) => state.loginOfUser);
  const { userInfo } = loginUser;
  const dispatch = useDispatch();
  const history = useHistory();
  const [clicked, setClicked] = useState(false);
  const showMenu = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const logoutHandler = () => {
    dispatch(userLogout());
    history.push("/");
  };
  return (
    <div className="header">
      {userInfo && userInfo.username && !userInfo.isAdmin ? (
        <>
          <div className="sectionA">
            <h1>
              <Link to="/home">WeShare</Link>
            </h1>
          </div>

          <Search />

          <div className="sectionC">
            <div className="groupOne">
              <button className="userIcon">
                <i className="fas fa-user"></i>
                <div className="numBadge">3</div>
              </button>
              <button className="notificationIcon">
                <i className="fas fa-bell"></i>
                <div className="numBadge">3</div>
              </button>
            </div>
            <div className="groupTwo">
              <div className="profilePicture" onClick={showMenu}>
                <Link to="/profile">
                  <img
                    src={
                      "/api/uploads/image?filename=" + userInfo.profilePicture
                    }
                    alt=""
                  />
                </Link>

                <span>{userInfo.username}</span>
              </div>
              <div className={clicked ? "navOption active" : "navOption"}>
                <ul>
                  <li onClick={showMenu}>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li onClick={logoutHandler}>
                    <Link to="/" onClick={showMenu}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : userInfo && userInfo.username && userInfo.isAdmin ? (
        <>
          <div className="sectionA">
            <h1>
              <Link to="/home">WeShare</Link>
            </h1>
          </div>
          <Search />
          <div className="sectionC">
            <div className="groupOne">
              <button className="userIcon">
                <i className="fas fa-user"></i>
                <div className="numBadge">3</div>
              </button>
              <button className="notificationIcon">
                <i className="fas fa-bell"></i>
                <div className="numBadge">3</div>
              </button>
            </div>
            <div className="groupTwo">
              <div className="profilePicture" onClick={showMenu}>
                <Link to="/profile">
                  <img
                    src={
                      "/api/uploads/image?filename=" + userInfo.profilePicture
                    }
                    alt=""
                  />
                </Link>

                <span>{userInfo.username}</span>
              </div>
              <div className={clicked ? "navOption active" : "navOption"}>
                <ul>
                  <li onClick={showMenu}>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li onClick={showMenu}>
                    <Link to="/users">my users</Link>
                  </li>
                  <li onClick={logoutHandler}>
                    <Link to="/" onClick={showMenu}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="sectionA">
          <h1>
            <Link to="/home">WeShare</Link>
          </h1>
        </div>
      )}
    </div>
  );
}
