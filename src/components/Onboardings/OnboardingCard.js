import React from "react";

import {
  Container,
  Icon,
  Header,
  Divider,
  Segment,
  Progress,
  Label,
  Grid,
} from "semantic-ui-react";

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

    return (
      <Segment secondary>
        <Grid>
          <Grid.Column width={15}>
            <div>
              <Header as="h4">Hardcoded Name Onboarding</Header>
              <Label className="mt-5 mr-15" attached="top right">
                Hardcoded status
              </Label>
            </div>

            <div className="display-flex">
              <p className="mr-5">Status:</p>
              <Progress className="full-width" percent={85} color="blue" />
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
                <Grid.Column width={5}>
                  <strong>Buddy:</strong> Buddy name
                </Grid.Column>
                <Grid.Column width={5}>
                  <strong>Buddy Manager:</strong> Buddy Manager name
                </Grid.Column>
                <Grid.Column width={5}>
                  <strong>Section leader:</strong> Section leader name
                </Grid.Column>
                <Grid.Column width={5}>
                  <strong>Supervisor:</strong> Supervisor name
                </Grid.Column>
              </Grid.Row>
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
            </Grid>
          </>
        )}
      </Segment>
    );
  }
}

export default OnboardingCard;
