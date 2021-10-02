import React from "react";
import "../styles/Friend.css";
import {Link} from 'react-router-dom'
export default function Friend({ fr }) {
  // console.log(fr);

  return (
    <div className="friendCard">
      <Link to={"/user-profile/" + fr._id}>
       <div className="friendCard_header">
        {fr && fr.profilePicture && (
          <img
            src={"/api/uploads/image?filename=" + fr.profilePicture}
            alt=""
          />
        )}

        <div className="nameOfFriend">
          {fr && fr.username && <p>{fr.username}</p>}
        </div>
      </div>
      </Link>
    </div>
  );
}
