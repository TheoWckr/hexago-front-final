import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";

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

const GameCard = ({props}: any) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea component={Link} to={props.gameDetailsId}>
                <CardMedia
                    className={classes.media}
                    image={props.mainImage}
                    title={props.name}
                />
                <CardContent>
                    <Typography className={classes.title}>
                        {props.name}
                    </Typography>
                    <Typography>
                        {props.author}
                    </Typography>
                    <Typography>
                        {props.gameGenre.map((genre: string) =>
                            genre
                        ).reduce((prev:string, curr:string) => [prev, ', ', curr])}
                    </Typography>
                    <Typography>
                        {(new Intl.DateTimeFormat('fr-FR').format(new Date(props.releaseDate)))}
                    </Typography>
                    <Rating name="read-only" value={props.popularity} readOnly />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default GameCard;
