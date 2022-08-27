import React, { Component } from "react";
import { Loader as UILoader } from "semantic-ui-react";
import PropTypes from "prop-types";

class Loader extends Component {
  render() {
    const { isLoading, children } = this.props;
    return (
      <>
        {isLoading ? (
          <UILoader active size="huge" inline="centered" />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>{children}</>
        )}
      </>
    );
  }
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

Loader.defaultProps = {
  isLoading: false,
  children: null,
};

export default Loader;
