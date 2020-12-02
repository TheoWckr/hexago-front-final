import {EventCardModel} from "../../../models/eventModel";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Chip from "@material-ui/core/Chip";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {UtilsDate} from "../../../utils/utilsDate";

const useStyles = makeStyles(() =>
    createStyles({
        event_card: {
            //border: '1px solid grey',
            backgroundColor: "#FFFFFF",
            borderRadius: '10px',
            padding: '1em 1.5em',
            margin:'1em 1.5em'
        },
        card_author: {
            alignSelf: "center",
            marginLeft: '0.5em',
        },
        card_affiche_title: {
            marginTop: '0px',
            marginBottom: '0.5em',
        },
        card_games: {
            borderRadius: '0.3em',
            margin:'0.5em',
            fontSize : "big"
        },
        card_games_grid: {
            display:'flex',
            flexDirection: "row",
            flex:"auto",
            justifyContent:"space-around",
        },
    })
);
const EventCard = (props:{event : EventCardModel}) => {
    const classes = useStyles();
    const renderGames = props.event.listGames.map((game : { _id: string, name: string }) =>
        (
                <Chip variant="outlined"   key={game._id}   className={classes.card_games} color="secondary"
                      label={game.name}/>
        ));
    return (
        <Paper  elevation={3}  className={classes.event_card} >
            <Typography variant={"h5"} align={"center"}> {UtilsDate.toDisplayWithTime(props.event.date)}</Typography>
            <Typography align={"center"}> {props.event.locationId }</Typography>
            <Grid container justify="center">
            {renderGames}
            </Grid>
            <Grid container justify="center">
                <Box component="div" display="inline">Hébergé par {props.event.owner.username} <Avatar src="/broken-image.jpg" /></Box>
            </Grid>

        </Paper>
    );
}

export default EventCard;