import React, { Component } from 'react';
import LastNews from './news';
import { Grid, withStyles } from '@material-ui/core';
import LastSurvey from './survey';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 25,
    maxWidth: '100%',
    height: '75vh',
    display: 'flex',
    alignItems: 'center'
  },
});

class HomeInfo extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            <Grid key={'grid-news'} item>
              <LastNews />
            </Grid>
            <Grid key={'grid-survey'} item>
              <LastSurvey />
            </Grid>
            <Grid key={'grid-survey-tmp'} item>
              <LastNews />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

export default withStyles(styles)(HomeInfo);