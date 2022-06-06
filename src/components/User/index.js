import { connect } from "react-redux";
import ChangePasswordCmp from "./ChangePassword";
import { changePassword } from "./state/actions";

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
  isLoading: state.user.isLoading,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (userId, payload) =>
    dispatch(changePassword(userId, payload)),
});

export const ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordCmp);
