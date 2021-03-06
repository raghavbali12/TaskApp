import React, { Component } from 'react';
import { SpinnerCircular } from 'spinners-react';
import { AddTask } from './AddTask';
import { Header } from './Header';
import { Tasks } from './Tasks'
import { CompletedTasks } from './CompletedTasks';
import './Tracker.css';

export class Tracker extends Component {
    static displayName = Tracker.name;

    render() {
        return (
            <div className='box'>
                <Header {... this.props} toggleShowAdd={this.props.toggleShowAdd} />
                {this.props.showAddTask &&
                    <AddTask
                        id={null}
                        text=''
                        day=''
                        reminder={false}
                        completed={false}
                        onSubmit={this.props.addTask}
                        toggleForm={null}
                        formType='addTask' />}
                {this.props.setLoading ?
                    <SpinnerCircular
                        size="100"
                        style={{ display: "block", margin: "auto" }} /> :
                    (this.props.tasksToShow === 0) ? 
                        <p style={{textAlign: 'center'}}>No tasks yet</p> :
                        <div>
                            <Tasks {... this.props} />
                            {this.props.showCompletedTasks && 
                                <CompletedTasks {... this.props} />}
                        </div>}
            </div>
        );
    }
}
