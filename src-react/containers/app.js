import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Color from "@material-ui/core/colors";
import Routes from '../routes/routes';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#b30000'
        }
    },
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Routes></Routes>
        </MuiThemeProvider>
    );
}

export default App;