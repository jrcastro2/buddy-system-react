import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export class LandingPage extends React.Component {
  render() {
    // Make this global/configurable

    return (
      <div className="landing-page">
        <div>
          <h2 className="mb-0">BuddySystem.</h2>
          <p>The new way to start your journey right.</p>
          <Link to="/login">
            <Button primary> GET STARTED </Button>
          </Link>
        </div>
      </div>
    );
  }
}
