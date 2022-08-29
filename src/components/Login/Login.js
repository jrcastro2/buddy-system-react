import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Divider, Container, Message } from "semantic-ui-react";
import { authenticationService } from "../../authentication/AuthenticationService";
import _isEmpty from "lodash/isEmpty";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: false,
      error: {},
    };
  }

  login = async () => {
    const { username, password } = this.state;
    this.setState({ error: {}, isLoading: true });
    try {
      const response = await authenticationService.login(username, password);
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ error: error, isLoading: false });
    }
  };

  render() {
    const { isLoading, error } = this.state;
    return (
      <div className="login full-page">
        <Container className="rel-pt-5">
          <div className="site-logo">
            <h1>BS</h1>
          </div>
          <div className="login-box">
            <h2>Log in to BuddySystem</h2>
            <div className="login-form">
              {!_isEmpty(error) && error.response.status === 404 && (
                <Message negative>
                  <Message.Header>Validation failed</Message.Header>
                  <Message.Content>
                    Incorrect password or username
                  </Message.Content>
                </Message>
              )}
              <Form>
                <Form.Field disabled={isLoading} id="username">
                  <Form.Input
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    label="Username"
                  />
                  {/* <label>Username</label>
                <input name="username" id="username" placeholder="" /> */}
                </Form.Field>
                <Form.Field disabled={isLoading}>
                  <label>Password</label>
                  <a className="forgot-password">Forgot password?</a>
                  <Form.Input
                    type="password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Form.Field>
                <Button
                  onClick={() => this.login()}
                  className="default-margin-top"
                  loading={isLoading}
                  fluid
                  primary
                >
                  Log in
                </Button>
              </Form>

              <Divider className="default-margin-top" horizontal>
                Or
              </Divider>
              <Link to="/signup">
                <Button
                  loading={isLoading}
                  className="default-margin-top"
                  fluid
                  positive
                >
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
