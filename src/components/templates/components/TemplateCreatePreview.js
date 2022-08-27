import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  Header,
  Icon,
  Message,
  Tab,
} from "semantic-ui-react";
import _isEmpty from "lodash/isEmpty";
import TemplateCreateDetailsTab from "./TemplateCreateDetailsTab";

export default function TemplateCreatePreview(props) {
  const { template, roles } = props;
  const panes =
    template.sections &&
    template.sections.map((section) => {
      return {
        menuItem: section.name,
        render: () => (
          <TemplateCreateDetailsTab
            roles={roles}
            section={section}
            template={template}
          />
        ),
      };
    });

  return (
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
  );
}
