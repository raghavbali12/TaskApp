import React, { Component } from 'react';
import { FaTimes, FaEdit, FaCheck } from 'react-icons/fa'
import ReactTooltip from "react-tooltip";
import { AddTask } from './AddTask';


export class CompletedTask extends Component {
    static displayName = CompletedTask.name;

    render() {
        return (
            <div className={this.props.reminder ? 'task reminder' : 'task'} >
                <h3>{this.props.task_text}
                    <div>
                        <FaTimes 
                        data-tip data-for="deleteTask" 
                        style={{ color: 'red', cursor: 'pointer' }} 
                        onClick={() => this.props.deleteTask(this.props.id)} />
                        <ReactTooltip id="deleteTask" place="top" effect="solid">
                            Delete this task
                        </ReactTooltip>
                    </div>
                </h3>
                <h6>{this.props.task_due_date}</h6>
            </div>
        );
    }
}
