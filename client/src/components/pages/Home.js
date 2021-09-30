import React, { useEffect } from "react";
import Friend from "../layouts/Friend";
import Post from "../layouts/Post";
import PostForm from "../layouts/PostForm";
import "../styles/Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPosts } from "../../redux/actions/postAction";
import { getUserDetails } from "../../redux/actions/userAction";
import Loader from "../layouts/Loader";
export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logginByUser = useSelector((state) => state.loginOfUser);
  const { userInfo } = logginByUser;

  const postCreate = useSelector((state) => state.postCreate);
  const { postSuccess } = postCreate;

  const postList = useSelector((state) => state.postList);
  const { loading, posts, error } = postList;

  const postOfDelete = useSelector((state) => state.postOfDelete);
  const { deleteSuccess } = postOfDelete;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userDetailLoading, user, error: userDetailError } = userDetails;



  useEffect(() => {
    if (!userInfo.username) {
      history.push("/");
    }

    dispatch(getPosts());
    dispatch(getUserDetails("profile"))

  }, [userInfo, history, dispatch, postSuccess, deleteSuccess]);

  return (
    <div className="home">
      <div className="feed">
        <div className="postFeed">
          <PostForm />
        </div>
        <div className="posts">
          {loading && (
           <Loader />
          )}
          {error && (
            <p
              style={{
                backgroundColor: "#FE8F8F",
                color: "#fff",
                padding: ".5rem",
              }}
            >
              {error}
            </p>
          )}
          {posts && posts.length
            ? posts
                .map((post, id) => (
                  <div className="col" key={id}>
                    <Post post={post} />
                  </div>
                ))
                .reverse()
            : null}
        </div>
      </div>

      <div className="friends">
      {userDetailLoading && (
           <Loader />
          )}
          {userDetailError && (
            <p
              style={{
                backgroundColor: "#FE8F8F",
                color: "#fff",
                padding: ".5rem",
              }}
            >
              {userDetailError}
            </p>
          )}
      </div>
    </div>
  );
}
