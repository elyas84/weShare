import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
export default function Post() {
  const [clicked, setClicked] = useState(false);

  const openComment = () => {
    setClicked(!clicked);
  };

  return (
    <div className="post">
      <div className="post_header">
        <div className="avatar">
          <Link to="/profile">
            <img
            src="https://i.pinimg.com/originals/e1/3f/36/e13f36a858f53f2f6918113e787d8d4a.jpg"
            alt=""
          />
          </Link>
          
        </div>
        <p>Elyas</p>
      </div>
      <div className="post_body">
        <img
          src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <p className="caption">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis ipsum
          delectus debitis iure culpa corrupti non corporis aliquid quasi
          labore.
        </p>
      </div>
      <div className="post_footer">
        <button className="like">
          <i className="fas fa-thumbs-up"></i>
        </button>
        <button className="comment" onClick={openComment}>
          <i className="far fa-comment"></i>
        </button>
        <button className="postDate">
          <i className="far fa-clock"></i>
        </button>
        <span className="time">2021/07/21 - 12:43</span>
      </div>
      <div className={clicked ? "commentArea active":"commentArea"}>
        <form>
          <div className="commentInput">
            <button className="type">
              <i className="far fa-comment"></i>
            </button>
            <input type="text" placeholder="Comments..." />
            <button className="send">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="commentSection">
      <div className="post_header">
        <div className="avatar">
          <img
            src="https://i.pinimg.com/originals/e1/3f/36/e13f36a858f53f2f6918113e787d8d4a.jpg"
            alt=""
          />
        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, delectus.</p>
      </div>
      </div>
    </div>
  );
}
