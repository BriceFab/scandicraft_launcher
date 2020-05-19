import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RequireAuth from '../security/require-auth';
import { withStyles, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import routes from '../routes/routes.json';

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