import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import { ipcRenderer } from 'electron';
import CONFIG_IPC from '../../config/ipc.json';
import { toast } from 'react-toastify';

const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    },
});

class AppUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task_name: null
        }
    }

    componentDidMount() {
        ipcRenderer.on(CONFIG_IPC.APP_UPDATE.ERROR, this.onError.bind(this));
        ipcRenderer.on(CONFIG_IPC.APP_UPDATE.UPDATE_AVAILABLE, this.updateAvailable.bind(this));
        ipcRenderer.on(CONFIG_IPC.APP_UPDATE.UPDATE_NOT_AVAILABLE, this.updateNotAvailable.bind(this));
        ipcRenderer.on(CONFIG_IPC.APP_UPDATE.DOWLOAD_PROGRESS, this.onDownloadProgress.bind(this));
        ipcRenderer.on(CONFIG_IPC.APP_UPDATE.UPDATE_DOWLOADED, this.updateDownloaded.bind(this));
        ipcRenderer.on(CONFIG_IPC.APP_UPDATE.UPDATE_CANCELLED, this.updateCancelled.bind(this));
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(CONFIG_IPC.APP_UPDATE.ERROR, this.onError.bind(this));
        ipcRenderer.removeListener(CONFIG_IPC.APP_UPDATE.UPDATE_AVAILABLE, this.updateAvailable.bind(this));
        ipcRenderer.removeListener(CONFIG_IPC.APP_UPDATE.UPDATE_NOT_AVAILABLE, this.updateNotAvailable.bind(this));
        ipcRenderer.removeListener(CONFIG_IPC.APP_UPDATE.DOWLOAD_PROGRESS, this.onDownloadProgress.bind(this));
        ipcRenderer.removeListener(CONFIG_IPC.APP_UPDATE.UPDATE_DOWLOADED, this.updateDownloaded.bind(this));
        ipcRenderer.removeListener(CONFIG_IPC.APP_UPDATE.UPDATE_CANCELLED, this.updateCancelled.bind(this));
    }

    onError(event, error) {
        console.error('Update error', error)
        toast.error('Update erreur')
    }

    updateAvailable(event, info) {
        console.info('Update available', info)
        toast.info('Update available')
    }

    updateNotAvailable(event, info) {
        console.info('Update not available', info)
        toast.info('Update not available')
    }

    onDownloadProgress(event, info) {
        console.info('Update on download progress', info)
        toast.info('Update download progress')
    }

    updateDownloaded(event, info) {
        console.info('Update downloaded', info)
        toast.info('Update downloaded')
    }

    updateCancelled(event, info) {
        console.info('Update cancelled', info)
        toast.info('Update cancelled')
    }

    render() {
        return (
            <div>
                App update
                <p>
                    Task name:
                    {this.state.task_name}
                </p>
            </div>
        );
    }
}

export default withStyles(styles)(AppUpdate);