import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Message,
  Tab,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import Loader from "../../Loader/Loader";
import { onboardingsApi } from "../../../api/onboardings";
import PublicOnboardingDetailsTab from "./PublicOnboardingDetailsTab";

export default function PublicOnboardingDetailsViewCmp(props) {
  const { onboardingId } = useParams();
  const [onboarding, setOnboarding] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const fetchOnboarding = async () => {
    setisLoading(true);
    const response = await onboardingsApi.get(onboardingId);
    setOnboarding(response.data);
    setisLoading(false);
  };
  useEffect(() => {
    fetchOnboarding();
  }, []);

  const { user } = props;

  const panes = onboarding?.template?.sections.map((section) => {
    return {
      menuItem: section.name,
      render: () => (
        <PublicOnboardingDetailsTab
          user={user}
          section={section}
          onboarding={onboarding}
        />
      ),
    };
  });

  return (
    <Container className="rel-mt-3">
      <Loader isLoading={isLoading}>
        <Header as="h1">{onboarding.name}</Header>
        <Divider />
        <Grid columns={3}>
          {onboarding?.users?.map((element) => {
            return (
              <Grid.Column>
                <strong>{element.role.name}:</strong> {element.user.username}
              </Grid.Column>
            );
          })}
        </Grid>

        <div className="mt-30">
          <p>{onboarding?.template?.description}</p>
          {!_isEmpty(onboarding?.template?.sections) ? (
            <Tab className="mt-30" panes={panes} />
          ) : (
            <Message>
              <Message.Header>No sections nor tasks yet defined</Message.Header>
            </Message>
          )}
        </div>
      </Loader>
    </Container>
  );
}
