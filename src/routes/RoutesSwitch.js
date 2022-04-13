import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../components/LandingPage";
import { Login } from "../components/Login/Login";
import { SignUp } from "../components/Login/Signup";
import Test from "../components/test";

export default class RoutesSwitch extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="test" element={<Test />} />
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    );
  }
}
