import React, { useState, useEffect, useRef } from "react";
import { Container, Divider, Header, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import { trainingsApi } from "../../../api/trainings";

export default function ViewModule(props) {
  const { moduleId } = useParams();
  const [module, setModule] = useState({});

  const fetchModule = async () => {
    const response = await trainingsApi.getModule(moduleId);
    setModule(response.data);
  };
  useEffect(() => {
    fetchModule();
  }, []);

  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon name="book" />
        {module.name}
      </Header>
      <Divider />
      <div
        dangerouslySetInnerHTML={{
          __html: module.content,
        }}
      ></div>
    </Container>
  );
}
