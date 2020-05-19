import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RequireAuth from '../security/require-auth';
import { withStyles, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import routes from '../routes/routes.json';
import IPC_CONFIG from '../../config/ipc.json';
import { ipcRenderer } from 'electron';

const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    },
});

class MainPage extends Component {
    constructor(props) {
        super(props)

        console.log('main page constructor call')
    }

    onCallLaunch() {
        alert('launch')

        console.log('state', this.props.user)

        ipcRenderer.send(IPC_CONFIG.FETCH_LAUNCH, {
            user: this.props.user
        });
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
    console.log('test ', state)
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

// export default MainPage;
// export default RequireAuth()(connect(mapStateToProps, mapDispatchToProps)(MainPage));
export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth()(withStyles(styles)(MainPage)));