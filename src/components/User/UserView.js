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
  Table,
} from "semantic-ui-react";
import { userApi } from "../../api/users/user";
import Error from "../Error/error";
import Loader from "../Loader/Loader";
import _isEmpty from "lodash/isEmpty";
import DeleteModal from "../DeleteModal";

class UserView extends React.Component {
  constructor() {
    super();
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
    const response = await userApi.search(query);
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

  deleteUser = async (userId) => {
    this.setState({ isLoading: true });
    await userApi.delete(userId).catch((error) => {
      this.setState({ isLoading: false, error: error });
    });
    this.setState({ isLoading: false });
    const response = this.executeSearch("");
    this.setState({ results: response });
  };

  render() {
    const { isLoading, error, searchQuery, results, lastSearchedQuery } =
      this.state;
    return (
      <Container className="rel-mt-3">
        <Header as="h1">
          <Icon size="mini" name="user" />
          <Header.Content>Users</Header.Content>
        </Header>
        <Divider />
        <div className="mt-20">
          <Input
            onChange={(e, data) => this.setState({ searchQuery: data.value })}
            fluid
            loading={isLoading}
            disabled={isLoading}
            placeholder="Search users..."
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
                      <Table.HeaderCell>Username</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Administrator</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Actions
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {Object.values(results).map((value, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>{value.username}</Table.Cell>
                          <Table.Cell>{value.email}</Table.Cell>
                          <Table.Cell>
                            {value.is_admin ? "Yes" : "No"}
                          </Table.Cell>
                          <Table.Cell collapsing textAlign="right">
                          <DeleteModal
                              valueName={value.username}
                              onClick={() => this.deleteUser(value.id)}
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

export default UserView;
