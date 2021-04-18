import {EventCardModel} from "../../../models/eventModel";
import {Box, CardContent, Grid, Paper, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Chip from "@material-ui/core/Chip";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {UtilsDate} from "../../../utils/utilsDate";
import {useHistory} from "react-router";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        event_card: {
            //border: '1px solid grey',
            backgroundColor: "#FFFFFF",
            borderRadius: '10px',
        },
        event_card_action: {
            padding: '1em 2em',
        },
        card_author: {
            alignSelf: "center",
            margin:'1em'
        },
        card_affiche_title: {
            marginTop: '0px',
            marginBottom: '0.5em',
        },
        card_games: {
            borderRadius: '0.3em',
            margin:'0.5em',
            fontSize : "big",
            maxWidth:"40%"
        },
        card_games_grid: {
            display:'flex',
            flexDirection: "row",
            flex:"auto",
            justifyContent:"space-around",
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    })
);
const EventCard = (props:{event : EventCardModel}) => {
    const classes = useStyles();
    const history = useHistory();
    const renderGames = props.event.listGames.map((game : { _id: string, name: string, img? : {url:string }}) =>
        (
                <Chip variant="outlined" avatar={<Avatar src={game.img?.url} />}  clickable={true}  key={game._id}  className={classes.card_games} color="secondary"
                      label={game.name}  onClick={() => history.push('/gamedisplay/' +game._id)} />

        ));
    return (
        <Card elevation={3}  className={classes.event_card} >
            <CardActionArea className={classes.event_card_action} onClickCapture={() => history.push('/event/display/' + props.event._id)}>
            <Typography variant={"h5"} align={"center"}> {UtilsDate.toDisplayWithTime(props.event.date)}</Typography>
            <Typography align={"center"}> {props.event.locationId }</Typography>
            </CardActionArea>


            <Grid container justify="center">
            {renderGames}
            </Grid>
            {props.event.owner &&
            (<Grid container justify="center" className={classes.card_author}>
                <Box component="div" display="inline">Hébergé par {props.event.owner.username}</Box>
            </Grid>)
            }
        </Card>
    );
}

export default EventCard;
