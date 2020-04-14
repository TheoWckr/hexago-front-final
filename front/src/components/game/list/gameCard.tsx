import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {GameModel} from "../../../models/gameModel";
import {useHistory} from "react-router";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 12
    },
    title: {
        fontSize: 25,
        fontWeight: 600
    },
    grid: {
        marginTop: 12
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 300
    }
});

const GameCard = (props: { game: GameModel }) => {
    const classes = useStyles();
    console.log('props game card' ,props.game);
    const history = useHistory();
    return (
        <Card>
            <CardActionArea>
                <CardContent onClick={() => history.push('/gamedisplay/' + props.game._id)} >
                    <CardMedia
                        className={classes.media}
                        image="https://via.placeholder.com/400"
                        title={props.game.name}
                    />
                    <Typography className={classes.title}>
                        {props.game.name}
                    </Typography>
                    <Typography>
                        {props.game.author}
                    </Typography>
                    <Typography>
                        {(new Intl.DateTimeFormat('fr-FR').format(new Date(props.game.releaseDate)))}
                    </Typography>
                    <Rating name="read-only" value={props.game.popularity} readOnly/>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default GameCard;
