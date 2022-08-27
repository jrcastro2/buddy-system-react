import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Message,
  Tab,
} from "semantic-ui-react";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import OnboardingPreviewTabs from "./OnboardingPreviewTabs";

export default function OnboardingPreview(props) {
  const { template, onboarding, selectedUsers } = props;
  const panes = template?.sections.map((section) => {
    return {
      menuItem: section.name,
      render: () => (
        <OnboardingPreviewTabs
          template={template}
          section={section}
          onboarding={onboarding}
          selectedUsers={selectedUsers}
        />
      ),
    };
  });

  return (
    <Container className="rel-mt-3">
      <Header as="h1">{onboarding.name}</Header>
      <Divider />
      <Grid columns={3}>
        {onboarding?.users?.map((element) => {
          const role = template.roles.filter(
            (role) => role.id === element.role
          );
          const user = selectedUsers.filter(
            (selectedUser) => selectedUser.key === element.user
          );
          return (
            <Grid.Column>
              <strong>{role[0].name}:</strong> {user[0].text}
            </Grid.Column>
          );
        })}
      </Grid>

      <div className="mt-30">
        <p>{template?.description}</p>
        {!_isEmpty(template?.sections) ? (
          <Tab className="mt-30" panes={panes} />
        ) : (
          <Message>
            <Message.Header>No sections nor tasks yet defined</Message.Header>
          </Message>
        )}
      </div>
    </Container>
  );
}

OnboardingPreview.propTypes = {
  onboarding: PropTypes.object.isRequired,
  template: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array.isRequired,
};
