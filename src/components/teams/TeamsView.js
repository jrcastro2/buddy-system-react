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
import { teamsApi } from "@api/teams";
import Error from "../Error/error";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";

class TeamsView extends React.Component {
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
    const response = await teamsApi.search(query);
    this.setState({ results: response, isLoading: false });
  };

  componentDidMount() {
    this.executeSearch("");
  }

  handleKeyPress = (event) => {
    const { searchQuery } = this.state;

    if (event.key === "Enter") {
      this.executeSearch(searchQuery);
    }
  };

  deleteTeam = async (teamId) => {
    this.setState({ isLoading: true });
    await teamsApi.delete(teamId).catch((error) => {
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
          <Header.Content>Teams</Header.Content>
        </Header>
        <Divider />
        <div className="mt-20">
          <Input
            onChange={(e, data) => this.setState({ searchQuery: data.value })}
            fluid
            loading={isLoading}
            disabled={isLoading}
            placeholder="Search teams..."
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
            <Link to="/teams/new">
              <Button
                loading={isLoading}
                disabled={isLoading}
                positive
                className="ml-20"
              >
                New team
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
                <Table basic="very" celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Actions
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {Object.values(results).map((value, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <Link to={`/teams/${value.id}`}>{value.name}</Link>
                          </Table.Cell>
                          <Table.Cell collapsing textAlign="right">
                            <Link to={`/teams/${value.id}/edit`}>
                              <Button className="ml-20">Edit</Button>
                            </Link>

                            <DeleteModal
                              valueName={value.name}
                              onClick={() => this.deleteTeam(value.id)}
                            >
                              <Button negative className="ml-20">
                                Delete
                              </Button>
                            </DeleteModal>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              )}
            </Error>
          </Loader>
        </div>
      </Container>
    );
  }
}

export default TeamsView;
