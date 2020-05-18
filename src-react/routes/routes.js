import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes.json';
import LoginPage from '../pages/login';
import NotFound from '../pages/not-found';
import MainPage from '../pages/main';

export default function Routes() {
    return (
        <Switch>
            <Route path={routes.LAUNCHER} component={MainPage} />
            <Route path={routes.LOGIN} component={LoginPage} />
            <Route component={NotFound}/>
        </Switch>
    );
}
