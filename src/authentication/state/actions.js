import { authenticationService } from "../AuthenticationService";

export const REMOVE_TOKEN = "authentication/REMOVE_TOKEN";
export const IS_LOADING = "authentication/IS_LOADING";
export const SUCCESS = "authentication/SUCCESS";

export const logout = (token) => {
  return async (dispatch) => {
    http({
      method: "POST",
      url: `${config.REST_ENDPOINTS_BASE_URL}/logout`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log("Logout:", response.data);
        dispatch({
          type: REMOVE_TOKEN,
        });
        tokenManager.removeToken();
        setToken(tokenManager.getToken());
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    
    //   goTo(FrontSiteRoutes.home);
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const data = {
      username: username,
      password: password,
    };
    const loginUrl = `${config.REST_ENDPOINTS_BASE_URL}/token`;
    return http
      .post(loginUrl, data)
      .then((response) => {
        dispatch({
          type: SUCCESS,
          payload: response.data.access_token,
        });
        // tokenManager.saveToken(response.data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
};
