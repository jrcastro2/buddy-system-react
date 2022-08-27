import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  Header,
  Icon,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { teamsApi } from "../../api/teams";
import _isEmpty from "lodash/isEmpty";

export default function ViewTeam(props) {
  const { teamId } = useParams();
  const [team, setTeam] = useState({});

  const fetchTeam = async () => {
    const response = await teamsApi.get(teamId);
    setTeam(response.data);
  };
  useEffect(() => {
    fetchTeam();
  }, []);

  const displayMembers = () => {
    return (
      <>
        <Header as="h3">Members</Header>
        <Segment>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {team.users.map((user, index) => {
                return (
                  <Table.Row>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>
      </>
    );
  };

  const emptyMembers = () => {
    return (
      <Message className="mt-20">
        <Message.Header>No members</Message.Header>
        <p>No members assigned to this team yet.</p>
      </Message>
    );
  };

  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon name="group" />
        {team.name}
      </Header>
      <Divider />
      <p>{team.description}</p>
      {_isEmpty(team.users) ? emptyMembers() : displayMembers()}
    </Container>
  );
}
