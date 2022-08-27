import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  Header,
  Icon,
  Message,
  Tab,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import { templatesApi } from "../../api/templates";
import TemplateDetailsTab from "./TemplateDetailsTab";
import Loader from "../Loader/Loader";

export default function TemplateDetails(props) {
  const { templateId } = useParams();
  const [template, setTemplate] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeam = async () => {
    setIsLoading(true);
    const response = await templatesApi.get(templateId);
    setTemplate(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTeam();
  }, []);

  const panes =
    template.sections &&
    template.sections.map((section) => {
      return {
        menuItem: section.name,
        render: () => (
          <TemplateDetailsTab section={section} template={template} />
        ),
      };
    });

  return (
    <Loader isLoading={isLoading}>
      <Container className="rel-mt-3">
        <Header as="h1">
          <Icon name="file text" />
          {template.name}
        </Header>
        <Divider />
        <p>{template.description}</p>
        {!_isEmpty(template.sections) ? (
          <Tab className="mt-30" panes={panes} />
        ) : (
          <Message>
            <Message.Header>No sections nor tasks yet defined</Message.Header>
          </Message>
        )}
      </Container>
    </Loader>
  );
}
