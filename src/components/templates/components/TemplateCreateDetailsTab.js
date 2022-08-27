import React from "react";
import { Accordion, Checkbox, Icon, Tab } from "semantic-ui-react";
import PropTypes from "prop-types";

class TemplateCreateDetailsTab extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: -1,
    };
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { template, section, roles } = this.props;
    const { activeIndex } = this.state;

    return (
      <Tab.Pane>
        {template.roles.map((role, index) => {
          const roleDetailed = roles.find((element) => element.key === role);

          return (
            <Accordion className="mt-10" fluid styled>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {roleDetailed ? roleDetailed.text : role.name}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                {section.tasks.map((task) => {
                  return (
                    task.role_id === role && (
                      <div className="mt-5">
                        <Checkbox label={task.name} readOnly />
                      </div>
                    )
                  );
                })}
              </Accordion.Content>
            </Accordion>
          );
        })}
      </Tab.Pane>
    );
  }
}

TemplateCreateDetailsTab.propTypes = {
  template: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
};

export default TemplateCreateDetailsTab;
