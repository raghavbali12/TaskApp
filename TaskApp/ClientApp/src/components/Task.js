import React, { Component } from 'react';
import { FaTimes, FaEdit, FaCheck } from 'react-icons/fa'
import ReactTooltip from "react-tooltip";
import { AddTask } from './AddTask';


export class Task extends Component {
    static displayName = Task.name;

    constructor() {
        super();
        this.state = {
            showEdit: false
        }

    }

    toggleShowEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }

    render() {
        return (
            <div className={this.props.reminder ? 'task reminder' : 'task'} onDoubleClick={() => this.props.toggleReminder(this.props.id)}>
                <h3>{this.props.task_text}
                    <div>
                        <FaEdit 
                        data-tip data-for="editTask" 
                        onClick={() => this.setState({ showEdit: !this.state.showEdit })} />
                        <FaCheck 
                        data-tip data-for="completeTask" 
                        style={{ color: 'green', cursor: 'pointer', margin:'10px' }} 
                        onClick={() => this.props.completeTask(this.props.id, this.props.task_text, this.props.task_due_date, this.props.reminder)} />
                        <FaTimes 
                        data-tip data-for="deleteTask" 
                        style={{ color: 'red', cursor: 'pointer' }} 
                        onClick={() => this.props.deleteTask(this.props.id)} />
                        <ReactTooltip id="editTask" place="top" effect="solid">
                            Edit this task
                        </ReactTooltip>
                        <ReactTooltip id="deleteTask" place="top" effect="solid">
                            Delete this task
                        </ReactTooltip>
                        <ReactTooltip id="completeTask" place="top" effect="solid">
                            Complete this task
                        </ReactTooltip>
                    </div>
                </h3>
                <h6>{this.props.task_due_date}</h6>
                {this.state.showEdit &&
                    <AddTask
                        id={this.props.id}
                        text={this.props.task_text}
                        day={this.props.task_due_date}
                        reminder={this.props.reminder}
                        onSubmit={this.props.editTask}
                        toggleForm={this.toggleShowEdit}
                        formType='editTask' />}
            </div>
        );
    }
}
