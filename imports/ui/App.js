import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

//App Components - represents the whole App
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDom.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(),
    });

    // Clear Form
    ReactDom.findDOMNode(this.refs.textInput).vaue='';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted, // true
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key = {task._id} task = {task} /> //
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

        <label className="hide-completed">
          <input
            type = "checkbox"
            readOnly
            checked = {this.state.hideCompleted}
            onClick = {this.toggleHideCompleted.bind(this)}
          />
        Hide Completed Tasks
        </label>

        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
        </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
}  ;

export default createContainer (() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(), // Sort from newest Post to Oldest
  }
}, App);
