import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/userAction";
import { useHistory } from "react-router-dom";
export default function Header() {
  const loginUser = useSelector((state) => state.userLogin);
  const { userInformation } = loginUser;
  const dispatch = useDispatch();
  const history = useHistory();
  const [clicked, setClicked] = useState(false);
  const showMenu = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    if (!userInformation) {
      history.push("/");
    }
  }, [history, userInformation]);

  const logoutHandler = () => {
    dispatch(userLogout());
    history.push("/");
  };
  return (
    <div className="header">
      {userInformation && userInformation.name ? (
        <>
          <div className="sectionA">
            <h1>
              <Link to="/home">WeShare</Link>
            </h1>
          </div>
          <div className="sectionB">
            <button className="searchIcon">
              <i className="fas fa-search"></i>
            </button>
            <form>
              <input type="text" placeholder="Search friends" />
            </form>
          </div>
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
                    src="https://i.pinimg.com/originals/e1/3f/36/e13f36a858f53f2f6918113e787d8d4a.jpg"
                    alt=""
                  />
                </Link>

                <span>Elyas</span>
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
