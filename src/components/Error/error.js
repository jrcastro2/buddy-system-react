import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import _isEmpty from "lodash/isEmpty";
import _upperFirst from "lodash/upperFirst";

export class ErrorMessage extends React.Component {
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

ErrorMessage.propTypes = {
  errors: PropTypes.object.isRequired,
};
