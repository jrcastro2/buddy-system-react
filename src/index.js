import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import "semantic-ui-less/semantic.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MediaContextProvider } from "./components/Media/media";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./store";
import { connect, Provider } from "react-redux";
import history from "@history";
import RoutesSwitch from "./routes/RoutesSwitch";
import PropTypes from "prop-types";
import { fetchUserProfile } from "@authentication/state/actions";
import { NavBar } from "./components/Navbar";

export const ReduxStore = configureStore();

class FetchUserComponent extends React.Component {
  componentDidMount() {
    const { fetchUserProfile } = this.props;
    fetchUserProfile();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

FetchUserComponent.propTypes = {
  children: PropTypes.node.isRequired,
  /* REDUX */
  fetchUserProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

const FetchUser = connect(null, mapDispatchToProps)(FetchUserComponent);

ReactDOM.render(
  <BrowserRouter forceRefresh={true} history={history}>
    <MediaContextProvider>
      <Provider store={ReduxStore}>
        <FetchUser>
          <NavBar />
          <div className="main full-page">
            <RoutesSwitch />
          </div>
        </FetchUser>
      </Provider>
    </MediaContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
