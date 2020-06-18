import React, { Component, Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Routes from '../routes/routes';
import { ToastContainer, toast } from 'react-toastify';
import { Typography, CssBaseline } from '@material-ui/core';
import CONFIG_IPC from '../../config/ipc.json';
import { ipcRenderer } from 'electron';
import AppUpdate from '../pages/app_update';

// Theme
import theme from '../design/theme';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../design/css/App.css';

// Validator messages
import '../validators/messages';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCheckingUpdate: false
        }
    }

    componentDidMount() {
        ipcRenderer.on(CONFIG_IPC.UNCAUGHT_EXCEPTION, this.uncaughtExceptionOnMain.bind(this))
        ipcRenderer.on(CONFIG_IPC.APP_UPDATE.CHECK_FOR_UPDATE, this.checkForUpdate.bind(this));
        ipcRenderer.on(CONFIG_IPC.APP_UPDATE.UPDATE_FINISH, this.onUpdateFinish.bind(this));
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(CONFIG_IPC.UNCAUGHT_EXCEPTION, this.uncaughtExceptionOnMain.bind(this));
        ipcRenderer.removeListener(CONFIG_IPC.APP_UPDATE.CHECK_FOR_UPDATE, this.checkForUpdate.bind(this));
        ipcRenderer.removeListener(CONFIG_IPC.APP_UPDATE.UPDATE_FINISH, this.onUpdateFinish.bind(this));
    }

    uncaughtExceptionOnMain(event, error) {
        toast.error('Une erreure est survenue (Main Process)');
    }

    checkForUpdate(event, data) {
        this.changeUpdateState(true);
    }

    onUpdateFinish(event, data) {
        this.changeUpdateState(false);
    }

    changeUpdateState(isChecking) {
        this.setState({
            isCheckingUpdate: isChecking
        })
    }

    render() {
        const { isCheckingUpdate } = this.state;

        let app_component = <Routes />
        if (isCheckingUpdate) {
            app_component = <AppUpdate changeUpdateState={this.changeUpdateState.bind(this)} />
        }

        return (
            <Suspense fallback={<Typography component={'h1'}>Chargement..</Typography>}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {app_component}
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