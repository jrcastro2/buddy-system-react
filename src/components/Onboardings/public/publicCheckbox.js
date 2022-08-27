import React from "react";
import { Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";
import { onboardingsApi } from "../../../api/onboardings";

class PublicCheckbox extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    const { onboarding, task } = this.props;
    const checked = onboarding.onboarding_task_user.some(
      (element) => element.task_id === task.id && element.completed
    );
    this.setState({
      checked: checked,
    });
  }

  handleCheckboxClick = async (taskId) => {
    const { onboarding, user } = this.props;
    const { checked } = this.state;
    const payload = {
      onboarding_id: onboarding.id,
      task_id: taskId,
      user_id: user.id,
      completed: !checked,
    };
    this.setState({ isLoading: true });
    await onboardingsApi.updateTask(payload);
    this.setState({ isLoading: false, checked: !checked });
  };

  render() {
    const { task } = this.props;
    const { checked, isLoading } = this.state;
    return (
      <Checkbox
        checked={checked}
        label={task.name}
        disabled={isLoading}
        onClick={() => !isLoading && this.handleCheckboxClick(task.id)}
      />
    );
  }
}

PublicCheckbox.propTypes = {
  onboarding: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default PublicCheckbox;
