import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Color from "@material-ui/core/colors";
import Routes from '../routes/routes';
import { Route, Link } from 'react-router-dom';
import routes from '../routes/routes.json'
import LoginPage from '../pages/login';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#EC7D00',
        },
        green: {
            main: Color.green[500],
        },
        red: {
            main: Color.red[500],
        }
    },
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Link to={routes.LOGIN}>Route login</Link>
            <Routes></Routes>
        </MuiThemeProvider>
    );
}

export default App;