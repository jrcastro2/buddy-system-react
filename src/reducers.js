import { authenticationReducer } from '@authentication/reducer';
import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
  return combineReducers({
    authenticationManagement: authenticationReducer,
  });
}
