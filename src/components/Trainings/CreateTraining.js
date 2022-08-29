import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import _isEmpty from "lodash/isEmpty";

import {
  Container,
  Icon,
  Header,
  Divider,
  Form,
  Button,
  Modal,
  Input,
  Card,
} from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ValidationErrorMessage } from "../Error/error";
import { config } from "../../config/config";
import { trainingsApi } from "../../api/trainings";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ModuleCard from "./ModuleCard";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export default function CreateTraining(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState({});

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
    data.modules = modules;
    setIsLoading(false);
    await trainingsApi.create(data);
    window.location.replace(`${config.UI_BASE_URL}/trainings`);
  };

  const updateModules = (module, index) => {
    const updatedModules = modules;
    updatedModules[index] = module;
    setModules(updatedModules);
  };

  const removeModule = (index) => {
    modules.splice(index, 1);
    setModules([...modules]);
  };

  return (
    <Container className="rel-mt-3">
      <Header as="h1">
        <Icon size="mini" name="group" />
        <Header.Content>New training</Header.Content>
      </Header>
      <Divider />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ValidationErrorMessage errors={errors} />
        <Form.Field disabled={isLoading} error={errors?.name}>
          <label htmlFor="name">Name</label>
          <input {...register("name")} id="name" name="name" label="Name" />
        </Form.Field>
        <Form.Field disabled={isLoading} error={errors?.description}>
          <label>Description</label>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            label="Description"
          />
        </Form.Field>
        {!_isEmpty(modules) && (
          <>
            <strong>Modules</strong>{" "}
            <Card.Group className="mt-10 mb-20">
              {modules.map((module, index) => {
                return (
                  <ModuleCard
                    removeModule={removeModule}
                    updateModules={updateModules}
                    module={module}
                    index={index}
                  />
                );
              })}
            </Card.Group>
          </>
        )}

        <Button loading={isLoading} primary floated="right" type="submit">
          Create training
        </Button>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button loading={isLoading} floated="left" type="button">
              Add module
            </Button>
          }
        >
          <Modal.Header>Create module</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field disabled={isLoading}>
                <label>Name</label>
                <Input
                  onChange={(e, data) => {
                    setCurrentModule({ ...currentModule, name: data.value });
                  }}
                  placeholder=""
                  value={currentModule.name}
                />
              </Form.Field>
              <Form.Field disabled={isLoading}>
                <label>Short description</label>
                <Input
                  onChange={(e, data) => {
                    setCurrentModule({
                      ...currentModule,
                      description: data.value,
                    });
                  }}
                  placeholder=""
                  value={currentModule.description}
                />
              </Form.Field>
              <Form.Field className="display-grid" disabled={isLoading}>
                <label>Content</label>
                <div>
                  <CKEditor
                    editor={ClassicEditor}
                    data={currentModule.content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setCurrentModule({ ...currentModule, content: data });
                    }}
                  />
                </div>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              floated="left"
              color="black"
              onClick={() => {
                setOpen(false);
                setCurrentModule({});
              }}
            >
              Cancel
            </Button>
            <Button
              content="Create module"
              onClick={() => {
                setOpen(false);
                setModules([...modules, currentModule]);
                setCurrentModule({});
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Form>
    </Container>
  );
}
