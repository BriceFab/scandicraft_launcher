import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RequireAuth from '../security/require-auth';
import { withStyles, Button } from "@material-ui/core";
import { ipcRenderer } from 'electron';
import CONFIG_IPC from '../../config/ipc.json';

const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    },
});

class MainPage extends Component {
    onCallLaunch() {
        console.log('state', this.props.user)

        ipcRenderer.send(CONFIG_IPC.LAUNCH_SCANDICRAFT, {
            username: this.props.user
        })
    }

    render() {
        return (
            <div>
                Main page
                <Button onClick={this.onCallLaunch.bind(this)} color={'primary'} variant={'contained'}>
                    Launch
                </Button>
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
            // increment,
            // decrement,
            // incrementIfOdd,
            // incrementAsync
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth()(withStyles(styles)(MainPage)));