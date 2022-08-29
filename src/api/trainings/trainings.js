import { http } from "@api/base";
import tokenManager from "../../components/Login/tokenManager";
import { config } from "../../config/config";

const trainingsURL = `${config.REST_ENDPOINTS_BASE_URL}/trainings`;
const modulesURL = `${config.REST_ENDPOINTS_BASE_URL}/modules`;

const searchTrainings = async (searchQuery) => {
  const getTrainings = `${trainingsURL}/search`;
  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getTrainings,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      q: searchQuery,
    },
  });

  return response.data;
};

const deleteTrainings = async (trainingId) => {
  const deleteTrainings = `${trainingsURL}/${trainingId}`;

  const token = tokenManager.getToken();

  await http({
    method: "DELETE",
    url: deleteTrainings,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const createTraining = async (data) => {
  const token = tokenManager.getToken();
  const response = await http({
    method: "POST",
    url: trainingsURL,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

const getTraining = async (trainingId) => {
  const getTraining = `${trainingsURL}/${trainingId}`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getTraining,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

const getModule = async (moduleId) => {
  const getModule = `${modulesURL}/${moduleId}`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getModule,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

const editTraining = async (trainingId, data) => {
  const editTraining = `${trainingsURL}/${trainingId}`;

  const token = tokenManager.getToken();
  const response = await http({
    method: "PUT",
    url: editTraining,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

export const trainingsApi = {
  search: searchTrainings,
  delete: deleteTrainings,
  create: createTraining,
  get: getTraining,
  getModule: getModule,
  edit: editTraining,
};
