import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import { useSelector, useDispatch } from "react-redux";
export default function Post({ post }) {
 
  const loginOfUser = useSelector((state) => state.loginOfUser);
  const { userInfo } = loginOfUser;
  const [clicked, setClicked] = useState(false);

  const openComment = () => {
    setClicked(!clicked);
  };
 console.log(userInfo);
  return (
    <div className="post">
      <div className="post_header">
        <div className="avatar">
          <Link to="/profile">
          
           
               <img src={"/api/uploads/image?filename=" + userInfo.profilePicture} alt="" />
          
         
          </Link>
        </div>
        <p>{ post && post.createdBy.username}</p>
      </div>

      {post && post.imagePost ? (
        <>
          <div className="post_body">
            <img
              src={"/api/uploads/image?filename=" + post.imagePost}
              alt="userPost"
            />
            <p className="caption">{post.desc}</p>
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
          <div className={clicked ? "commentArea active" : "commentArea"}>
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
              <img src={"/api/uploads/image?filename=" +userInfo.profilePicture} alt="" />
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe,
                delectus.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="post_card_nonImg">
          <div className="post_body">
            <p className="caption">{post && post.desc}</p>
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
          <div className={clicked ? "commentArea active" : "commentArea"}>
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
              <img src={"/api/uploads/image?filename=" +userInfo.profilePicture} alt="" />
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe,
                delectus.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
