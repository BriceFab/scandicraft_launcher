import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RequireAuth from '../security/require-auth';
import { withStyles, Button, Paper } from "@material-ui/core";
import { ipcRenderer } from 'electron';
import CONFIG_IPC from '../../config/ipc.json';
import { toast } from 'react-toastify';
import MainAppBar from '../components/header/appbar';
import HomeInfo from '../components/home_info/info';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import LaunchInfo from '../components/launch_tasks/info';
import background from '../../public/assets/images/login_background.png';
import i18next from 'i18next';

const styles = theme => ({
    bottomContainer: {
        bottom: 0,
        position: 'fixed',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        padding: 20,
        borderRadius: '20px 20px 0px 0px',
        backgroundColor: 'rgb(51, 51, 51, 0.6)'
        // backgroundColor: theme.palette.primary.main
    },
    bntPlay: {
        width: 300
    },
    image: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(2px)',
        width: '102%',
        left: '-1%',
        top: '-1%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
        overflow: 'hidden'
    },
    container: {
        overflow: 'hidden',
        position: 'relative',
        height: '100vh'
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
        console.log('renderer lauch error', err)

        if (error && error.message && error.code) {
            toast.error(`${error.message} (code: ${error.code})`)
        } else {
            toast.error(i18next.t('error.undefined'));
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

    render() {
        const { classes } = this.props;
        const { task } = this.state;

        return (
            <div>
                <MainAppBar />
                <div className={classes.container}>
                    <div className={classes.image}></div>
                    {task ? <LaunchInfo task={task} /> : <HomeInfo />}
                </div>
                {this.state.task == null &&
                    <Paper elevation={20} className={classes.bottomContainer}>
                        <Button onClick={this.onCallLaunch.bind(this)} className={classes.bntPlay} size={'large'} color={'primary'} variant={'contained'} disabled={this.state.task !== null} startIcon={<SportsEsportsIcon />}>
                            Jouer
                    </Button>
                    </Paper>
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            // logout
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth()(withStyles(styles)(MainPage)));