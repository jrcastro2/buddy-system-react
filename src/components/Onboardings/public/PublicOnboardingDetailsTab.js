import React from "react";
import { Accordion, Checkbox, Icon, Tab } from "semantic-ui-react";
import PropTypes from "prop-types";
import { onboardingsApi } from "../../../api/onboardings";
import PublicCheckbox from "./publicCheckbox";

class PublicOnboardingDetailsTab extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: -1,
      isLoading: false,
    };
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleCheckboxClick = (taskId, completed) => {
    const { onboarding, user } = this.props;
    const payload = {
      onboarding_id: onboarding.id,
      task_id: taskId,
      user_id: user.id,
      completed: !completed,
    };
    this.setState({ isLoading: true });
    onboardingsApi.updateTask(payload);
    this.setState({ isLoading: false });
  };

  render() {
    const { onboarding, section, user } = this.props;
    const { activeIndex } = this.state;
    const template = onboarding.template;
    return (
      <Tab.Pane>
        {template.roles.map((role, index) => {
          return (
            <>
              {onboarding.users.map((element) => {
                if (
                  element.role.id === role.id &&
                  user.id === element.user.id
                ) {
                  return (
                    <Accordion className="mt-10" fluid styled>
                      <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        onClick={this.handleClick}
                      >
                        <Icon name="dropdown" />
                        {element.user.username} ({element.role.name})
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === index}>
                        {role.tasks.map((task) => {
                          return (
                            task.section_id === section.id && (
                              <div className="mt-5">
                                <PublicCheckbox
                                  onboarding={onboarding}
                                  user={user}
                                  task={task}
                                />
                              </div>
                            )
                          );
                        })}
                      </Accordion.Content>
                    </Accordion>
                  );
                }
              })}
            </>
          );
        })}
      </Tab.Pane>
    );
  }
}

PublicOnboardingDetailsTab.propTypes = {
  onboarding: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default PublicOnboardingDetailsTab;
