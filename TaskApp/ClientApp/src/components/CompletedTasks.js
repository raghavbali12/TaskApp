import React, { Component } from 'react';
import { CompletedTask } from './CompletedTask';

export class CompletedTasks extends Component {
    static displayName = CompletedTasks.name;


    render() {
        return (
            <div>
                <h3 style={{textAlign: 'center', textDecoration: 'underline', padding:'10px'}}>Completed Tasks</h3>
                {this.props.tasks.map((task) =>
                        (task.completed && 
                            <CompletedTask {...task}
                            key={task.id}
                            deleteTask={this.props.deleteTask} />))} 
            </div>
        );
    }
}