import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
// import { getPosts } from "../../redux/actions/postAction";
export default function Search() {
  // const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;


  // search for a products

  // const searchUser =   users.filter((byName) => {
  //     return byName.username.toLowerCase().includes(key.toLowerCase());
  //   });
 

  return (
    <div className="sectionB">
      <button className="searchIcon">
        <i className="fas fa-search"></i>
      </button>
      {loading && (
       <Loader />
      )}
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
      <form>
        <input
          type="text"
          placeholder="Search friends"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
