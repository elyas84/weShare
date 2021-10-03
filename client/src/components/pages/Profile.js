import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import Post from "../layouts/Post";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserDetails, profileUpdate } from "../../redux/actions/userAction";
import { getMyPostList } from "../../redux/actions/postAction";
import { USER_PROFILE_UPDATE_REST } from "../../redux/constence/userConst";
import axios from "axios";
import Loader from "../layouts/Loader";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logginByUser = useSelector((state) => state.loginOfUser);
  const { userInfo, loginSuccess } = logginByUser;
  const [loginSucc, setLoginSucc] = useState(loginSuccess);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const {
    loading: updateLodaing,
    error: updateError,
    updateSuccess,
  } = userProfileUpdate;

  const postMyList = useSelector((state) => state.postMyList);
  const {
    myPostList,
    loading: myPostListLoading,
    error: myPostListError,
  } = postMyList;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [bg, setBg] = useState("");

  useEffect(() => {
    if (!userInfo.username) {
      history.push("/");
    } else {
      if (updateSuccess) {
        dispatch({ type: USER_PROFILE_UPDATE_REST });

        dispatch(getUserDetails("profile"));
        setLoginSucc(false);
      } else {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
        dispatch(getMyPostList());
      }
    }
  }, [dispatch, userInfo, user, updateSuccess, history, loginSucc]);
  useEffect(() => {
    if (updateSuccess) {
      window.alert("Your profile now is updated!");
    }
  }, [updateSuccess]);

  // File handler ProfilePic
  const [uploadingProfile, setUploadingProfile] = useState(false); //
  const fileHandlerProfile = async (e) => {
    const file = e.target.files[0]; //sigle file
    const formData = new FormData();
    formData.append("myFile", file);
    setUploadingProfile(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/api/uploads/", formData, config);
      // console.log("resImg: ", res.data);
      setImage(res.data);
      setUploadingProfile(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  // File handler coverPic
  const [uploading, setUploading] = useState(false); //
  const fileHandlerCover = async (e) => {
    const file = e.target.files[0]; //sigle file
    const formData = new FormData();
    formData.append("myFile", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/api/uploads/", formData, config);
      setBg(res.data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      profileUpdate({
        id: user._id,
        username,
        email,
        password,
        profilePicture: image.filename,
        coverPicture: bg.filename,
      })
    );
  };

  return (
    <div className="myProfile">
      <div className="left">
        <div className="profileCard">
          <div className="cardHeader">
            <div className="profilBg">
              <img
                src={"/api/uploads/image?filename=" + userInfo.coverPicture}
                alt=""
              />
            </div>
            <div className="profileImg">
              <img
                src={"/api/uploads/image?filename=" + userInfo.profilePicture}
                alt=""
              />
            </div>
          </div>
          <div className="cardBody">
            <h3>{userInfo.username}</h3>
            <div className="friendInfo">
              <button>
                {" "}
                <i className="fas fa-user-friends"></i>
              </button>

              <span>
                {userInfo.followings && userInfo.followings.length} friends
              </span>
            </div>
          </div>
        </div>
        <div className="posts">
          {myPostListLoading && <Loader />}
          {myPostListError && (
            <p
              style={{
                backgroundColor: "#FE8F8F",
                color: "#fff",
                padding: ".5rem",
              }}
            >
              {myPostListError}
            </p>
          )}
          {myPostList && myPostList.length
            ? myPostList
                .map((post, id) => (
                  <div className="col" key={id}>
                    <Post post={post} />
                  </div>
                ))
                .reverse()
            : null}
        </div>
      </div>
      <div className="right">
        <h4>Update Profile</h4>
        {updateLodaing && <Loader />}
        {updateError && (
          <p
            style={{
              backgroundColor: "red",
              color: "#fff",
              padding: ".5rem",
            }}
          >
            {updateError}
          </p>
        )}
        <form onSubmit={updateHandler}>
          <div className="updateInputs">
            <label htmlFor="bg">
              <i className="fas fa-camera"></i>Background image
            </label>
            <input type="file" id="bg" onChange={fileHandlerCover} />
          </div>
          <div className="updateInputs">
            <label htmlFor="profile">
              <i className="fas fa-image"></i>Profile image
            </label>
            <input type="file" id="profile" onChange={fileHandlerProfile} />
          </div>

          <div className="updateInputs">
            <label>
              <button>
                <i className="far fa-user"></i>
              </button>
            </label>
            <input
              type="text"
              placeholder="new username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="updateInputs">
            <label>
              <button>
                <i className="far fa-envelope"></i>
              </button>
            </label>
            <input
              type="email"
              placeholder="new email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="updateInputs">
            <label>
              <button>
                <i className="fas fa-key"></i>
              </button>
            </label>
            <input
              type="password"
              placeholder="new passoword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="updateBtn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
