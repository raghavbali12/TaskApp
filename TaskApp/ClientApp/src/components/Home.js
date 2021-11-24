import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tracker } from './Tracker';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <Tracker {... this.props} />
                <div className='form-control-custom'>
                    <label style={{textAlign: 'center'}}>Show completed</label>
                    <input type='checkbox' checked={this.props.showCompletedTasks} onChange={(e) => this.props.toggleShowCompleted(e.currentTarget.checked)} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/about">About</Link>
                </div>
            </div>
        );
  }
}
