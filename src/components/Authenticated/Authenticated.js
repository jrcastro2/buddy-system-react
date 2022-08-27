import React, { Component } from "react";
import tokenManager from "../Login/tokenManager";
import PropTypes from "prop-types";
import { Container, Message } from "semantic-ui-react";

class Authenticated extends Component {
  render() {
    const token = tokenManager.getToken();
    const { children } = this.props;
    return (
      <>
        {!token ? (
          <Container className="mt-30">
            <Message warning>
              <Message.Header>401</Message.Header>
              <Message.Content>Missing authentication</Message.Content>
            </Message>
          </Container>
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>{children}</>
        )}
      </>
    );
  }
}

Authenticated.propTypes = {
  children: PropTypes.node,
};

Authenticated.defaultProps = {
  children: null,
};

export default Authenticated;
