import React, { useState } from "react";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import "../styles/Index.css";

export default function Index() {
  const [clicked, setClicked] = useState(false);
  const openModal = () => {
    setClicked(!clicked);
  };

  return (
    <div className="index" >
      <div className="loginBox">
        <Login openModal={openModal} clicked={clicked} />
      </div>
      <div className={clicked ? "registerModal active" : "registerModal"}>
        <Register openModal={openModal} clicked={clicked} />
      </div>
    </div>
  );
}
