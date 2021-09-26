import React from "react";
import '../styles/Friend.css'
export default function Friend() {
  return (
    <div className="friendCard">
      <div className="friendCard_header">
         
        <img
          src="https://i.pinimg.com/originals/e1/3f/36/e13f36a858f53f2f6918113e787d8d4a.jpg"
          alt=""
        />
        <div className="nameOfFriend">
            <h3>Jesur</h3>
        </div>
      </div>
      <div className="friendCard_body">
        <button className="follow">Follow</button>
        <button className="unfollow">Unfollow</button>
      </div>
    </div>
  );
}
