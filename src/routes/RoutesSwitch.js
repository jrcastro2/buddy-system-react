import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Authenticated from "../components/Authenticated/Authenticated";
import { LandingPage } from "../components/LandingPage";
import { Login } from "../components/Login/Login";
import { SignUp } from "../components/Login/Signup";
import CreateOnboarding from "../components/Onboardings/CreateOnboarding";
import OnboardingDetailsView from "../components/Onboardings/OnboardingDetailsView";
import OnboardingView from "../components/Onboardings/OnboardingView";
import { PublicOnboardingDetailsView } from "../components/Onboardings/public";
import MyOnboardings from "../components/Onboardings/public/MyOnboardings";
import CreateRole from "../components/Roles/CreateRole";
import EditRole from "../components/Roles/EditRole";
import RolesView from "../components/Roles/RolesView";
import CreateTeam from "../components/teams/CreateTeam";
import EditTeam from "../components/teams/EditTeam";
import TeamsView from "../components/teams/TeamsView";
import ViewTeam from "../components/teams/ViewTeam";
import CreateTemplate from "../components/templates/CreateTemplate";
import TemplateDetails from "../components/templates/TemplateDetails";
import TemplatesView from "../components/templates/TemplatesView";
import UpdateTemplate from "../components/templates/UpdateTemplate";
import { ChangePassword } from "../components/User";
import { Profile } from "../components/User/Profile";
import UserView from "../components/User/UserView";

export default class RoutesSwitch extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route
          exact
          path="change-password"
          element={
            <Authenticated>
              <ChangePassword />
            </Authenticated>
          }
        />
        <Route
          exact
          path="profile"
          element={
            <Authenticated>
              <Profile />
            </Authenticated>
          }
        />
        <Route
          exact
          path="teams"
          element={
            <Authenticated>
              <TeamsView />
            </Authenticated>
          }
        />
        <Route
          exact
          path="teams/new"
          element={
            <Authenticated>
              <CreateTeam />
            </Authenticated>
          }
        />
        <Route
          exact
          path="teams/:teamId/edit"
          element={
            <Authenticated>
              <EditTeam />
            </Authenticated>
          }
        />
        <Route
          exact
          path="teams/:teamId"
          element={
            <Authenticated>
              <ViewTeam />
            </Authenticated>
          }
        />
        <Route
          exact
          path="roles"
          element={
            <Authenticated>
              <RolesView />
            </Authenticated>
          }
        />
        <Route
          exact
          path="roles/new"
          element={
            <Authenticated>
              <CreateRole />
            </Authenticated>
          }
        />
        <Route
          exact
          path="roles/:roleId/edit"
          element={
            <Authenticated>
              <EditRole />
            </Authenticated>
          }
        />
        <Route
          exact
          path="templates"
          element={
            <Authenticated>
              <TemplatesView />
            </Authenticated>
          }
        />
        <Route
          exact
          path="templates/new"
          element={
            <Authenticated>
              <CreateTemplate />
            </Authenticated>
          }
        />
        <Route
          exact
          path="templates/:templateId"
          element={
            <Authenticated>
              <TemplateDetails />
            </Authenticated>
          }
        />
        <Route
          exact
          path="templates/:templateId/edit"
          element={
            <Authenticated>
              <UpdateTemplate />
            </Authenticated>
          }
        />
        <Route
          exact
          path="onboardings"
          element={
            <Authenticated>
              <OnboardingView />
            </Authenticated>
          }
        />
        <Route
          exact
          path="onboardings/:onboardingId"
          element={
            <Authenticated>
              <OnboardingDetailsView />
            </Authenticated>
          }
        />
        <Route
          exact
          path="onboardings/new"
          element={
            <Authenticated>
              <CreateOnboarding />
            </Authenticated>
          }
        />
        <Route
          exact
          path="onboardings/:onboardingId/public"
          element={
            <Authenticated>
              <PublicOnboardingDetailsView />
            </Authenticated>
          }
        />

        <Route
          exact
          path="my/onboardings"
          element={
            <Authenticated>
              <MyOnboardings />
            </Authenticated>
          }
        />

        <Route
          exact
          path="users"
          element={
            <Authenticated>
              <UserView />
            </Authenticated>
          }
        />

        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    );
  }
}
