import React, { Component } from 'react';

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <div style={{ position: 'fixed', textAlign: 'center', bottom: 0, width: 150 }}>
                <p>Copyright &copy; {(new Date().getFullYear())}</p>
            </div>
        );
    }
}
