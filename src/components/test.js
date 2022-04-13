import React from "react";
import { Link } from "react-router-dom";
import { http } from "@api/base";
import { config } from "../config/config";
import tokenManager from "./Login/tokenManager";

class Test extends React.Component {
  componentDidMount() {
    const token = tokenManager.getToken();
    return http({
      method: "GET",
      url: `${config.REST_ENDPOINTS_BASE_URL}/users`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log("Test return:", response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  render() {
    return (
      <div className="login full-page">
        <main>
          <h2>TEST</h2>
          <p>HEY1</p>
        </main>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </div>
    );
  }
}

export default Test;
