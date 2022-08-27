import { http } from "@api/base";
import _has from "lodash/has";
import tokenManager from "../../components/Login/tokenManager";
import { config } from "../../config/config";

const usersURL = `${config.REST_ENDPOINTS_BASE_URL}/users`;

const get = async () => {
  const userURL = "/me";

  const token = tokenManager.getToken();

  const res = await http.get(userURL, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
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
    .then((response) => {})
    .catch((error) => {
      if (error.response) {
        console.error(error.response);
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
  }).then((response) => {});

  return res;
};

const userSearch = async (searchQuery) => {
  const usersSearch = `${usersURL}/search`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: usersSearch,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      q: searchQuery,
    },
  });

  return response.data;
};

const createUser = async (payload) => {
  const token = tokenManager.getToken();

  const response = await http({
    method: "POST",
    url: usersURL,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: payload,
  });

  return response.data;
};

const deleteUser = async (userId) => {
  const deleteUser = `${usersURL}/${userId}`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "DELETE",
    url: deleteUser,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data;
};

export const userApi = {
  get: get,
  update: update,
  changePassword: changePassword,
  search: userSearch,
  create: createUser,
  delete: deleteUser,
};
