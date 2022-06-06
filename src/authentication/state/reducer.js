import {
    REMOVE_TOKEN,
    IS_LOADING,
    SUCCESS,
  } from './actions';
  
  export const initialState = {
    isLoading: true,
    isAnonymous: true,
    data: {},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case IS_LOADING:
        return { ...state, isLoading: true };
      case SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isAnonymous: false,
        };
      case REMOVE_TOKEN:
        return {
          ...state,
          token: undefined,
        };
      default:
        return state;
    }
  };
  