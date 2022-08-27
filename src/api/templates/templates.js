import { http } from "@api/base";
import tokenManager from "../../components/Login/tokenManager";
import { config } from "../../config/config";

const templatesURL = `${config.REST_ENDPOINTS_BASE_URL}/templates`;

const searchTemplates = async (searchQuery) => {
  const getTemplates = `${templatesURL}/search`;
  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getTemplates,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      q: searchQuery,
    },
  });

  return response.data;
};

const deleteTemplate = async (templateId) => {
  const deleteTemplate = `${templatesURL}/${templateId}`;

  const token = tokenManager.getToken();

  await http({
    method: "DELETE",
    url: deleteTemplate,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const createTemplate = async (data) => {
  const token = tokenManager.getToken();
  const response = await http({
    method: "POST",
    url: templatesURL,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

const getTemplate = async (templateId) => {
  const getTemplate = `${templatesURL}/${templateId}`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getTemplate,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

const editTemplate = async (templateId, data) => {
  const editTemplate = `${templatesURL}/${templateId}`;

  const token = tokenManager.getToken();
  const response = await http({
    method: "PUT",
    url: editTemplate,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

export const templatesApi = {
  search: searchTemplates,
  delete: deleteTemplate,
  create: createTemplate,
  get: getTemplate,
  edit: editTemplate,
};
