import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REG_REQUEST,
  USER_REG_SUCCESS,
  USER_REG_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_FOLLOWING_REQUEST,
  USER_FOLLOWING_SUCCESS,
  USER_FOLLOWING_FAIL,
  USER_FOLLWERS_REQUEST,
  USER_FOLLWERS_SUCCESS,
  USER_FOLLWERS_FAIL,
  USER_FRIENDS_FOLLOWING_REQUEST,
  USER_FRIENDS_FOLLOWING_SUCCESS,
  USER_FRIENDS_FOLLOWING_FAIL,
  USER_FRIENDS_FOLLWERS_REQUEST,
  USER_FRIENDS_FOLLWERS_SUCCESS,
  USER_FRIENDS_FOLLWERS_FAIL,
  USER_TO_FOLLOW_REQUEST,
  USER_TO_FOLLOW_SUCCESS,
  USER_TO_FOLLOW_FAIL,
  USER_TO_UNFOLLOW_REQUEST,
  USER_TO_UNFOLLOW_SUCCESS,
  USER_TO_UNFOLLOW_FAIL,
} from "../constence/userConst";

import axios from "axios";

export const register =
  (name, username, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REG_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        "/api/users/register",
        { name, username, email, password },
        config
      );

      dispatch({
        type: USER_REG_SUCCESS,
        payload: res.data,
      });

      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      dispatch({
        type: USER_REG_FAIL,

        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: USER_LOGOUT,
  });
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const response = await axios.get("/api/users/" + id, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const profileUpdate = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });
    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const response = await axios.put("/api/users/profile", user, config);

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: response.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const res = await axios.get("/api/users", config);

    dispatch({
      type: USER_LIST_SUCCESS,

      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };
    await axios.delete("/api/users/" + id, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFollowings = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_FOLLOWING_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const response = await axios.get(
      "/api/users/followingsfriends/" + id,
      config
    );
    // console.log(response.data)

    dispatch({
      type: USER_FOLLOWING_SUCCESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_FOLLOWING_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFollowers = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_FOLLWERS_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const response = await axios.get(
      "/api/users/followerfriends/" + id,
      config
    );

    dispatch({
      type: USER_FOLLWERS_SUCCESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_FOLLWERS_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserFriendsFollowings = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_FRIENDS_FOLLOWING_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const response = await axios.get(
      "/api/users/friendsfollowings/" + id,
      config
    );
    // console.log(response.data)

    dispatch({
      type: USER_FRIENDS_FOLLOWING_SUCCESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_FRIENDS_FOLLOWING_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserFriendsFollowers = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_FRIENDS_FOLLWERS_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const response = await axios.get(
      "/api/users/friendsfollowers/" + id,
      config
    );

    dispatch({
      type: USER_FRIENDS_FOLLWERS_SUCCESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_FRIENDS_FOLLWERS_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toFollowSomeone = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_TO_FOLLOW_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const response = await axios.put("/api/users/" + id + "/follow", config);

    dispatch({
      type: USER_TO_FOLLOW_SUCCESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_TO_FOLLOW_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unFollowSomeone = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_TO_UNFOLLOW_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const response = await axios.put("/api/users/" + id + "/unfollow", config);

    dispatch({
      type: USER_TO_UNFOLLOW_SUCCESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_TO_UNFOLLOW_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
