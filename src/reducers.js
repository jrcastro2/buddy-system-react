import { authenticationReducer } from "@authentication/reducer";
import { combineReducers } from "redux";
import { userReducer } from "@components/User/reducer";

export default function createReducer(asyncReducers) {
  return combineReducers({
    authenticationManagement: authenticationReducer,
    user: userReducer,
  });
}
