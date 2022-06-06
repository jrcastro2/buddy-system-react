import { connect } from "react-redux";
import { fetchUserProfile } from "../../../authentication/state/actions";
import ProfileCmp from "./Profile";

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
  isLoading: state.authenticationManagement.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCmp);
