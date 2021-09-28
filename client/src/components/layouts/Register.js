import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userAction";
import { USER_REG_REST } from "../../redux/constence/userConst";
export default function Register() {
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.registerOfUser);
  const { loading, userInfo, registerSuccess, error } = registerUser;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passoword, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (userInfo && registerSuccess) {
      setMsg("Register Succsess!");

      dispatch({
        type: USER_REG_REST,
      });
    }
  }, [registerSuccess, userInfo, dispatch, msg]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(name, username, email, passoword));

    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register">
      {loading && (
        <img
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
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
        <h2>Register</h2>
        {msg && (
          <p
            style={{
              backgroundColor: "green",
              color: "#fff",
              padding: ".5rem",
            }}
          >
            Register Succsess, please login in.
          </p>
        )}
        <div className="registerInput">
          <label>
            <button>
              <i className="far fa-user"></i>
            </button>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="registerInput">
          <label>
            <button>
              <i className="far fa-user"></i>
            </button>
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="registerInput">
          <label>
            <button>
              <i className="far fa-envelope"></i>
            </button>
          </label>
          <input
            type="email"
            placeholder="Enter your emai"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="registerInput">
          <label>
            <button>
              <i className="fas fa-key"></i>
            </button>
          </label>
          <input
            type="password"
            placeholder="Enter your passoword"
            value={passoword}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="registerInput regbtn">
          <button className="registerBtn">Register</button>
        </div>
      </form>
    </div>
  );
}
