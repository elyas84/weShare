import React, { useEffect } from "react";
import Friend from "../layouts/Friend";
import Post from "../layouts/Post";
import PostForm from "../layouts/PostForm";
import "../styles/Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPosts } from "../../redux/actions/postAction";
import { getFollowings, getFollowers } from "../../redux/actions/userAction";
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

  const userFollowings = useSelector((state) => state.userFollowings);
  const {
    followings,
    loading: followingsLoading,
    error: followingsError,
  } = userFollowings;

  const userFollowes = useSelector((state) => state.userFollowes);
  const {
    followers,
    loading: follewerLoading,
    error: follewerError,
  } = userFollowes;

  useEffect(() => {
    if (!userInfo.username) {
      history.push("/");
    }

    dispatch(getPosts());
    dispatch(getFollowings(userInfo._id));
    dispatch(getFollowers(userInfo._id));
  }, [userInfo, history, dispatch, postSuccess, deleteSuccess]);

  return (
    <div className="home">
      <div className="feed">
        <div className="postFeed">
          <PostForm />
        </div>
        <div className="posts">
          {loading && <Loader />}
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
        <div className="followingContainer">
          <h3>{userInfo.username} following</h3>
          {followingsLoading && <Loader />}
          {followingsError && (
            <p
              style={{
                backgroundColor: "#FE8F8F",
                color: "#fff",
                padding: ".5rem",
              }}
            >
              {followingsError}
            </p>
          )}
          <div className="row">
            {followings && followings.length
              ? followings.map((fr, id) => (
                  <div className="col" key={id}>
                    <Friend fr={fr} />
                  </div>
                ))
              : null}
          </div>
        </div>
        <>
          <div className="followingContainer">
            <h3>{userInfo.username}' followers</h3>
            {follewerLoading && <Loader />}
            {follewerError && (
              <p
                style={{
                  backgroundColor: "#FE8F8F",
                  color: "#fff",
                  padding: ".5rem",
                }}
              >
                {follewerError}
              </p>
            )}
            <div className="row">
              {followers && followers.length
                ? followers.map((fr, id) => (
                    <div className="col" key={id}>
                      <Friend fr={fr} />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
