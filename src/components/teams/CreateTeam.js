import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Container,
  Icon,
  Header,
  Divider,
  Form,
  Button,
  Search,
} from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ValidationErrorMessage } from "../Error/error";
import { teamsApi } from "@api/teams";
import { config } from "../../config/config";
import SearchCmp from "../SearchCmp";
import { userApi } from "../../api/users/user";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export default function CreateTeam(props) {
  const [users, setUsers] = useState([]);
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
    data.users = users;
    await teamsApi.create(data);
    window.location.replace(`${config.UI_BASE_URL}/teams`);
  };

  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon size="mini" name="group" />
        <Header.Content>New team</Header.Content>
      </Header>
      <Divider />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ValidationErrorMessage errors={errors} />
        <Form.Field disabled={isLoading} error={errors?.name}>
          <label htmlFor="name">Name</label>
          <input {...register("name")} id="name" name="name" label="Name" />
        </Form.Field>
        <Form.Field disabled={isLoading} error={errors?.description}>
          <label htmlFor="email">Description</label>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            label="Description"
          />
        </Form.Field>

        <Form.Field disabled={isLoading} error={errors?.users}>
          <div className="mb-5">
            <strong>Users</strong>
          </div>
          <SearchCmp
            multiple
            searchApi={userApi.search}
            setValues={setUsers}
            serializeResponse={(element) => {
              return {
                key: element.id,
                value: element.id,
                text: element.username,
              };
            }}
          />
        </Form.Field>

        <Button loading={isLoading} primary floated="right" type="submit">
          Create team
        </Button>
      </Form>
    </Container>
  );
}
