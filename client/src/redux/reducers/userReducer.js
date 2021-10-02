import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REG_REQUEST,
  USER_REG_SUCCESS,
  USER_REG_FAIL,
  USER_REG_REST,
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
  USER_PROFILE_UPDATE_REST,
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
  USER_TO_UNFOLLOW_FAIL
} from "../constence/userConst";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REG_REQUEST:
      return {
        userInfo: {},
        loading: true,
      };
    case USER_REG_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        registerSuccess: true,
      };
    case USER_REG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_REG_REST:
      return {
        ...state,
        registerSuccess: false,
      };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        loginSuccess: true,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        user: {},
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        updateSuccess: true,
      };
    case USER_PROFILE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        updateSuccess: false,
      };
    case USER_PROFILE_UPDATE_REST:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        users: [],
        loading: true,
      };

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };

    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userFollowingsReducer = (state = { followings: [] }, action) => {
  switch (action.type) {
    case USER_FOLLOWING_REQUEST:
      return {
        followings: [],
        loading: true,
      };

    case USER_FOLLOWING_SUCCESS:
      return {
        loading: false,
        followings: action.payload,
      };

    case USER_FOLLOWING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userFollowersReducer = (state = { followers: [] }, action) => {
  switch (action.type) {
    case USER_FOLLWERS_REQUEST:
      return {
        followers: [],
        loading: true,
      };

    case USER_FOLLWERS_SUCCESS:
      return {
        loading: false,
        followers: action.payload,
      };

    case USER_FOLLWERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userFriendsFollowingsReducer = (state = { followings: [] }, action) => {
  switch (action.type) {
    case USER_FRIENDS_FOLLOWING_REQUEST:
      return {
        followings: [],
        loading: true,
      };

    case USER_FRIENDS_FOLLOWING_SUCCESS:
      return {
        loading: false,
        followings: action.payload,
      };

    case USER_FRIENDS_FOLLOWING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userFriendsFollowersReducer = (state = { followers: [] }, action) => {
  switch (action.type) {
    case USER_FRIENDS_FOLLWERS_REQUEST:
      return {
        followers: [],
        loading: true,
      };

    case USER_FRIENDS_FOLLWERS_SUCCESS:
      return {
        loading: false,
        followers: action.payload,
      };

    case USER_FRIENDS_FOLLWERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export const unFollowReducer = (state = { followings: [] }, action) => {
  switch (action.type) {
    case USER_TO_UNFOLLOW_REQUEST:
      return {
        followings: [],
        loading: true,
      };

    case USER_TO_UNFOLLOW_SUCCESS:
      return {
        loading: false,
        followings: action.payload,
      };

    case USER_TO_UNFOLLOW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export const toFollowReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_TO_FOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_TO_FOLLOW_SUCCESS:
      return {
        loading: false,
        following: action.payload,
      };

    case USER_TO_FOLLOW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};