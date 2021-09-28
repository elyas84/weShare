import {
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  //   POST_CREATE_REST,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_MY_REQUEST,
  POST_MY_SUCCESS,
  POST_MY_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
} from "../constence/postconst";

import axios from "axios";

export const creatPost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_CREATE_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };
    const res = await axios.post("/api/posts", post, config);

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_LIST_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const res = await axios.get("/api/posts", config);

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyPostList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_MY_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const res = await axios.get("/api/posts/userposts", config);

    dispatch({
      type: POST_MY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_MY_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPostDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DETAILS_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const res = await axios.get("/api/posts/" + id, config);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    });

    const {
      loginOfUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };
    await axios.delete("/api/posts/" + id, config);

    dispatch({
      type: POST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
