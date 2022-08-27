import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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
import { teamsApi } from "@api/teams";
import { config } from "../../config/config";
import SearchCmp from "../SearchCmp";
import { userApi } from "../../api/users/user";
import { useParams } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export default function EditTeam(props) {
  const { teamId } = useParams();
  const [users, setUsers] = useState([]);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const [defaultName, setDefaultName] = useState(null);
  const [defaultDescription, setDefaultDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchTeam = async () => {
    const response = await teamsApi.get(teamId);
    setDefaultName(response.data.name);
    setDefaultDescription(response.data.description);
    setDefaultUsers(response.data.users);
    const userValues = response.data.users.map((user) => {
      return user.id;
    });
    setUsers(userValues);
    setValue("name", response.data.name);
    setValue("description", response.data.description);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    data.users = users;
    await teamsApi.edit(teamId, data);
    window.location.replace(`${config.UI_BASE_URL}/teams`);
  };

  const serializeResponse = (element) => {
    return {
      key: element.id,
      value: element.id,
      text: element.username,
    };
  };

  const serializeUsers = () => {
    return defaultUsers.map((element) => {
      return serializeResponse(element);
    });
  };

  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon size="mini" name="group" />
        <Header.Content>Edit team</Header.Content>
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
            defaultValue={defaultDescription}
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
            defaultOptions={serializeUsers()}
            serializeResponse={serializeResponse}
          />
        </Form.Field>

        <Button loading={isLoading} primary floated="right" type="submit">
          Edit team
        </Button>
      </Form>
    </Container>
  );
}
