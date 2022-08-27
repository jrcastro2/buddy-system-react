import { connect } from "react-redux";
import PublicOnboardingDetailsViewCmp from "./PublicOnboardingDetailsView";

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
});


export const PublicOnboardingDetailsView = connect(
  mapStateToProps,
)(PublicOnboardingDetailsViewCmp);
