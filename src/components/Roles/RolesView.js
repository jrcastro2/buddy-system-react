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
import { rolesApi } from "../../api/roles";
import Error from "../Error/error";
import Loader from "../Loader/Loader";
import _isEmpty from "lodash/isEmpty";
import DeleteModal from "../DeleteModal";

class RolesView extends React.Component {
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
    const response = await rolesApi.search(query);
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

  deleteRole = async (roleId) => {
    this.setState({ isLoading: true });
    await rolesApi.delete(roleId).catch((error) => {
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
          <Icon size="mini" name="id badge outline" />
          <Header.Content>Roles</Header.Content>
        </Header>
        <Divider />
        <div className="mt-20">
          <Input
            onChange={(e, data) => this.setState({ searchQuery: data.value })}
            fluid
            loading={isLoading}
            disabled={isLoading}
            placeholder="Search roles..."
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
            <Link to="/roles/new">
              <Button
                loading={isLoading}
                disabled={isLoading}
                positive
                className="ml-20"
              >
                New role
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
                          <Table.Cell>{value.name}</Table.Cell>
                          <Table.Cell collapsing textAlign="right">
                            <Link to={`/roles/${value.id}/edit`}>
                              <Button className="ml-20">Edit</Button>
                            </Link>
                            <DeleteModal
                              valueName={value.name}
                              onClick={() => this.deleteRole(value.id)}
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

export default RolesView;
