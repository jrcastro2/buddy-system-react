import React from "react";

import {
  Container,
  Icon,
  Header,
  Divider,
} from "semantic-ui-react";
import OnboardingCard from "./OnboardingCard";

class YourOnboardings extends React.Component {
  render() {
    return (
      <Container className="rel-mt-3">
        <Header as="h1">
          <Icon size="mini" name="user" />
          <Header.Content>Current Onboardings</Header.Content>
        </Header>
        <Divider />
        <OnboardingCard />
      </Container>
    );
  }
}

export default YourOnboardings;
