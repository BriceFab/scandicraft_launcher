import React, { Component } from 'react';
import { withStyles, Grid, Paper, Typography, CircularProgress } from "@material-ui/core";
import { ipcRenderer } from 'electron';
import CONFIG_IPC from '../../config/ipc.json';
import background from '../../public/assets/images/login_background.png';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';

const styles = theme => ({
    image: {
        height: '100vh',    //full height
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start'
    },
    paper: {
        padding: theme.spacing(10, 22),
        alignItems: 'center',
        alignSelf: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    progress: {
        marginTop: 20,
    },
    progressGrid: {
        display: 'flex',
        justifyContent: 'center'
    },
    progressWithLabel: {
        height: '70px !important',
        width: '70px !important',
    }
});

class AppUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: 'Recherche en cours..',
            isDownloading: false,
            downloadInfo: null
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
        this.setState({
            isDownloading: false,
            info: 'Update erreur.. Relancez le launcher !'
        })
        console.error('Update error', error)
    }

    updateAvailable(event, info) {
        console.info('Update available', info)
        this.setState({
            isDownloading: false,
            info: 'Mise à jour trouvée.'
        })
    }

    updateNotAvailable(event, info) {
        console.info('Update not available', info)
        this.setState({
            isDownloading: false,
            info: 'Aucune mise à jour.'
        })
    }

    onDownloadProgress(event, info) {
        console.info('Update on download progress', info)
        this.setState({
            isDownloading: true,
            info: 'Téléchargement en cours..',
            downloadInfo: info.info
        })
    }

    updateDownloaded(event, info) {
        console.info('Update downloaded', info)
        this.setState({
            isDownloading: false,
            info: 'L\'installation va se lancer.'
        })
    }

    updateCancelled(event, info) {
        console.info('Update cancelled', info)
        this.setState({
            isDownloading: false,
            info: 'Mise à jour annulée.'
        })
    }

    render() {
        const { classes } = this.props;
        const { info, isDownloading, downloadInfo } = this.state;

        let loadingComponent = <CircularProgress color="primary" className={classes.progress} />;
        if (isDownloading) {
            loadingComponent = <CircularProgressWithLabel value={downloadInfo !== null ? downloadInfo.percent : 100} className={classes.progressWithLabel} />
        }

        return (
            <Grid container component="main" className={classes.image}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h1" component="h1" color={'primary'} className={classes.title}>
                        Mise à jour
                    </Typography>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="body1" component="h2">
                                {info}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={isDownloading ? `${classes.progressGrid} ${classes.progress}` : classes.progressGrid}>
                            {loadingComponent}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(styles)(AppUpdate);