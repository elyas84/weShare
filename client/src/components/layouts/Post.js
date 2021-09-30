import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Post.css";
import { useSelector, useDispatch } from "react-redux";
import { postDelete } from "../../redux/actions/postAction";
export default function Post({ post }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginOfUser = useSelector((state) => state.loginOfUser);
  const { userInfo } = loginOfUser;
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  const openComment = () => {
    setClicked(!clicked);
  };

  const removePost = () => {
    if (window.confirm("Are you sure ?")) {
      dispatch(postDelete(post._id));
    }
  };

  return (
    <div className="post">
      <div className="post_header">
        <div className="avatar">
          {userInfo._id === post.createdBy._id ? (
            <Link to="/profile">
              <img
                src={
                  "/api/uploads/image?filename=" + post.createdBy.profilePicture
                }
                alt=""
              />
            </Link>
          ) : (
            <Link to={"/user-profile/" + post.createdBy._id}>
              <img
                src={
                  "/api/uploads/image?filename=" + post.createdBy.profilePicture
                }
                alt=""
              />
            </Link>
          )}
        </div>
        <p>{post && post.createdBy.username}</p>
        {userInfo._id === post.createdBy._id || userInfo.isAdmin ? (
          <div className="deleteIcon">
            <button
              className="delete"
              onClick={() => {
                removePost();
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ) : null}
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
            {post && post.createdAt && (
              <span className="time">
                {post.createdAt.substring(0, 10)}
                &nbsp;{post.createdAt.substring(11, 16)}
              </span>
            )}
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
                <img
                  src={
                    "/api/uploads/image?filename=" +
                    post.createdBy.profilePicture
                  }
                  alt=""
                />
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
                <img
                  src={"/api/uploads/image?filename=" + userInfo.profilePicture}
                  alt=""
                />
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
