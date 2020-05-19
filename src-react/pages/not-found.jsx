import React, { Component } from 'react';
import routes from '../routes/routes.json';
import { Link } from 'react-router-dom';

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
                Page indisponible {' '} <Link to={routes.LAUNCHER}>Accueil</Link>
            </div>
        )
    }
}