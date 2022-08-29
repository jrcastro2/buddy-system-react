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
import { teamsApi } from "../../api/teams";
import { templatesApi } from "../../api/templates";
import { ValidationErrorMessage } from "../Error/error";
import SearchCmp from "../SearchCmp";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import FillRoles from "./components/FillRoles";
import OnboardingPreview from "./components/OnboardingPreview";
import { onboardingsApi } from "../../api/onboardings/onboardings";
import { config } from "../../config/config";
import _isEmpty from "lodash/isEmpty";
import { trainingsApi } from "../../api/trainings";

class CreateOnboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errors: {},
      onboarding: {},
      selectedTeam: null,
      selectedTemplate: null,
      activeIndex: 0,
      dataValue: undefined,
      selectedUsers: [],
      template: {},
      selectedTrainings: [],
    };
  }

  onSubmit = async (data) => {
    const { onboarding } = this.state;
    this.setState({ isLoading: true });
    await onboardingsApi.create(onboarding);
    window.location.replace(`${config.UI_BASE_URL}/onboardings`);
  };

  setTeam = (teamValue) => {
    const { onboarding } = this.state;
    this.setState({ onboarding: { ...onboarding, team_id: teamValue } });
  };

  setSelectedTeam = (options) => {
    this.setState({ selectedTeam: options });
  };

  setTemplate = (templateValue) => {
    const { onboarding } = this.state;
    this.setState({
      onboarding: { ...onboarding, template_id: templateValue },
    });
  };

  setTraining = (trainingsValues) => {
    const { onboarding } = this.state;
    this.setState({
      onboarding: { ...onboarding, trainings: trainingsValues },
    });
  };

  setSelectedTrainings = (options) => {
    this.setState({ selectedTrainings: options });
  };

  setSelectedTemplate = (options) => {
    this.setState({ selectedTemplate: options });
  };

  handleDateChange = (event, data) => {
    const { onboarding } = this.state;
    this.setState({
      dataValue: data.value,
      onboarding: {
        ...onboarding,
        starting_date: data.value.toISOString().split("T")[0],
      },
    });
  };

  getTemplate = async () => {
    const { onboarding } = this.props;
    const response = await templatesApi.get(_id);
    this.setState({
      template: response.data,
    });
  };

  updateParentState = (value) => {
    this.setState(value);
  };

  verifyFirstStep = () => {
    const { onboarding } = this.state;
    return (
      !_isEmpty(onboarding.name) &&
      !_isEmpty(onboarding.starting_date) &&
      onboarding.template_id > 0 &&
      onboarding.team_id > 0
    );
  };

  verifySecondStep = () => {
    const { onboarding, template } = this.state;
    return onboarding?.users?.length === template?.roles?.length;
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
      isLoading,
      errors,
      activeIndex,
      onboarding,
      selectedTeam,
      selectedTemplate,
      dataValue,
      selectedUsers,
      template,
      selectedTrainings,
    } = this.state;

    return (
      <Container className="rel-mt-3">
        <Header as="h1">
          <Icon name="child" />
          New Onboarding
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
                <Step.Title>Roles</Step.Title>
                <Step.Description>Fill in the roles</Step.Description>
              </Step.Content>
            </Step>

            <Step active={activeIndex === 2}>
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
              <Form.Group>
                <Form.Field
                  width={16}
                  disabled={isLoading}
                  error={errors?.name}
                >
                  <Form.Input
                    onChange={(e, data) => {
                      this.setState({
                        onboarding: { ...onboarding, name: data.value },
                      });
                    }}
                    required
                    id="name"
                    name="name"
                    label="Name"
                    value={onboarding.name}
                  />
                </Form.Field>
                <Form.Field disabled={isLoading} error={errors?.roles}>
                  <div className="mb-5">
                    <strong>Starting date</strong>
                  </div>
                  <SemanticDatepicker
                    value={dataValue}
                    onChange={this.handleDateChange}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field disabled={isLoading} error={errors?.teams}>
                  <div className="mb-5">
                    <strong>Team</strong>
                  </div>
                  <SearchCmp
                    searchApi={teamsApi.search}
                    setValues={this.setTeam}
                    setSelected={this.setSelectedTeam}
                    defaultOptions={selectedTeam}
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
                    <strong>Template</strong>
                  </div>
                  <SearchCmp
                    searchApi={templatesApi.search}
                    setValues={this.setTemplate}
                    setSelected={this.setSelectedTemplate}
                    defaultOptions={selectedTemplate}
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
              <Form.Field disabled={isLoading} error={errors?.roles}>
                <div className="mb-5">
                  <strong>Trainings</strong>
                </div>
                <SearchCmp
                  multiple
                  searchApi={trainingsApi.search}
                  setValues={this.setTraining}
                  setSelected={this.setSelectedTrainings}
                  defaultOptions={selectedTrainings}
                  serializeResponse={(element) => {
                    return {
                      key: element.id,
                      value: element.id,
                      text: element.name,
                    };
                  }}
                />
              </Form.Field>
            </>
          )}

          {activeIndex === 1 && (
            <FillRoles
              updateParentState={this.updateParentState}
              onboarding={onboarding}
              selectedUsers={selectedUsers}
            />
          )}

          {activeIndex === 2 && (
            <>
              <OnboardingPreview
                selectedUsers={selectedUsers}
                onboarding={onboarding}
                template={template}
              />
            </>
          )}
          <div className="mt-30">
            <Button
              loading={isLoading}
              floated="right"
              disabled={activeIndex > 1 || this.checkRequirements()}
              type="button"
              onClick={() => {
                this.setState({ activeIndex: activeIndex + 1 });
              }}
            >
              Next
            </Button>
            <Button
              disabled={activeIndex != 2}
              loading={isLoading}
              primary
              floated="right"
              type="submit"
            >
              Create Onboarding
            </Button>
            <Button
              loading={isLoading}
              floated="right"
              disabled={activeIndex < 1}
              type="button"
              onClick={() => {
                this.setState({ activeIndex: activeIndex - 1 });
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

export default CreateOnboarding;
