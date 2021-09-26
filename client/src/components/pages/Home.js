import React from "react";
import Friend from "../layouts/Friend";
import Post from "../layouts/Post";
import PostForm from "../layouts/PostForm";
import "../styles/Home.css";
export default function Home() {
  return (
    <div className="home">
      <div className="feed">
        <div className="postFeed">
          <PostForm />
        </div>
        <div className="posts">
          <Post />
          <Post />
          <Post />
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
