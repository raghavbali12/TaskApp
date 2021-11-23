import React, { Component } from 'react';
import { Button } from './Button';

export class Header extends Component {
    static displayName = Header.name;

    render() {
        return (
            <header className='header'>
                <h1>Tasks To-Do:</h1>
                <Button
                    color={this.props.showAddTask ? 'blue' : 'green' }
                    text={this.props.showAddTask ? 'Close' : '+Add'}
                    onClick={this.props.toggleShowAdd} />
            </header>
        );
    }
}
