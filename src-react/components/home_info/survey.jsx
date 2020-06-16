import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 200,
        minHeight: 200,
        maxHeight: 200,
        overflowY: 'scroll'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 12,
    },
});

export default function LastSurvey() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="primary" gutterBottom>
                    Dernier sondage
                </Typography>
                <Typography variant="h5" component="h2">
                    {bull} Titre
                </Typography>
                <Typography variant="body1" component="p">
                    Contenu du sondage...
                    Contenu du sondage...
                    Contenu du sondage...
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">En savoir plus</Button>
            </CardActions>
        </Card>
    );
}