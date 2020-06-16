import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RequireAuth from '../security/require-auth';
import { withStyles, Button, Paper } from "@material-ui/core";
import { ipcRenderer } from 'electron';
import CONFIG_IPC from '../../config/ipc.json';
import { toast } from 'react-toastify';
import { logout } from '../actions/user';
import MainAppBar from '../components/header/appbar';
import HomeInfo from '../components/home_info/info';

const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    },
    mainPaper: {
        height: 'calc(100vh - 314px)',
        // backgroundColor: 'red',
        borderRadius: 0
    },
    bottomContainer: {
        bottom: 0,
        position: 'fixed',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: theme.palette.primary.main
    }
});

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: null,
            launch_error: null
        }
    }

    onCallLaunch() {
        ipcRenderer.send(CONFIG_IPC.LAUNCH_SCANDICRAFT, {
            user: this.props.user
        })
    }

    updateLaunchTask(event, data) {
        this.setState({
            task: data.data
        })
    }

    catchLaunchError(event, err) {
        const { error } = err;
        console.log('renderer lauch error', error)

        if (error.message && error.code) {
            toast.error(`${error.message} (code: ${error.code})`)
        } else {
            toast.error('Une erreure est survenue.. Contactez un membre du staff si l\'erreur persiste');
        }
    }

    componentDidMount() {
        ipcRenderer.on(CONFIG_IPC.UPDATE_LAUNCH_TASK, this.updateLaunchTask.bind(this));
        ipcRenderer.on(CONFIG_IPC.LAUNCH_ERROR, this.catchLaunchError.bind(this));
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(CONFIG_IPC.UPDATE_LAUNCH_TASK, this.updateLaunchTask.bind(this));
        ipcRenderer.removeListener(CONFIG_IPC.LAUNCH_ERROR, this.catchLaunchError.bind(this));
    }

    renderTask() {
        const { task } = this.state;

        if (task == null) {
            return <p>Aucune tâche en cours</p>
        } else {
            if (task.active) {
                return (
                    <div>
                        <h3>Tâche en cours:</h3>
                        <code>
                            Nom: {task.task_name}<br />
                            {
                                this.renderTaskProgress()
                            }
                        </code>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3>Chargement</h3>
                    </div>
                )
            }
        }
    }

    renderTaskProgress() {
        const { task } = this.state;

        if (task.progress) {
            console.log('progession', task.progress)
            return (
                <div>
                    Progression: {task.progress}
                </div>
            )
        } else {
            return null
        }
    }

    onLogout() {
        console.log('call logout')

        this.props.logout()
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <MainAppBar />
                <HomeInfo />
                <Paper elevation={3} className={classes.mainPaper}>
                    <Button onClick={this.onLogout.bind(this)} size={'small'} color={'primary'} variant={'outlined'} disabled={this.state.task !== null}>
                        Se déconnecter
                    </Button>
                    {this.renderTask()}
                    <div className={classes.bottomContainer}>
                        <Button onClick={this.onCallLaunch.bind(this)} size={'large'} color={'primary'} variant={'contained'} disabled={this.state.task !== null}>
                            Jouer
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
        // counter: state.counter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            logout
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth()(withStyles(styles)(MainPage)));