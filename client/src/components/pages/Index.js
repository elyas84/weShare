import React from "react";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import "../styles/Index.css";

export default function Index() {
  


  return (
    <div className="index">
      <div className="loginBox">
        <Login />
      </div>
      <div className="registerBox">
        <Register />
      </div>
    </div>
  );
}
