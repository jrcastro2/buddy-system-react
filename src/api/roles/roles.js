import { http } from "@api/base";
import tokenManager from "../../components/Login/tokenManager";
import { config } from "../../config/config";

const rolesURL = `${config.REST_ENDPOINTS_BASE_URL}/roles`;

const searchRoles = async (searchQuery) => {
  const getRoles = `${rolesURL}/search`;
  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getRoles,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      q: searchQuery,
    },
  });

  return response.data;
};

const deleteRole = async (roleId) => {
  const deleteRole = `${rolesURL}/${roleId}`;

  const token = tokenManager.getToken();

  await http({
    method: "DELETE",
    url: deleteRole,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const createRole = async (data) => {
  const token = tokenManager.getToken();
  const response = await http({
    method: "POST",
    url: rolesURL,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

const getRole = async (roleId) => {
  const getRole = `${rolesURL}/${roleId}`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getRole,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

const editRole = async (roleId, data) => {
  const editRole = `${rolesURL}/${roleId}`;

  const token = tokenManager.getToken();
  const response = await http({
    method: "PUT",
    url: editRole,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

export const rolesApi = {
  search: searchRoles,
  delete: deleteRole,
  create: createRole,
  get: getRole,
  edit: editRole,
};
