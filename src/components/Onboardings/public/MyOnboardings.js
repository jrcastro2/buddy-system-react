import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Input,
  Message,
} from "semantic-ui-react";
import { onboardingsApi } from "../../../api/onboardings";
import Error from "../../Error/error";
import Loader from "../../Loader/Loader";
import OnboardingCard from "../OnboardingCard";
import _isEmpty from "lodash/isEmpty";

class MyOnboardings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      lastSearchedQuery: "",
      results: {},
      isLoading: false,
      error: {},
    };
  }

  executeSearch = async (query) => {
    this.setState({ lastSearchedQuery: query, isLoading: true, error: {} });
    const response = await onboardingsApi.searchMyOnboardings(query);
    this.setState({ results: response, isLoading: false });
  };

  componentDidMount() {
    this.executeSearch("");
  }

  deleteTeam = async (teamId) => {
    this.setState({ isLoading: true });
    await onboardingsApi.delete(teamId).catch((error) => {
      this.setState({ isLoading: false, error: error });
    });
    this.setState({ isLoading: false });

    const response = this.executeSearch("");

    this.setState({ results: response });
  };

  render() {
    const { results, isLoading, error, searchQuery, lastSearchedQuery } =
      this.state;

    return (
      <Container className="rel-mt-3">
        <Header as="h1">
          <Icon size="mini" name="group" />
          <Header.Content>Onboardings</Header.Content>
        </Header>
        <Divider />
        <div className="mt-20">
          <Input
            onChange={(e, data) => this.setState({ searchQuery: data.value })}
            fluid
            loading={isLoading}
            disabled={isLoading}
            placeholder="Search onboardings..."
          >
            <input />
            <Button
              loading={isLoading}
              disabled={isLoading}
              primary
              className="ml-20"
              onClick={() => this.executeSearch(searchQuery)}
            >
              Search
            </Button>
          </Input>
        </div>
        <div className="mt-30">
          <Loader isLoading={isLoading}>
            <Error error={error}>
              {_isEmpty(results) ? (
                <Message>
                  <Message.Header>No matches</Message.Header>
                  <p>We couldn't find any matches for {lastSearchedQuery}</p>
                </Message>
              ) : (
                <div>
                  {Object.values(results).map((value, index) => {
                    return (
                      <>
                        <OnboardingCard publicUrl onboarding={value} />
                      </>
                    );
                  })}
                </div>
              )}
            </Error>
          </Loader>
        </div>
      </Container>
    );
  }
}

export default MyOnboardings;
