import React from "react";

import {
  Icon,
  Header,
  Divider,
  Segment,
  Progress,
  Label,
  Grid,
  Button,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { onboardingsApi } from "../../api/onboardings";

class OnboardingCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayInfo: false,
    };
  }

  handleClick = () => {
    const { displayInfo } = this.state;
    this.setState({ displayInfo: !displayInfo });
  };

  render() {
    const { displayInfo } = this.state;
    const { onboarding, publicUrl, deleteOnboarding } = this.props;
    const completedTasks = onboarding.onboarding_task_user.filter(
      (element) => element.completed === true
    );
    const tasks = onboarding.onboarding_task_user;
    const percentage = (completedTasks.length / tasks.length) * 100;
    const status = percentage === 100 ? "Completed" : "In progress";
    return (
      <Segment secondary>
        <Grid>
          <Grid.Column width={15}>
            <div>
              <Header as="h4">
                <Link
                  to={
                    publicUrl
                      ? `/onboardings/${onboarding.id}/public`
                      : `/onboardings/${onboarding.id}`
                  }
                >
                  {onboarding.name}
                </Link>
              </Header>
              <Label className="mt-5 mr-15" attached="top right">
                {status}
              </Label>
            </div>

            <div className="display-flex">
              <p className="mr-5">Status:</p>
              <Progress
                className="full-width"
                percent={percentage}
                color={percentage === 100 ? "green" : "blue"}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={1}>
            <Icon
              onClick={this.handleClick}
              link
              size="large"
              name={displayInfo ? "angle down" : "angle left"}
            ></Icon>
          </Grid.Column>
        </Grid>
        {displayInfo && (
          <>
            <Grid className="mt-0">
              <Grid.Row className="pt-0">
                {onboarding.users.map((element) => {
                  return (
                    <Grid.Column width={5}>
                      <strong>{element.role.name}:</strong>{" "}
                      {element.user.username}
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
              {!publicUrl && deleteOnboarding && (
                <Grid.Row className="pt-0">
                  <Grid.Column width={16}>
                    <Button
                      onClick={() => deleteOnboarding(onboarding.id)}
                      negative
                      floated="right"
                    >
                      Delete
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              )}

              {/* {tasks && (
                <>
                  <Grid.Row className="pb-0">
                    <Grid.Column width={14}>
                      <Header as="h4">Next tasks</Header>
                    </Grid.Column>
                    <Grid.Column textAlign="center" width={2}>
                      <Header as="h4">Deadline</Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider className="mt-5" />
                  <Grid.Row className="pt-0">
                    <Grid.Column width={14}>
                      A normal large sentence representing a task
                    </Grid.Column>
                    <Grid.Column textAlign="center" width={2}>
                      22-03-2022
                    </Grid.Column>
                  </Grid.Row>
                </>
              )} */}
            </Grid>
          </>
        )}
      </Segment>
    );
  }
}

OnboardingCard.propTypes = {
  onboarding: PropTypes.object.isRequired,
  publicUrl: PropTypes.bool,
  deleteOnboarding: PropTypes.func,
};

OnboardingCard.defaultProps = { publicUrl: false, deleteOnboarding: null };

export default OnboardingCard;
