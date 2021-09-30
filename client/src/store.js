import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from "./redux/reducers/userReducer";

import {
  newPostReducer,
  postListReducer,
  myPostlistReducer,
  postDetailsReducer,
  postDeleteReducer,
  postListOUserReducer
} from "./redux/reducers/postReducer";

const reducer = combineReducers({
  registerOfUser: userRegisterReducer,
  loginOfUser: userLoginReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userUpdateProfileReducer,
  deleteUser: userDeleteReducer,
  userList: userListReducer,
  postCreate: newPostReducer,
  postByUser : postListOUserReducer,
  postList: postListReducer,
  postMyList: myPostlistReducer,
  postDetail: postDetailsReducer,
  postOfDelete: postDeleteReducer,
});

const userLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const initialState = {
  loginOfUser: { userInfo: userLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
