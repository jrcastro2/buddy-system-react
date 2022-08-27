import React from "react";
import { Accordion, Checkbox, Icon, Tab } from "semantic-ui-react";
import PropTypes from "prop-types";

class TemplateDetailsTab extends React.Component {
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
    const { template, section } = this.props;
    const { activeIndex } = this.state;

    return (
      <Tab.Pane>
        {template.roles.map((role, index) => {
          return (
            <Accordion className="mt-10" fluid styled>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {role.name}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                {role.tasks.map((task) => {
                  return (
                    task.section_id === section.id && (
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

TemplateDetailsTab.propTypes = {
  template: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
};

export default TemplateDetailsTab;
