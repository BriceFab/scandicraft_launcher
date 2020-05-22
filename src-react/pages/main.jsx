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
    constructor(props) {
        super(props);

        this.state = {
            task: null
        }
    }

    onCallLaunch() {
        ipcRenderer.send(CONFIG_IPC.LAUNCH_SCANDICRAFT, {
            username: this.props.user
        })
    }

    updateLaunchTask(event, data) {
        this.setState({
            task: data.data
        })
    }

    componentDidMount() {
        ipcRenderer.on(CONFIG_IPC.UPDATE_LAUNCH_TASK, this.updateLaunchTask.bind(this))
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(CONFIG_IPC.UPDATE_LAUNCH_TASK, this.updateLaunchTask.bind(this));
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

    render() {
        console.log('render state', this.state)
        return (
            <div>
                <h1>
                    Page principale
                </h1>
                <Button onClick={this.onCallLaunch.bind(this)} color={'primary'} variant={'contained'}>
                    Jouer
                </Button>
                {this.renderTask()}
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