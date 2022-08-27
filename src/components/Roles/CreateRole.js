import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Container,
  Icon,
  Header,
  Divider,
  Form,
  Button,
} from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ValidationErrorMessage } from "../Error/error";
import { config } from "../../config/config";
import { rolesApi } from "../../api/roles";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export default function CreateRole(props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    await rolesApi.create(data);
    window.location.replace(`${config.UI_BASE_URL}/roles`);
  };

  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon size="mini" name="id badge outline" />
        <Header.Content>New role</Header.Content>
      </Header>
      <Divider />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ValidationErrorMessage errors={errors} />
        <Form.Field disabled={isLoading} error={errors?.name}>
          <label htmlFor="name">Name</label>
          <input {...register("name")} id="name" name="name" label="Name" />
        </Form.Field>

        <Button loading={isLoading} primary floated="right" type="submit">
          Create role
        </Button>
      </Form>
    </Container>
  );
}
