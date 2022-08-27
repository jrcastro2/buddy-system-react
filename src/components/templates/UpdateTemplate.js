import React, { useState, useEffect } from "react";
import { templatesApi } from "../../api/templates";
import { useParams } from "react-router-dom";
import EditTemplate from "./EditTemplate";
import _isEmpty from "lodash/isEmpty";

export default function UpdateTemplate(props) {
  const { templateId } = useParams();
  const [template, setTemplate] = useState({});

  const fetchTemplate = async () => {
    const response = await templatesApi.get(templateId);
    setTemplate(response.data);
  };

  useEffect(() => {
    fetchTemplate();
  }, []);
  return (
    !_isEmpty(template) && (
      <EditTemplate templateId={templateId} template={template} />
    )
  );
}
