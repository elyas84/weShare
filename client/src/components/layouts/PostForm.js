import React from "react";
import { Link } from "react-router-dom";
import "../styles/PostForm.css";
export default function PostForm() {
  return (
    <div className="postForm_container">
      <div className="upperBox">
        <div className="userPic">
          <Link to="/profile">
               <img
            src="https://i.pinimg.com/originals/e1/3f/36/e13f36a858f53f2f6918113e787d8d4a.jpg"
            alt=""
          />
          </Link>
       
        </div>
        <div className="userInputBox">
          <form>
            <input
              type="text"
              placeholder="What are you doing right now Elyas?"
            />
          </form>
        </div>
      </div>
      <div className="bottomBox">
        <div className="fileUpload">
          <label htmlFor="fileUpload">
            <i className="far fa-image"></i>
          </label>
          <input type="file" id="fileUpload" />
        </div>
        <div className="postBtn">
            <button>Post</button>
        </div>
      </div>
    </div>
  );
}
