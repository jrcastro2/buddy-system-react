import React from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Label,
  Step,
} from "semantic-ui-react";
import { rolesApi } from "../../api/roles";
import { teamsApi } from "../../api/teams/teams";
import { templatesApi } from "../../api/templates";
import { config } from "../../config/config";
import { ValidationErrorMessage } from "../Error/error";
import SearchCmp from "../SearchCmp";
import CreateTasks from "./components/CreateTasks";
import TemplateCreatePreview from "./components/TemplateCreatePreview";
import _isEmpty from "lodash/isEmpty";

class EditTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errors: {},
      template: { roles: [], sections: [{ name: "", tasks: [] }] },
      activeIndex: 0,
      sectionActiveIndex: 0,
      selectedRoles: [],
      selectedTeams: [],
    };
  }

  onSubmit = async (data) => {
    const { template } = this.state;
    const { templateId } = this.props;
    this.setState({ isLoading: true });
    await templatesApi.edit(templateId, template);
    window.location.replace(`${config.UI_BASE_URL}/templates`);
  };

  serializeResponse = (element) => {
    return {
      key: element.id,
      value: element.id,
      text: element.name,
    };
  };

  componentDidMount = () => {
    const { template: templateProp } = this.props;
    const { template } = this.state;
    const rolesSerialized =
      templateProp.roles &&
      templateProp.roles.map((role) => {
        return role.id;
      });
    const teamsSerialized =
      templateProp.teams &&
      templateProp.teams.map((team) => {
        return team.id;
      });
    this.setState({
      selectedRoles: templateProp.roles.map((role) => {
        return this.serializeResponse(role);
      }),
      selectedTeams: templateProp.teams.map((team) => {
        return this.serializeResponse(team);
      }),
    });
    templateProp.roles = rolesSerialized;
    templateProp.teams = teamsSerialized;
    if (templateProp) {
      this.setState({ template: { ...template, ...templateProp } });
    }
  };

  setTeams = (teamsValues) => {
    const { template } = this.state;
    this.setState({ template: { ...template, teams: teamsValues } });
  };

  setRoles = (rolesValues) => {
    const { template } = this.state;
    this.setState({ template: { ...template, roles: rolesValues } });
  };

  setSelectedRoles = (options) => {
    this.setState({ selectedRoles: options });
  };

  setSelectedTeams = (options) => {
    this.setState({ selectedTeams: options });
  };

  addTask = (activeIndex, roleId) => {
    const { template } = this.state;
    let sections = template.sections;
    sections[activeIndex].tasks.push({ name: "", role_id: roleId });
    this.setState({
      template: {
        ...template,
        sections: sections,
      },
    });
  };

  removeTask = (sectionIndex, taskIndex) => {
    const { template } = this.state;
    let sections = template.sections;
    sections[sectionIndex].tasks.splice(taskIndex, 1);

    this.setState({
      template: {
        ...template,
        sections: sections,
      },
    });
  };

  updateTask = (sectionIndex, taskIndex, value) => {
    const { template } = this.state;
    let sections = template.sections;
    sections[sectionIndex].tasks[taskIndex].name = value;
    this.setState({
      template: { ...template, sections: sections },
    });
  };

  serializeRoles = () => {
    const { template, selectedRoles } = this.state;
    if (!_isEmpty(selectedRoles)) {
      return selectedRoles;
    }
    return (
      template.roles &&
      template.roles.map((element) => {
        return this.serializeResponse(element);
      })
    );
  };

  serializeTeams = () => {
    const { template, selectedTeams } = this.state;
    if (!_isEmpty(selectedTeams)) {
      return selectedTeams;
    }
    return (
      template.teams &&
      template.teams.map((element) => {
        return this.serializeResponse(element);
      })
    );
  };

  verifyFirstStep = () => {
    const { template } = this.state;
    return (
      !_isEmpty(template.name) &&
      !_isEmpty(template.description) &&
      !_isEmpty(template.roles)
    );
  };

  verifySecondStep = () => {
    const { template } = this.state;
    return !_isEmpty(template.sections[0].name);
  };

  checkRequirements = () => {
    const { activeIndex } = this.state;
    if (activeIndex === 0) {
      return !this.verifyFirstStep();
    } else if (activeIndex === 1) {
      return !this.verifySecondStep();
    }
  };

  render() {
    const {
      selectedRoles,
      isLoading,
      errors,
      template,
      activeIndex,
      sectionActiveIndex,
    } = this.state;
    return (
      <Container className="rel-mt-3">
        <Header as="h1">
          <Icon name="file text" />
          Edit template
        </Header>
        <Divider />
        <Container textAlign="center" className="rel-mt-3">
          <Step.Group textAlign="center">
            <Step active={activeIndex === 0}>
              <Icon name="info" />
              <Step.Content>
                <Step.Title>Basic information</Step.Title>
                <Step.Description>
                  Fill in the basic information
                </Step.Description>
              </Step.Content>
            </Step>

            <Step active={activeIndex === 1}>
              <Icon name="file alternate outline" />
              <Step.Content>
                <Step.Title>Sections</Step.Title>
                <Step.Description>Define sections</Step.Description>
              </Step.Content>
            </Step>

            <Step active={activeIndex === 2}>
              <Icon name="numbered list" />
              <Step.Content>
                <Step.Title>Tasks</Step.Title>
                <Step.Description>Define tasks</Step.Description>
              </Step.Content>
            </Step>

            <Step active={activeIndex === 3}>
              <Icon name="eye" />
              <Step.Content>
                <Step.Title>Preview</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Container>

        <Form className="mt-30" onSubmit={this.onSubmit}>
          <ValidationErrorMessage errors={errors} />
          {activeIndex === 0 && (
            <>
              <Form.Field disabled={isLoading} error={errors?.name}>
                <Form.Input
                  onChange={(e, data) =>
                    this.setState({
                      template: { ...template, name: data.value },
                    })
                  }
                  required
                  id="name"
                  name="name"
                  label="Name"
                  value={template.name}
                />
              </Form.Field>
              <Form.Field disabled={isLoading} error={errors?.description}>
                <Form.TextArea
                  onChange={(e, data) =>
                    this.setState({
                      template: { ...template, description: data.value },
                    })
                  }
                  required
                  id="description"
                  name="description"
                  label="Description"
                  value={template.description}
                />
              </Form.Field>

              <Form.Group widths="equal">
                <Form.Field disabled={isLoading} error={errors?.teams}>
                  <div className="mb-5">
                    <strong>Teams</strong>
                  </div>
                  <SearchCmp
                    multiple
                    searchApi={teamsApi.search}
                    setValues={this.setTeams}
                    defaultOptions={this.serializeTeams()}
                    setSelected={this.setSelectedTeams}
                    serializeResponse={(element) => {
                      return {
                        key: element.id,
                        value: element.id,
                        text: element.name,
                      };
                    }}
                  />
                </Form.Field>
                <Form.Field disabled={isLoading} error={errors?.roles}>
                  <div className="mb-5">
                    <strong>Roles</strong>
                  </div>
                  <SearchCmp
                    multiple
                    searchApi={rolesApi.search}
                    setValues={this.setRoles}
                    defaultOptions={this.serializeRoles()}
                    setSelected={this.setSelectedRoles}
                    serializeResponse={(element) => {
                      return {
                        key: element.id,
                        value: element.id,
                        text: element.name,
                      };
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </>
          )}

          {activeIndex === 1 && (
            <>
              {template.sections.map((section, index) => {
                return (
                  <Form.Group>
                    <Form.Field
                      width={13}
                      disabled={isLoading}
                      error={errors?.name}
                    >
                      <Form.Input
                        onChange={(e, data) => {
                          let sectionsUpdate = template.sections;
                          sectionsUpdate[index].name = data.value;
                          this.setState({
                            template: { ...template, sections: sectionsUpdate },
                          });
                        }}
                        id="name"
                        name="name"
                        fluid
                        label={`Section ${index + 1} name`}
                        value={section.name}
                      />
                    </Form.Field>

                    <Form.Button
                      className="mt-25"
                      loading={isLoading}
                      floated="left"
                      disabled={index == 0}
                      type="button"
                      icon
                      negative
                      labelPosition="left"
                      onClick={() => {
                        let sections = template.sections;
                        sections.splice(index, 1);
                        this.setState({
                          template: {
                            ...template,
                            sections: sections,
                          },
                        });
                      }}
                    >
                      <Icon name="minus square" />
                      Delete
                    </Form.Button>
                  </Form.Group>
                );
              })}

              <Button
                loading={isLoading}
                floated="left"
                disabled={activeIndex > 2}
                type="button"
                icon
                labelPosition="left"
                onClick={() => {
                  let sections = template.sections;
                  sections.push({ name: "", tasks: [] });
                  this.setState({
                    template: {
                      ...template,
                      sections: sections,
                    },
                  });
                }}
              >
                <Icon name="plus square" />
                Add section
              </Button>
            </>
          )}

          {activeIndex === 2 && (
            <CreateTasks
              roles={selectedRoles}
              template={template}
              addTask={this.addTask}
              removeTask={this.removeTask}
              updateTask={this.updateTask}
              activeIndex={sectionActiveIndex}
            />
          )}

          {activeIndex === 3 && (
            <TemplateCreatePreview roles={selectedRoles} template={template} />
          )}
          <div className="mt-30">
            <Button
              loading={isLoading}
              floated="right"
              disabled={activeIndex > 2 || this.checkRequirements()}
              type="button"
              onClick={() => {
                if (
                  activeIndex === 2 &&
                  sectionActiveIndex < template.sections.length - 1
                ) {
                  this.setState({ sectionActiveIndex: sectionActiveIndex + 1 });
                } else {
                  this.setState({ activeIndex: activeIndex + 1 });
                }
              }}
            >
              Next
            </Button>
            <Button
              disabled={activeIndex != 3}
              loading={isLoading}
              primary
              floated="right"
              type="submit"
            >
              Save template
            </Button>
            <Button
              loading={isLoading}
              floated="right"
              disabled={activeIndex < 1}
              type="button"
              onClick={() => {
                if (activeIndex === 2 && sectionActiveIndex > 0) {
                  this.setState({ sectionActiveIndex: sectionActiveIndex - 1 });
                } else {
                  this.setState({ activeIndex: activeIndex - 1 });
                }
              }}
            >
              Back
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

export default EditTemplate;
