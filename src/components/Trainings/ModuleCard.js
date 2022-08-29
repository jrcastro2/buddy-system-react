import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";
import Truncate from "react-truncate";
import { Button, Card, Form, Input, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

class ModuleCard extends React.Component {
  constructor() {
    super();
    this.state = {
      module: {},
      open: false,
    };
  }

  componentDidMount() {
    const { module } = this.props;

    this.setState({
      module: module,
    });
  }

  render() {
    const { module, open } = this.state;
    const { index, updateModules, removeModule } = this.props;
    return (
      <Card className="no-box-shadow">
        <Card
          onClick={() => {
            this.setState({
              open: true,
            });
          }}
        >
          <Card.Content>
            <Card.Header>{module.name}</Card.Header>
            <Card.Description>
              <Truncate lines={3}>{module.description}</Truncate>
            </Card.Description>
          </Card.Content>
        </Card>
        <Modal
          onClose={() =>
            this.setState({
              open: false,
            })
          }
          onOpen={() =>
            this.setState({
              open: true,
            })
          }
          open={open}
        >
          <Modal.Header>Create module</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Name</label>
                <Input
                  onChange={(e, data) => {
                    this.setState({ module: { ...module, name: data.value } });
                  }}
                  placeholder=""
                  value={module.name}
                />
              </Form.Field>
              <Form.Field>
                <label>Short description</label>
                <Input
                  onChange={(e, data) => {
                    this.setState({
                      module: { ...module, description: data.value },
                    });
                  }}
                  placeholder=""
                  value={module.description}
                />
              </Form.Field>
              <Form.Field className="display-grid">
                <label>Content</label>
                <div>
                  <CKEditor
                    editor={ClassicEditor}
                    data={module.content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      this.setState({
                        module: { ...module, content: data },
                      });
                    }}
                  />
                </div>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              floated="left"
              color="black"
              onClick={() => {
                this.setState({
                  open: false,
                });
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              negative
              onClick={() => {
                this.setState({
                  open: false,
                });
                removeModule(index);
              }}
            >
              Delete
            </Button>
            <Button
              content="Save module"
              onClick={() => {
                this.setState({
                  open: false,
                });
                updateModules(module, index);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Card>
    );
  }
}

ModuleCard.propTypes = {
  index: PropTypes.number.isRequired,
  module: PropTypes.object.isRequired,
  updateModules: PropTypes.func.isRequired,
  removeModule: PropTypes.func.isRequired,
};

export default ModuleCard;
