import React, { Component } from "react";
import tokenManager from "../Login/tokenManager";
import PropTypes from "prop-types";
import { Container, Message } from "semantic-ui-react";

class Authenticated extends Component {
  render() {
    const token = tokenManager.getToken();
    const { children, user, admin } = this.props;
    return (
      <>
        {!token ? (
          <Container className="mt-30">
            <Message warning>
              <Message.Header>401</Message.Header>
              <Message.Content>Missing authentication</Message.Content>
            </Message>
          </Container>
        ) : admin ? (
          user.is_admin ? (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>{children}</>
          ) : (
            <Container className="mt-30">
              <Message warning>
                <Message.Header>401</Message.Header>
                <Message.Content>Missing permissions</Message.Content>
              </Message>
            </Container>
          )
        ) : (
          <>{children}</>
        )}
      </>
    );
  }
}

Authenticated.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  admin: PropTypes.bool,
};

Authenticated.defaultProps = {
  children: null,
  user: undefined,
  admin: false,
};

export default Authenticated;
