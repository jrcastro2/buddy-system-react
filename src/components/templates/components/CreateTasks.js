import React from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Step,
} from "semantic-ui-react";
import PropTypes from "prop-types";

class CreateTasks extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: "someValue",
    };
  }

  render() {
    const { roles, template, addTask, removeTask, updateTask, activeIndex } =
      this.props;
    return (
      <>
        <Container textAlign="center" className="rel-mt-3">
          <Step.Group size="mini" textAlign="center">
            {template.sections.map((section, index) => {
              return (
                <Step active={activeIndex === index}>
                  <Step.Content>
                    <Step.Title>{section.name}</Step.Title>
                  </Step.Content>
                </Step>
              );
            })}
          </Step.Group>
        </Container>
        {template.roles.map((role, index) => {
          const roleDetailed = roles.find((element) => element.key === role);
          return (
            <div className="mt-20">
              <Header>{roleDetailed.text} tasks</Header>
              <Divider />

              {template.sections[activeIndex].tasks.map((task, index) => {
                return (
                  task.role_id === role && (
                    <Form.Group>
                      <Form.Field width={13}>
                        <Form.Input
                          onChange={(e, data) => {
                            updateTask(activeIndex, index, data.value);
                          }}
                          id="name"
                          name="name"
                          fluid
                          label={`Task name`}
                          value={task.name}
                        />
                      </Form.Field>

                      <Form.Button
                        className="mt-25"
                        floated="left"
                        type="button"
                        icon
                        negative
                        labelPosition="left"
                        onClick={() => {
                          removeTask(activeIndex, index);
                        }}
                      >
                        <Icon name="minus square" />
                        Delete
                      </Form.Button>
                    </Form.Group>
                  )
                );
              })}

              <Button
                // loading={isLoading}
                type="button"
                icon
                labelPosition="left"
                onClick={() => {
                  addTask(activeIndex, role);
                }}
              >
                <Icon name="plus square" />
                Add task
              </Button>
            </div>
          );
        })}
      </>
    );
  }
}

CreateTasks.propTypes = {
  template: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

export default CreateTasks;
