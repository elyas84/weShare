import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PostForm.css";
import { useDispatch, useSelector } from "react-redux";
import { creatPost } from "../../redux/actions/postAction";
import { POST_CREATE_REST } from "../../redux/constence/postconst";
import axios from "axios";
export default function PostForm() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginOfUser);
  const { userInfo } = loginUser;

  const postCreate = useSelector((state) => state.postCreate);
  const { loading, postSuccess, error } = postCreate;

  useEffect(() => {
    if (postSuccess) {
      window.alert("New post has added! ");
      dispatch({
        type: POST_CREATE_REST,
      });
    }
  }, [postSuccess, dispatch]);

  const [userPost, setUserPost] = useState("");
  const [image, setImage] = useState("");

  // File handler
  const [uploading, setUploading] = useState(false); //
  const fileHandler = async (e) => {
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
      console.log("resImg: ", res.data);

      setImage(res.data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      creatPost({
        _id: userInfo._id,
        desc: userPost,
        imagePost: image.filename,
      })
    );

    setUserPost("");
  };

  return (
    <div className="postForm_container">
      <div className="upperBox">
        <div className="userPic">
          <Link to="/profile">
          <img src={"/api/uploads/image?filename=" +userInfo.profilePicture} alt="" />
          </Link>
        </div>
        <div className="userInputBox">
        {loading && (
        <img
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif "
          alt="spiner"
          width="40px"
          height="40px"
        ></img>
      )}
      {error && (
        <p style={{ backgroundColor: "red", color: "#fff", padding: ".5rem" }}>
          {error}
        </p>
      )}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder={"What are you doing right now "+userInfo.username+" ?"}
              value={userPost}
              onChange={(e) => {
                setUserPost(e.target.value);
              }}
            />
            <div className="bottomBox">
              <div className="fileUpload">
                <label htmlFor="fileUpload">
                  <i className="far fa-image"></i>
                </label>
                <input type="file" id="fileUpload" onChange={fileHandler} />
              </div>
              <div className="postBtn">
                <button type="submit">Post</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
