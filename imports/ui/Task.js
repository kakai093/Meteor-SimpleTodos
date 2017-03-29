import React, { Component, PropTypes } from 'react';

//Task Component - represents a single ToDo Item
export default class Task extends Component {
  render() {
    return (
      <li>{this.props.task.text}</li>
    );
  }
}

Task.propTypes = {
  //This Component gets the task to display through a React Prop
  //We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
