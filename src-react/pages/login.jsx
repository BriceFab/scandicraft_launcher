import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { openURL } from '../services/url';
import config from '../../config/config.json';
import { connect } from 'react-redux';
import LoginForm from '../components/forms/login'
import { Link } from '@material-ui/core';

function Copyright() {
    return (
        <Typography variant="body1" color="textSecondary" align="center" style={{ paddingTop: 30 }}>
            {'Copyright © '}
            <Link color="inherit" href="#" onClick={() => openURL(config.WEB_BASE_URL)}>
                ScandiCraft
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class LoginPage extends Component {
    render() {
        return (
            <div>
                <LoginForm history={this.props.history} />
                <Copyright />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(LoginPage);