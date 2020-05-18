import React, { Component } from 'react';
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

class App extends Component {

    constructor(props) {
        super(props);

        
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Routes></Routes>
            </MuiThemeProvider>
        );
    }

}

export default App;