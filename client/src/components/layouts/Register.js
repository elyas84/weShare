import React from 'react'
import '../styles/Register.css'
export default function Register() {
    return (
        <div className="register">
        <form>
          <h2>Register</h2>
          <div className="registerInput">
            <label>
              <button>
                <i className="far fa-user"></i>
              </button>
            </label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="registerInput">
            <label>
              <button>
                <i className="far fa-envelope"></i>
              </button>
            </label>
            <input type="text" placeholder="Enter your emai" />
          </div>
          <div className="registerInput">
            <label>
              <button>
                <i className="fas fa-key"></i>
              </button>
            </label>
            <input type="text" placeholder="Enter your passoword" />
          </div>
          <div className="registerInput regbtn">
            <button className="registerBtn">Register</button>
          </div>
        </form>
      </div>
    )
}
