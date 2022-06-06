import { http } from "@api/base";
import _has from "lodash/has";
import tokenManager from "../../components/Login/tokenManager";
import { config } from "../../config/config";

const get = async () => {
  const userURL = "/me";

  const token = tokenManager.getToken();

  const res = await http.get(userURL, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(res);
  //   if (_has(res, 'data.id')) {
  //     res.data.id = res.data.id.toString();
  //   }
  return res;
};

const update = async (userId, payload) => {
  const url = `${config.REST_ENDPOINTS_BASE_URL}/users/${userId}`;

  const token = tokenManager.getToken();

  const res = http({
    method: "PUT",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: payload,
  })
    .then((response) => {
      console.log("UPdated:", response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });

  return res;
};

const changePassword = async (userId, payload) => {
  const updatePasswordURL = `${config.REST_ENDPOINTS_BASE_URL}/users/${userId}/update-password`;

  const token = tokenManager.getToken();

  const res = http({
    method: "PUT",
    url: updatePasswordURL,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: payload,
  }).then((response) => {
    console.log("updated:", response.data);
  });

  return res;
};

export const userApi = {
  get: get,
  update: update,
  changePassword: changePassword,
};
