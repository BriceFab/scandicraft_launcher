import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
        minHeight: 300,
        maxHeight: 300,
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

export default function LastNews() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="primary" gutterBottom>
                    Dernière nouvelle
                </Typography>
                <Typography variant="h5" component="h2">
                    {bull} Titre
                </Typography>
                <Typography variant="body1" component="p">
                    Contenu de la news...
                    Contenu de la news...
                    Contenu de la news...
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">En savoir plus</Button>
            </CardActions>
        </Card>
    );
}