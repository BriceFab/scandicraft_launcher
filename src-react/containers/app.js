import React, { Component, Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Routes from '../routes/routes';
import { ToastContainer } from 'react-toastify';
import { Typography } from '@material-ui/core';

// Theme
import theme from '../design/theme';
import 'react-toastify/dist/ReactToastify.css';

// Validator messages
import '../validators/messages';

class App extends Component {

    render() {
        return (
            <Suspense fallback={<Typography component={'h1'}>Chargement..</Typography>}>
                <ThemeProvider theme={theme}>
                    <Routes />
                </ThemeProvider>
                <ToastContainer
                    position={'top-right'}
                    autoClose={3000}
                />
            </Suspense>
        );
    }

}

export default App;