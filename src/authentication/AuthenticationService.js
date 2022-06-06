import { http } from "@api/base";
import _get from "lodash/get";
import tokenManager from "../components/Login/tokenManager";
import { config } from "../config/config";

class AuthenticationService {
  login = (username, password, setToken) => {
    const data = {
      username: username,
      password: password,
    };
    const loginUrl = `${config.REST_ENDPOINTS_BASE_URL}/token`;
    return http
      .post(loginUrl, data)
      .then((response) => {
        console.log("setting token:", response.data.access_token);
        tokenManager.saveToken(response.data.access_token);
        window.location.replace(`${config.UI_BASE_URL}`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  logout = () => {
    const redirectURL = `${config.UI_BASE_URL}`;
    const token = tokenManager.getToken();

    return http({
      method: "POST",
      url: `${config.REST_ENDPOINTS_BASE_URL}/logout`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log("Logout:", response.data);
        tokenManager.removeToken();
        window.location.replace(redirectURL);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
}

export const authenticationService = new AuthenticationService();
