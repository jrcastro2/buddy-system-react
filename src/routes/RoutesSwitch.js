import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../components/LandingPage";
import { Login } from "../components/Login/Login";
import { SignUp } from "../components/Login/Signup";
import YourOnboardings from "../components/Onboardings/YourOnboardings";
import Test from "../components/test";
import { ChangePassword } from "../components/User";
import { Profile } from "../components/User/Profile";

export default class RoutesSwitch extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="change-password" element={<ChangePassword />} />
        <Route exact path="your-onboardings" element={<YourOnboardings />} />
        <Route exact path="profile" element={<Profile />} />
        <Route exact path="test" element={<Test />} />
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    );
  }
}
