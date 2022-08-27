import _ from "lodash";
import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";

export default class SearchCmp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      isLoading: false,
      selected: [],
      error: {},
      defaultValues: [],
      values: null,
      touched: false,
    };
  }

  executeSearch = async (searchQuery) => {
    const { searchApi, serializeResponse, multiple } = this.props;
    const { selected } = this.state;
    this.setState({ isLoading: true });
    const response = await searchApi(searchQuery);
    const serializedResponse = response.map((element) => {
      return serializeResponse(element);
    });
    let options = serializedResponse;
    if (multiple) {
      options = serializedResponse.concat(selected);
    }
    this.setState({ options: options, isLoading: false });
  };

  getDefaultValues = () => {
    const { defaultOptions, setSelected, multiple } = this.props;
    const { values, touched } = this.state;
    if (!touched && _isEmpty(values) && !_isEmpty(defaultOptions)) {
      let dfaultValues = null;
      if (multiple) {
        dfaultValues = defaultOptions.map((option) => {
          return option.value;
        });
      } else {
        dfaultValues = defaultOptions[0].key;
      }

      if (setSelected) {
        setSelected(defaultOptions);
      }
      this.setState({
        options: defaultOptions,
        selected: defaultOptions,
        values: dfaultValues,
        touched: true,
      });
    }
  };

  componentDidMount() {
    const { defaultOptions } = this.props;
    if (_isEmpty(defaultOptions)) {
      this.executeSearch("");
    } else {
      this.getDefaultValues();
    }
  }

  componentDidUpdate() {
    const { defaultOptions } = this.props;

    this.getDefaultValues();
  }

  handleSearchChange = (e, data) => {
    this.executeSearch(data.searchQuery);
  };

  handleOnChange = (e, data) => {
    const { setValues, setSelected, multiple } = this.props;
    let selectedOptions = [];
    if (multiple) {
      selectedOptions = data.options.filter((option) =>
        data.value.includes(option.value)
      );
    } else {
      selectedOptions = data.options.filter(
        (option) => data.value === option.value
      );
    }

    this.setState({
      selected: selectedOptions,
      values: data.value,
      touched: true,
    });
    if (setSelected) {
      setSelected(selectedOptions);
    }
    setValues(data.value);
  };

  render() {
    const { isLoading, multiple } = this.props;
    const { options, values } = this.state;
    return (
      <Dropdown
        loading={isLoading}
        placeholder="Search..."
        onChange={this.handleOnChange}
        fluid
        multiple={multiple}
        search
        selection
        onSearchChange={this.handleSearchChange}
        options={options}
        value={values}
      />
    );
  }
}

SearchCmp.propTypes = {
  isLoading: PropTypes.bool,
  searchApi: PropTypes.func.isRequired,
  serializeResponse: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  defaultOptions: PropTypes.array,
};

SearchCmp.defaultProps = {
  isLoading: false,
  children: null,
  defaultOptions: [],
  setSelected: null,
  multiple: false,
};
