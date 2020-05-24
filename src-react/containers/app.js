import React, { Component, Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Routes from '../routes/routes';
import { ToastContainer, toast } from 'react-toastify';
import { Typography } from '@material-ui/core';
import CONFIG_IPC from '../../config/ipc.json';
import { ipcRenderer } from 'electron';

// Theme
import theme from '../design/theme';
import 'react-toastify/dist/ReactToastify.css';

// Validator messages
import '../validators/messages';

class App extends Component {

    componentDidMount() {
        ipcRenderer.on(CONFIG_IPC.UNCAUGHT_EXCEPTION, this.uncaughtExceptionOnMain.bind(this))
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(CONFIG_IPC.UNCAUGHT_EXCEPTION, this.uncaughtExceptionOnMain.bind(this));
    }

    uncaughtExceptionOnMain(event, error) {
        toast.error('Une erreure est survenue (Main Process)');
    }

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