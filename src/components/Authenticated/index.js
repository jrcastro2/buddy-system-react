import { connect } from "react-redux";
import AuthenticatedComponent from "./Authenticated";

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

export const Authenticated = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedComponent);
