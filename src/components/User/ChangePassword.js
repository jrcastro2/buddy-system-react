import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userApi } from "../../api/users/user";

import {
  Container,
  Icon,
  Header,
  Divider,
  Form,
  Button,
} from "semantic-ui-react";
import { ValidationErrorMessage } from "../Error/error";
import _isEmpty from "lodash/isEmpty";

const schema = yup
  .object({
    new_password: yup.string().required(),
    confirm_password: yup.string().required(),
    old_password: yup.string().required(),
  })
  .required();

export default function ChangePasswordCmp(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { error: reduxErrors, isLoading } = props;

  const onSubmit = (data) => {
    const { changePassword, user } = props;
    changePassword(user.id, data);
  };
  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon size="mini" name="key" />
        <Header.Content>Change Password</Header.Content>
      </Header>
      <Divider />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ValidationErrorMessage errors={!_isEmpty(errors) ? errors : reduxErrors} />
        <Form.Field disabled={isLoading} error={errors?.email}>
          <label htmlFor="old_password">Old password</label>
          <input
            {...register("old_password")}
            id="old_password"
            name="old_password"
            label="Old password"
          />
        </Form.Field>
        <Form.Field disabled={isLoading} error={errors?.email}>
          <label htmlFor="new_password">New password</label>
          <input
            {...register("new_password")}
            id="new_password"
            name="new_password"
            label="New password"
          />
        </Form.Field>
        <Form.Field disabled={isLoading} error={errors?.email}>
          <label htmlFor="confirm_password">Confirm password</label>
          <input
            {...register("confirm_password")}
            id="confirm_password"
            name="confirm_password"
            label="Confirm password"
          />
        </Form.Field>
        <Button loading={isLoading} primary floated="right" type="submit">
          Change password
        </Button>
      </Form>
    </Container>
  );
}
