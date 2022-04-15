import React from "react";
import { Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Media } from "../Media/media";
import PropTypes from "prop-types";

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
        inverted
        items={leftItems}
        vertical
        visible={visible}
      />
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top" inverted>
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

  return (
    <Menu color="blue" size="massive" fixed="top" inverted secondary>
      <Container>
        <Menu.Item>
          <Link to="/">
            <big>BS</big>
          </Link>
        </Menu.Item>

        <Menu.Menu position="left">
          {leftItems.map((item) => (
            <Menu.Item key={item.key} {...item} />
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

export class NavBar extends React.Component {
  state = {
    visible: false,
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, leftItems, rightItems } = this.props;
    const { visible } = this.state;

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
  leftItems: PropTypes.array.isRequired,
  rightItems: PropTypes.array.isRequired,
};

NavBar.defaultProps = {
  children: undefined,
};
