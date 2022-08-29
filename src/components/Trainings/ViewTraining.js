import React, { useState, useEffect } from "react";
import { Card, Container, Divider, Header, Icon } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import { trainingsApi } from "../../api/trainings";
import Truncate from "react-truncate";
import { config } from "../../config/config";

export default function ViewTraining(props) {
  const { trainingId } = useParams();
  const [training, setTraining] = useState({});

  const fetchTraining = async () => {
    const response = await trainingsApi.get(trainingId);
    setTraining(response.data);
  };
  useEffect(() => {
    fetchTraining();
  }, []);

  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon name="clipboard list" />
        {training.name}
      </Header>
      <Divider />
      <p>{training.description}</p>
      <Card.Group className="mt-30">
        {training.modules?.map((module) => {
          return (
            <Card className="no-box-shadow">
              <Link to={`/modules/${module.id}`}>
                <Card onClick={() => {}}>
                  <Card.Content>
                    <Card.Header>{module.name}</Card.Header>

                    <Card.Description>
                      <Truncate lines={3}>{module.description}</Truncate>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            </Card>
          );
        })}
      </Card.Group>
    </Container>
  );
}
