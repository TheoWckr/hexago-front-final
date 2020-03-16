import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// @ts-ignore
import data from "../../data-mock/gameDetailMockList";
import {GameModel} from "../../models/gameModel";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 12
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const GameDisplay = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div>
            <div>
                <h1>Game Display</h1>
            </div>
            {data.map(((value : GameModel) =>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {value.name}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {(new Intl.DateTimeFormat('fr-FR').format(new Date(value.releaseDate)))}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                nombre de joueurs maximum: {value.playerMax}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {value.author}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Plus de détails</Button>
                        </CardActions>
                    </Card>
            ))}
        </div>
    );
};

export default GameDisplay;
