import React, { Component } from 'react';

export default class NotFound extends Component {

    constructor(props) {
        super(props)
        const { match, location, history } = this.props;

        console.log('location ', location)
        console.log('match ', match)
        console.log('history ', history)
    }

    render() {
        return (
            <div>
                Route not found
            </div>
        )
    }
}