import React from "react";
import "../styles/Login.css";
export default function Login() {
  return (
    <div className="login">
      <form>
        <h2>Login</h2>
        <div className="loginInput">
          <label>
            <button>
              <i className="far fa-envelope"></i>
            </button>
          </label>
          <input type="text" placeholder="Enter your emai" />
        </div>
        <div className="loginInput">
          <label>
            <button>
              <i className="fas fa-key"></i>
            </button>
          </label>
          <input type="text" placeholder="Enter your passoword" />
        </div>
        <div className="loginInput btn">
          <button className="loginBtn">Login</button>
        </div>
      </form>
    </div>
  );
}
