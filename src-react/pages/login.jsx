import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { openURL } from '../services/url';
import config from '../../config/config.json';
import { connect } from 'react-redux';
import LoginForm from '../components/forms/login'
import { Link, Grid, Paper, withStyles, Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import logo from '../../public/assets/images/logo.png';
import background from '../../public/assets/images/login_background.png';

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

const styles = theme => ({
    root: {
        height: '100vh',
    },
    background: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        filter: 'blur(2px)',
        width: '101%',
        height: '101%',
        left: '-1%',
        bottom: '-1%',
        zIndex: -1,
    },
    leftContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        position: 'relative',
        overflow: 'hidden'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    paperGrid: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    logo: {
        width: '80%'
    }
});

class LoginPage extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={5} className={classes.leftContainer}>
                    <div className={classes.background}></div>
                    <img src={logo} className={classes.logo} />
                </Grid>
                <Grid item xs={7} component={Paper} elevation={6} square className={classes.paperGrid}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Se connecter
                        </Typography>
                        <LoginForm history={this.props.history} />
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));