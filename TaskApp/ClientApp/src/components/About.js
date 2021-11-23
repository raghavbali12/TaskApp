import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class About extends Component {
    static displayName = About.name;

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h4>Version 1.0.0</h4>
                <p>Created using React.js, C#.NET 5 and PostgreSQL!</p>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }
}
