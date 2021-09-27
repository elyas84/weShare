import {
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REST,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_REST,
} from "../constence/commentConst";

export const newCommentReducer = (state = { Comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return {
        loading: true,
      };

    case COMMENT_CREATE_SUCCESS:
      return {
        loading: false,
        post: action.payload,
        commentSuccess: true,
      };
    case COMMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMMENT_CREATE_REST:
      return { Comment: {}, commentSuccess: false };

    default:
      return state;
  }
};

export const commentListReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case COMMENT_LIST_REQUEST:
      return {
        loading: true,
        comments: [],
      };

    case COMMENT_LIST_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };
    case COMMENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const commentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COMMENT_UPDATE_SUCCESS:
      return {
        loading: false,
        UpdateSuccess: true,
      };
    case COMMENT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case COMMENT_UPDATE_REST:
      return { Comment: {}, commentSuccess: false };

    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return {
        loading: true,
      };

    case COMMENT_DELETE_SUCCESS:
      return {
        loading: false,
        deleteSuccess: true,
      };
    case COMMENT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
