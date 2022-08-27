import { http } from "@api/base";
import tokenManager from "../../components/Login/tokenManager";
import EditTeam from "../../components/teams/EditTeam";
import { config } from "../../config/config";

const teamsURL = `${config.REST_ENDPOINTS_BASE_URL}/teams`;

const searchTeams = async (searchQuery) => {
  const getTeams = `${teamsURL}/search`;
  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getTeams,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      q: searchQuery,
    },
  });

  return response.data;
};

const deleteTeam = async (teamId) => {
  const deleteTeam = `${teamsURL}/${teamId}`;

  const token = tokenManager.getToken();

  await http({
    method: "DELETE",
    url: deleteTeam,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const getTeam = async (teamId) => {
  const getTeam = `${teamsURL}/${teamId}`;

  const token = tokenManager.getToken();

  const response = await http({
    method: "GET",
    url: getTeam,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

const createTeam = async (data) => {
  const token = tokenManager.getToken();
  const response = await http({
    method: "POST",
    url: teamsURL,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  });

  return response;
};

const editTeam = async (teamId, data) => {
    const editTeam = `${teamsURL}/${teamId}`;

    const token = tokenManager.getToken();
    const response = await http({
      method: "PUT",
      url: editTeam,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: data,
    });
  
    return response;
  };

export const teamsApi = {
  search: searchTeams,
  delete: deleteTeam,
  create: createTeam,
  get: getTeam,
  edit: editTeam,
};
