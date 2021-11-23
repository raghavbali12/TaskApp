import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tracker } from './Tracker';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <Tracker {... this.props} />
                <div style={{ textAlign: 'center' }}>
                    <Link to="/about">About</Link>
                </div>
            </div>
        );
  }
}
