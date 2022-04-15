import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Divider, Container } from "semantic-ui-react";

export class SignUp extends React.Component {
  render() {
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
                  <input placeholder="" />
                </Form.Field>
                <Form.Field>
                  <label>Email address</label>
                  <input placeholder="" />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input placeholder="" />
                </Form.Field>
                <Button className="default-margin-top" fluid positive>
                  Sign up
                </Button>
              </Form>

              <Divider horizontal>Or</Divider>
              <Link to="/login">
                <Button className="default-margin-top" fluid primary>
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
