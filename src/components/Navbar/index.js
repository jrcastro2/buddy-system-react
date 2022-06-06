import { connect } from "react-redux";
import NavBarComponent from "./navbar";

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

export const NavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarComponent);
