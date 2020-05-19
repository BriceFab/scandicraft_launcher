import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as Color from "@material-ui/core/colors";
import Routes from '../routes/routes';

// Theme
import theme from '../design/theme';

// Validator messages
import '../validators/messages';

class App extends Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        );
    }

}

export default App;