import React, { Component } from 'react';
import { withStyles, Grid, Paper, Typography } from "@material-ui/core";
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import i18next from 'i18next';
import { formatBytes } from '../../services/math_helper';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 25,
        maxWidth: '100%',
        height: '75vh',
        display: 'flex',
        alignItems: 'center'
    },
    mainPaper: {
        marginTop: 82,  //= navigation du bas masquée
        padding: `${theme.spacing(8)}px ${theme.spacing(24)}px ${theme.spacing(8)}px ${theme.spacing(24)}px`
    },
    progressWithLabel: {
        height: '70px !important',
        width: '70px !important',
    },
    progressLabel: {
        color: theme.palette.secondary.main
    },
    progressGrid: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center'
    },
    bytesProgressGrid: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 8,
    },
    bytesProgressText: {
        fontWeight: 'bold'
    }
});

class LaunchInfo extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container className={classes.root} justify="center">
                    <Paper elevation={10} className={classes.mainPaper}>
                        {this.renderTask()}
                    </Paper>
                </Grid>
            </div>
        )
    }

    renderTask() {
        const { task } = this.props;

        let task_name = null;
        if (task.task_name == 'download' && (task.progress === undefined || task.progress.percent <= 0)) {
            task_name = i18next.t(`task.${task.task_name}_prepare`)
        } else {
            task_name = i18next.t(`task.${task.task_name}`);
        }

        if (task == null) {
            return <p>Aucune tâche en cours</p>
        } else {
            if (task.active) {
                return (
                    <div>
                        <h3>{task_name}</h3>
                        {task.progress && task.progress.percent > 0 && this.renderProgress()}
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3>Chargement</h3>
                    </div>
                )
            }
        }
    }

    renderProgress() {
        const { task, classes } = this.props;

        return (
            <Grid container>
                <Grid item xs={12} className={classes.progressGrid}>
                    <CircularProgressWithLabel label_class={classes.progressLabel} value={task.progress.percent} className={classes.progressWithLabel} />
                </Grid>
                <Grid item xs={12} className={classes.bytesProgressGrid}>
                    <Typography color={'primary'} className={classes.bytesProgressText}>
                        {formatBytes(task.progress.downloadedBytes, 0)}
                        {' / '}
                        {formatBytes(task.progress.totalLength)}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

}

export default withStyles(styles)(LaunchInfo);