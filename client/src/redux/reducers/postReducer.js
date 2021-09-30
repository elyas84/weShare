import {
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REST,
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
  POST_LIST_BY_USER_REQUEST,
  POST_LIST_BY_USER_SUCCESS,
  POST_LIST_BY_USER_FAIL
} from "../constence/postconst";

export const newPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return {
        loading: true,
      };

    case POST_CREATE_SUCCESS:
      return {
        loading: false,
        post: action.payload,
        postSuccess: true,
      };
    case POST_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case POST_CREATE_REST:
      return { post: {}, postSuccess: false };

    default:
      return state;
  }
};

export const postListOUserReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_BY_USER_REQUEST:
      return {
        loading: true,
        posts: [],
      };

    case POST_LIST_BY_USER_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case POST_LIST_BY_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return {
        loading: true,
        posts: [],
      };

    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case POST_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const myPostlistReducer = (state = { myPostList: [] }, action) => {
  switch (action.type) {
    case POST_MY_REQUEST:
      return {
        loading: true,
        myPostList: [],
      };
    case POST_MY_SUCCESS:
      return {
        loading: false,
        myPostList: action.payload,
      };
    case POST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case POST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return {
        loading: true,
      };

    case POST_DELETE_SUCCESS:
      return {
        loading: false,
        deleteSuccess: true,
      };
    case POST_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
