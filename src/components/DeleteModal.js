import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

class DeleteModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    const { children, onClick, valueName } = this.props;
    const { open } = this.state;
    return (
      <Modal
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        open={open}
        trigger={children}
      >
        <Modal.Header>Delete</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Are you sure you want to delete {valueName}?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button floated="left" onClick={() => this.setState({ open: false })}>
            No
          </Button>
          <Button
            onClick={() => {
              onClick();
              this.setState({ open: false });
            }}
            primary
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue",
    });
  }
}

DeleteModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  valueName: PropTypes.string.isRequired,
};

export default DeleteModal;
