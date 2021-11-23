import React, { Component } from 'react';
import { Task } from './Task';
import { CompletedTask } from './CompletedTask';

export class Tasks extends Component {
    static displayName = Tasks.name;

    render() {
        return (
            <div>
                {this.props.tasks.map((task) =>
                    (this.props.showCompletedTasks ? 
                        (task.completed ? 
                            <CompletedTask {...task}
                            key={task.id}
                            deleteTask={this.props.deleteTask} /> :
                            <Task {...task}
                            key={task.id}
                            toggleReminder={this.props.toggleReminder}
                            deleteTask={this.props.deleteTask}
                            editTask={this.props.editTask}
                            completeTask={this.props.completeTask} />) :
                        (!task.completed && 
                        <Task {...task}
                            key={task.id}
                            toggleReminder={this.props.toggleReminder}
                            deleteTask={this.props.deleteTask}
                            editTask={this.props.editTask}
                            completeTask={this.props.completeTask} />)))}
                {this.props.tasksToShow === 0 && <div style={{textAlign: 'center'}}>No tasks yet</div>}
            </div>
        );
    }
}
