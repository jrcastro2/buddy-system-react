import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { templatesApi } from "../../../api/templates";
import { userApi } from "../../../api/users/user";
import SearchCmp from "../../SearchCmp";

class FillRoles extends React.Component {
  constructor() {
    super();
    this.state = {
      template: {},
    };
  }

  getTemplate = async () => {
    const { onboarding, updateParentState } = this.props;
    const response = await templatesApi.get(onboarding.template_id);
    this.setState({
      template: response.data,
    });
    updateParentState({ template: response.data });
  };

  componentDidMount() {
    this.getTemplate();
  }

  setUser = (userId, roleId) => {
    const { onboarding, updateParentState } = this.props;
    let usersRole = onboarding.users
      ? onboarding?.users.filter((element) => element.role != roleId)
      : [];
    usersRole.push({ user: userId, role: roleId, name });
    updateParentState({
      onboarding: {
        ...onboarding,
        users: usersRole,
      },
    });
    //setear elemento para cada role, con ifromarcion adicional?
    // obligar a rellenar todos los campos
  };

  setSelectedUsers = (options) => {
    const { selectedUsers, updateParentState } = this.props;
    if (!selectedUsers?.some((element) => element.key === options[0].key)) {
      const updatedSelectedUsers = selectedUsers;
      updatedSelectedUsers.push(options[0]);

      updateParentState({
        selectedUsers: updatedSelectedUsers,
      });
    }
  };

  setDefault = (roleID) => {
    const { selectedUsers, onboarding } = this.props;
    const userRole = onboarding?.users?.filter(
      (element) => element.role === roleID
    );
    const seletedUser = selectedUsers.filter(
      (element) => element.key === userRole[0]?.user
    );
    return seletedUser;
  };

  render() {
    const { template } = this.state;
    const { onboarding } = this.props;
    return (
      <>
        {template?.roles?.map((role, index) => {
          const value =
            onboarding.users?.role === role.id ? onboarding.users?.name : "";
          return (
            <>
              <div className="mb-5 mt-10">
                <strong>{role.name}</strong>
              </div>
              <SearchCmp
                searchApi={userApi.search}
                setValues={(userId) => this.setUser(userId, role.id)}
                setSelected={this.setSelectedUsers}
                defaultOptions={this.setDefault(role.id)}
                serializeResponse={(element) => {
                  return {
                    key: element.id,
                    value: element.id,
                    text: element.username,
                  };
                }}
              />
            </>
          );
        })}
      </>
    );
  }
}

FillRoles.propTypes = {
  onboarding: PropTypes.object.isRequired,
  selectedUsers: PropTypes.object.isRequired,
  updateParentState: PropTypes.func.isRequired,
};

export default FillRoles;
