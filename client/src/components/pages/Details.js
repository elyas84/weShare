import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getUserDetails } from "../../redux/actions/userAction";
import { getPostsByUser } from "../../redux/actions/postAction";
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
  console.log(user)

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
  }, [dispatch, userID, history,userInfo]);

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
              {user && user.coverPicture ?  (
                 <img
                src={"/api/uploads/image?filename=" + user.coverPicture}
                alt=""
              />
              ):null}
             
            </div>
            <div className="profileImg">
              {user && user.profilePicture ? (

                 <img
                src={"/api/uploads/image?filename=" + user.profilePicture}
                alt=""
              />
              ):null}
             
            </div>
          </div>
          <div className="cardBody">
            {user && user.username ? (

                <h3>{user.username}</h3>
            ):null}
          
            <div className="friendInfo">
              <button>
                {" "}
                <i className="fas fa-user-friends"></i>
              </button>

              <span>10 friends</span>
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
            ? posts.map((post, id) => (
                <div className="col" key={id}>
                  <Post post={post} />
                </div>
              )).reverse()
            : null}
        </div>
      </div>
      <div className="friendZon">
        <ul className="following">
          <h5>Following</h5>
          <li>Jesur</li>
          <li>Jesur</li>
          <li>Jesur</li>
        </ul>
        <ul className="follower">
          <h5>Followers</h5>
          <li>Jesur</li>
          <li>Jesur</li>
          <li>Jesur</li>
        </ul>
      </div>
    </div>
  );
}
