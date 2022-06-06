import { userApi } from "../../../api/users/user";
import { config } from "../../../config/config";

export const ERROR = "user/ERROR";
export const IS_LOADING = "user/IS_LOADING";

export const changePassword = (userId, payload) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      await userApi.changePassword(userId, payload);
      window.location.replace(`${config.UI_BASE_URL}`);
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error: { message: error.response.data.message } },
      });
    }
  };
};
