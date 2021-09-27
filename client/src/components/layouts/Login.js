import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useHistory } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginUser = useSelector((state) => state.userLogin);
  const { loading, userInformation, loginSuccess, error } = loginUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (userInformation && userInformation.name && loginSuccess) {
      setMsg("Login Succsess!");
      setTimeout(() => {
        history.push("/home");
      }, 1500);
    } else {
      history.push("/");
    }
  }, [history, loginSuccess, userInformation, msg]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      {loading && (
        <img
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif "
          alt="spiner"
          width="40px"
          height="40px"
        ></img>
      )}
      {error && (
        <p style={{ backgroundColor: "red", color: "#fff", padding: ".5rem" }}>
          {error}
        </p>
      )}
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        {msg && (
          <p
            style={{
              backgroundColor: "green",
              color: "#fff",
              padding: ".5rem",
            }}
          >
            Login Succsess!
          </p>
        )}
        <div className="loginInput">
          <label>
            <button>
              <i className="far fa-envelope"></i>
            </button>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="loginInput">
          <label>
            <button>
              <i className="fas fa-key"></i>
            </button>
          </label>
          <input
            type="password"
            placeholder="Enter your passoword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="loginInput btn">
          <button className="loginBtn">Login</button>
        </div>
      </form>
    </div>
  );
}
