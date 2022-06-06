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
import { userApi } from "../../../api/users/user";
import { ErrorMessage } from "../../Error/error";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

export default function ProfileCmp(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const { fetchUserProfile, user } = props;
    userApi.update(user.id, data);
    // to reset the navbar name and will also need a loading state
    fetchUserProfile();
  };
  const { isLoading } = props

  const [user, setUser] = useState(null);

  useEffect(async () => {
    const { user } = props;
    const userSerialized = schema.noUnknown().cast(user);
    setUser(userSerialized);
  }, []);

  useEffect(() => {
    const { user } = props;
    const userSerialized = schema.noUnknown().cast(user);
    reset(userSerialized);
  }, [user, isLoading]);

  useEffect(() => {
    const { user } = props;
    const userSerialized = schema.noUnknown().cast(user);
    setUser(userSerialized);
  }, [isLoading]);

  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon size="mini" name="user" />
        <Header.Content>Profile</Header.Content>
      </Header>
      <Divider />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage errors={errors} />
        <Form.Field disabled={isLoading} error={errors?.username}>
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            id="username"
            name="username"
            label="Username"
          />
        </Form.Field>
        <Form.Field disabled={isLoading} error={errors?.email}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            id="email"
            name="email"
            label="Email address"
          />
        </Form.Field>

        <Button loading={isLoading} primary floated="right" type="submit">
          Update profile
        </Button>
      </Form>
    </Container>
  );
}
