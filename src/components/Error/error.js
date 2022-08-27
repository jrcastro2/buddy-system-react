import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import _isEmpty from "lodash/isEmpty";
import _upperFirst from "lodash/upperFirst";

export class ValidationErrorMessage extends React.Component {
  removeEmpty(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null)
    );
  }

  render() {
    const { errors } = this.props;
    var errorsList = Object.entries(errors).map((error) => {
      return <li>{_upperFirst(error[1].message)}</li>;
    });
    return (
      !_isEmpty(errors) && (
        <Message negative>
          <strong>Validation errors:</strong>
          <ul>{errorsList}</ul>
        </Message>
      )
    );
  }
}

ValidationErrorMessage.propTypes = {
  errors: PropTypes.object.isRequired,
};

class Error extends React.Component {
  render() {
    const { error, children } = this.props;
    return (
      <>
        {!_isEmpty(error) ? (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{error.response.data.message}</p>
          </Message>
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>{children}</>
        )}
      </>
    );
  }
}

Error.propTypes = {
  error: PropTypes.object,
  children: PropTypes.node,
};

Error.defaultProps = {
  isLoading: false,
  children: null,
};

export default Error;
