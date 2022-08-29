import React from "react";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Button,
  Dropdown,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Media } from "../Media/media";
import PropTypes from "prop-types";
import tokenManager from "../Login/tokenManager";
import { http } from "@api/base";
import { config } from "../../config/config";
import { authenticationService } from "../../authentication/AuthenticationService";

const NavBarMobile = (props) => {
  //TODO: NOT WORKING TO BE CHECKED

  const { children, leftItems, onPusherClick, onToggle, rightItems, visible } =
    props;

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        items={leftItems}
        vertical
        visible={visible}
      />
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top">
          <Menu.Item>
            <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {rightItems.map((item) => (
              <Menu.Item key={item.key} {...item} />
            ))}
          </Menu.Menu>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

NavBarMobile.propTypes = {
  children: PropTypes.object,
  leftItems: PropTypes.array.isRequired,
  rightItems: PropTypes.array.isRequired,
  onPusherClick: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

NavBarMobile.defaultProps = {
  children: {},
};

const NavBarDesktop = (props) => {
  const { leftItems, rightItems } = props;
  const token = tokenManager.getToken();

  return (
    <Menu color="blue" size="massive" fixed="top" inverted secondary>
      <Container>
        <Menu.Item>
          <Link to={token ? "/my/onboardings" : "/"}>
            <big>BS</big>
          </Link>
        </Menu.Item>

        <Menu.Menu position="left">
          {leftItems.map((item) => (
            <Menu.Item>{item}</Menu.Item>
          ))}
        </Menu.Menu>

        <Menu.Menu position="right">
          {rightItems.map((item) => (
            <Menu.Item>{item}</Menu.Item>
          ))}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

NavBarDesktop.propTypes = {
  leftItems: PropTypes.array.isRequired,
  rightItems: PropTypes.array.isRequired,
};

const NavBarChildren = (props) => <Container>{props.children}</Container>;

NavBarChildren.propTypes = {
  children: PropTypes.object.isRequired,
};

export default class NavBar extends React.Component {
  state = {
    visible: false,
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, user } = this.props;
    const { visible } = this.state;
    const token = tokenManager.getToken();
    const leftItems = user?.is_admin
      ? [
          <Link as="a" to="/teams">
            Teams
          </Link>,
          <Link as="a" to="/roles">
            Roles
          </Link>,
          <Link as="a" to="/templates">
            Templates
          </Link>,
          <Link as="a" to="/onboardings">
            Onboardings
          </Link>,
          <Link as="a" to="/users">
            Users
          </Link>,
          <Link as="a" to="/trainings">
            Trainings
          </Link>,
        ]
      : [];
    const loggedCmp = [
      <Dropdown button text={user ? user.username : "You"}>
        <Dropdown.Menu>
          <Link to="/profile">
            <Dropdown.Item icon="user" text="Your profile" />
          </Link>
          <Link to="/change-password">
            <Dropdown.Item icon="key" text="Change password" />
          </Link>
          <Link to="/my/onboardings">
            <Dropdown.Item icon="child" text="Your onboardings" />
          </Link>
          {/* <Link to="/teams">
            <Dropdown.Item icon="users" text="Your teams" />
          </Link> */}
          <Dropdown.Item
            onClick={() => authenticationService.logout()}
            icon="sign out"
            text="Log out"
          />
        </Dropdown.Menu>
      </Dropdown>,
    ];

    const notLoggedCmp = [
      <Link to="/login">
        <Button primary size="tiny">
          Log in
        </Button>
      </Link>,
      <Link to="/signup">
        <Button color="green" size="tiny">
          Register
        </Button>
      </Link>,
    ];
    const rightItems = token ? loggedCmp : notLoggedCmp;

    return (
      <>
        <Media at="mobile">
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Media>

        <Media greaterThan="mobile">
          <Container>
            <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
            <NavBarChildren>{children}</NavBarChildren>
          </Container>
        </Media>
      </>
    );
  }
}

NavBar.propTypes = {
  children: PropTypes.object,
  user: PropTypes.object,
};

NavBar.defaultProps = {
  children: undefined,
  user: undefined,
};
