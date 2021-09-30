import React from "react";
import '../styles/Friend.css'

export default function Friend({friend}) {
  console.log(friend)


  return (
    <div className="friendCard">
      <div className="friendCard_header">
         
        <img
        
        />
        <div className="nameOfFriend">
            <h3>dd</h3>
        </div>
      </div>
      <div className="friendCard_body">
        <button className="follow">Follow</button>
        <button className="unfollow">Unfollow</button>
      </div>
    </div>
  );
}
