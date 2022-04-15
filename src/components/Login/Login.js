import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Divider, Container } from "semantic-ui-react";
import { authenticationService } from "../../authentication/AuthenticationService";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }
  render() {
    const handleSubmit = async () => {
      const { username, password } = this.state;
      console.log("username", username);
      console.log("password", password);

      try {
        const response = await authenticationService.login(username, password);
        // this.onSuccess(response);
        console.log(response);
      } catch (error) {
        console.log(error.response?.data);
        console.log(error);
      }
    };

    return (
      <div className="login full-page">
        <Container className="rel-pt-5">
          <div className="site-logo">
            <h1>BS</h1>
          </div>
          <div className="login-box">
            <h2>Log in to BuddySystem</h2>
            <div className="login-form">
              <Form onSubmit={handleSubmit}>
                <Form.Field id="username">
                  <Form.Input
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    label="Username"
                  />
                  {/* <label>Username</label>
                <input name="username" id="username" placeholder="" /> */}
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <a className="forgot-password">Forgot password?</a>
                  <Form.Input
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Form.Field>
                <Button className="default-margin-top" fluid primary>
                  Log in
                </Button>
              </Form>

              <Divider className="default-margin-top" horizontal>
                Or
              </Divider>
              <Link to="/signup">
                <Button className="default-margin-top" fluid positive>
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {};

Login.defaultProps = {};
