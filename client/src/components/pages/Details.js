import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  getUserDetails,
  getUserFriendsFollowings,
  getUserFriendsFollowers,
  toFollowSomeone,
  unFollowSomeone
} from "../../redux/actions/userAction";
import { getPostsByUser } from "../../redux/actions/postAction";
import Friend from "../layouts/Friend";
import Post from "../layouts/Post";
import Loader from "../layouts/Loader";
import "../styles/Details.css";
export default function Details({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const logginByUser = useSelector((state) => state.loginOfUser);
  const { userInfo } = logginByUser;

  const userID = match.params.id;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  console.log("user ", user);

  const postByUser = useSelector((state) => state.postByUser);
  const {
    posts,
    loading: postByUserLoading,
    error: postByUserError,
  } = postByUser;

  useEffect(() => {
    if (!userInfo.username) {
      history.push("/");
    }

    dispatch(getUserDetails(userID));
    dispatch(getPostsByUser(userID));
    dispatch(getUserFriendsFollowings(userID));
    dispatch(getUserFriendsFollowers(userID));
  }, [dispatch, userID, history, userInfo]);

  const userFriendsFollowings = useSelector(
    (state) => state.userFriendsFollowings
  );
  const {
    followings,
    loading: followingsLoading,
    error: followingsError,
  } = userFriendsFollowings;

  const userFriendsFollowers = useSelector(
    (state) => state.userFriendsFollowers
  );
  const {
    followers,
    loading: follewerLoading,
    error: follewerError,
  } = userFriendsFollowers;


  /**unfollow or follow */

  const userUnfollow = useSelector(
    (state) => state.userUnfollow
  );
  const {
    followings:unfollowFollowings,
    loading: unfollewingsLoading,
    error: unfollowingsError,
  } 
 = userUnfollow

  const userFollow = useSelector(
    (state) => state.userFollow
  );
  const {
    followings:tofollowFollowings,
    loading: tofollewingsLoading,
    error: tofollowingsError,
  } = userFollow




  return (
    <div className="details">
      <div className="left">
        {loading && <Loader />}
        {error && (
          <p
            style={{ backgroundColor: "red", color: "#fff", padding: ".5rem" }}
          >
            {error}
          </p>
        )}
        <div className="profileCard">
          <div className="cardHeader">
            <div className="profilBg">
              {user && user.coverPicture ? (
                <img
                  src={"/api/uploads/image?filename=" + user.coverPicture}
                  alt=""
                />
              ) : null}
            </div>
            <div className="profileImg">
              {user && user.profilePicture ? (
                <img
                  src={"/api/uploads/image?filename=" + user.profilePicture}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <div className="cardBody">
            {user && user.username ? <h3>{user.username}</h3> : null}

            <div className="friendInfo">
              <button>
                {" "}
                <i className="fas fa-user-friends"></i>
              </button>

              <span>{user.followings && user.followings.length} friends</span>
              <span>
                {userID === userInfo._id ? null : userID ===
                  userInfo._id ? null : userInfo.followings.includes(userID) ? (
                  <button
                    className="unfollow"
                    disabled={userInfo.followings.includes(
                      userID === userInfo._id
                    )}

                    onClick={()=>{
                      dispatch(unFollowSomeone(userID))
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button className="follow" onClick={()=>{
                    dispatch(toFollowSomeone(userID))
                  }}>Follow</button>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="posts">
          {postByUserLoading && <Loader />}
          {postByUserError && (
            <p
              style={{
                backgroundColor: "#FE8F8F",
                color: "#fff",
                padding: ".5rem",
              }}
            >
              {postByUserError}
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
          <h3>{user.username} following</h3>
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
            <h3>{user.username}' followers</h3>
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
