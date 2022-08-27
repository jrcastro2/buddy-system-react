import { http } from "@api/base";
import tokenManager from "../../components/Login/tokenManager";
import { config } from "../../config/config";

const onboardingsURL = `${config.REST_ENDPOINTS_BASE_URL}/onboardings`;
const myOnboardingsURL = `${config.REST_ENDPOINTS_BASE_URL}/my/onboardings`;

const searchOnboardigns = async (searchQuery) => {
  const getOnboardings = `${onboardingsURL}/search`;
  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getOnboardings,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      q: searchQuery,
    },
  });

  return response.data;
};

const searchMyOnboardigns = async (searchQuery) => {
  const getOnboardings = `${myOnboardingsURL}/search`;
  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getOnboardings,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      q: searchQuery,
    },
  });

  return response.data;
};

const deleteOnboardign = async (onboardingId) => {
  const deleteOnboarding = `${onboardingsURL}/${onboardingId}`;

  const token = tokenManager.getToken();

  await http({
    method: "DELETE",
    url: deleteOnboarding,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const createOnboarding = async (data) => {
  const token = tokenManager.getToken();
  const response = await http({
    method: "POST",
    url: onboardingsURL,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

const getOnboarding = async (onboardingId) => {
  const getOnboarding = `${onboardingsURL}/${onboardingId}`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getOnboarding,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

const updateTask = async (data) => {
  const updateOnboardingTask = `${onboardingsURL}/task`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "PUT",
    url: updateOnboardingTask,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

const deleteOnboarding = async (onboardingID) => {
  const deleteOnboarding = `${onboardingsURL}/${onboardingID}`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "DELETE",
    url: deleteOnboarding,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

export const onboardingsApi = {
  search: searchOnboardigns,
  searchMyOnboardings: searchMyOnboardigns,
  delete: deleteOnboardign,
  create: createOnboarding,
  get: getOnboarding,
  updateTask: updateTask,
  delete: deleteOnboarding,
};
