import React, { Component } from 'react';

export class Button extends Component {
    static displayName = Button.name;

    render() {
        return (
            <button className='btn' style={{ backgroundColor: this.props.color }} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}