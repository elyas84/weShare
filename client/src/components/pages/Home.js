import React, { useEffect } from "react";
import Friend from "../layouts/Friend";
import Post from "../layouts/Post";
import PostForm from "../layouts/PostForm";
import "../styles/Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPosts } from "../../redux/actions/postAction";
export default function Home() {

  const history = useHistory();
  const dispatch = useDispatch();
  const logginByUser = useSelector((state)=>state.loginOfUser)
  const {userInfo} = logginByUser;
  


  const postCreate = useSelector((state) => state.postCreate);
  const { postSuccess } = postCreate;

  const postList = useSelector((state) => state.postList);
  const { loading, posts, error } = postList;
  console.log("poslist: ", posts);


  useEffect(()=>{
    if(!userInfo.name){
      history.push("/")
    }
    dispatch(getPosts());
  }, [userInfo, history, dispatch, postSuccess]);
  return (
    <div className="home">
      <div className="feed">
        <div className="postFeed">
          <PostForm />
        </div>
        <div className="posts">
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
          {posts && posts.length ? posts.map((post, id)=>(
            <div className="col" key={id}>
              <Post post={post}/>
            </div>
          )).reverse()
          : null}
         
        </div>
      </div>

      <div className="friends">
        <ul>
          <li>
            <Friend />
            <Friend />
            <Friend />
           
          </li>
        </ul>
      </div>
    </div>
  );
}
