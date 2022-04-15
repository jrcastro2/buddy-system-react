import React from "react";
import "./App.css";
import { NavBar } from "./components/Navbar/navbar";
import { Button } from "semantic-ui-react";
import RoutesSwitch from "./routes/RoutesSwitch";
import { goTo } from "./components/history";
import { Link, Navigate } from "react-router-dom";
import tokenManager from "./components/Login/tokenManager";
import { http } from "@api/base";
import { config } from "./config/config";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(tokenManager.getToken());

  const leftItems = [
    { as: "a", content: "Home", key: "home" },
    { as: "a", content: "Users", key: "users" },
  ];

  const loggedCmp = [
    <Link to="/logout">
      <Button
        onClick={() => {
          console.log("logout");
          http({
            method: "POST",
            url: `${config.REST_ENDPOINTS_BASE_URL}/logout`,
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => {
              console.log("Logout:", response.data);
              tokenManager.removeToken();
              setToken(tokenManager.getToken());
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
        }}
        color="blue"
        size="tiny"
      >
        Logout
      </Button>
    </Link>,
  ];

  const notLoggedCmp = [
    <Link to="/login">
      <Button primary size="tiny">
        Log in
      </Button>
    </Link>,
    <Link to="/signup">
      <Button color="green" size="tiny">
        Register
      </Button>
    </Link>,
    <Link to="/test">
      <Button primary size="tiny">
        test
      </Button>
    </Link>,
  ];

  const rightItems = token ? loggedCmp : notLoggedCmp;
  return (
    <>
      <NavBar leftItems={leftItems} rightItems={rightItems} />
    </>
  );
}

export default App;
