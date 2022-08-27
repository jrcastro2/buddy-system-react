import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Divider, Container, Input } from "semantic-ui-react";
import { userApi } from "../../api/users/user";
import { authenticationService } from "../../authentication/AuthenticationService";

export class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isLoading: false,
    };
  }

  login = async () => {
    const { user } = this.state;

    try {
      const response = await authenticationService.login(
        user.username,
        user.password
      );
    } catch (error) {
      console.error(error);
    }
  };

  createUser = async () => {
    const { user } = this.state;
    this.setState({ isLoading: true });
    const response = await userApi.create(user);
    this.login();
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <div className="login full-page">
        <Container className="rel-pt-5">
          <div className="site-logo">
            <h1>BS</h1>
          </div>
          <div className="login-box">
            <h2>Sign up to BuddySystem</h2>
            <div className="login-form">
              <Form>
                <Form.Field>
                  <label>Username</label>
                  <Input
                    disabled={isLoading}
                    onChange={(e, data) => {
                      this.setState({
                        user: { ...user, username: data.value },
                      });
                    }}
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email address</label>
                  <Input
                    disabled={isLoading}
                    onChange={(e, data) => {
                      this.setState({
                        user: { ...user, email: data.value },
                      });
                    }}
                    placeholder=""
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Input
                    type="password"
                    disabled={isLoading}
                    onChange={(e, data) => {
                      this.setState({
                        user: { ...user, password: data.value },
                      });
                    }}
                    placeholder=""
                  />
                </Form.Field>
                <Button
                  loading={isLoading}
                  onClick={this.createUser}
                  className="default-margin-top"
                  fluid
                  positive
                >
                  Sign up
                </Button>
              </Form>

              <Divider horizontal>Or</Divider>
              <Link to="/login">
                <Button
                  loading={isLoading}
                  className="default-margin-top"
                  fluid
                  primary
                >
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

SignUp.propTypes = {};

SignUp.defaultProps = {};
