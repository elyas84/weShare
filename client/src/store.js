import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  userRegReducer,userLoginReducer

} from './redux/reducers/userReducer'

const reducer = combineReducers({
  userRegister : userRegReducer,
  userLogin: userLoginReducer,



});

const userDetailsFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const initialState = {
  loggedUser: { userInfo: userDetailsFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
