import { IS_LOADING, ERROR } from "./actions";

export const initialState = {
  isLoading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true, error: {} };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
