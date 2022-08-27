import React from "react";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Input,
  Message,
  Table,
} from "semantic-ui-react";
import _isEmpty from "lodash/isEmpty";
import Loader from "../Loader/Loader";
import Error from "../Error/error";
import { Link } from "react-router-dom";
import { onboardingsApi } from "../../api/onboardings";
import OnboardingCard from "./OnboardingCard";

class OnboardingView extends React.Component {
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
    const response = await onboardingsApi.search(query);
    this.setState({ results: response, isLoading: false });
  };

  handleKeyPress = (event) => {
    const { searchQuery } = this.state;

    if (event.key === "Enter") {
      this.executeSearch(searchQuery);
    }
  };

  deleteOnboarding = async (onboardingId) => {
    this.setState({ isLoading: true });
    await onboardingsApi.delete(onboardingId).catch((error) => {
      this.setState({ isLoading: false, error: error });
    });
    this.setState({ isLoading: false });
    const response = this.executeSearch("");
    this.setState({ results: response });
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
            onKeyPress={this.handleKeyPress}
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
            <Link to="/onboardings/new">
              <Button
                loading={isLoading}
                disabled={isLoading}
                positive
                className="ml-20"
              >
                New onboarding
              </Button>
            </Link>
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
                        <OnboardingCard
                          deleteOnboarding={this.deleteOnboarding}
                          onboarding={value}
                        />
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

export default OnboardingView;
