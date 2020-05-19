import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import routes from '../routes/routes.json';

export default () => Component => {
    class RequireAuth extends React.Component {
        render() {
            const { loggedIn, ...passThroughProps } = this.props;

            if (loggedIn) {
                return <Component {...passThroughProps} />;
            } else {
                // return <Redirect to={routes.LOGIN} />
                return <Link to='/login'>Login</Link>
            }
        }
    }

    const mapStateToProps = (state) => ({
        loggedIn: false
    });

    return connect(mapStateToProps)(RequireAuth);
};
