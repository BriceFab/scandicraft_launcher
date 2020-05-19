import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { openURL, webURLFromURI } from '../services/url';
import config from '../../config/config.json';
import { connect } from 'react-redux';
import LoginForm from '../components/forms/login'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
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
            <LoginForm history={this.props.history} />
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(LoginPage);