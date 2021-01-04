import {EventSearchProps} from "../search/eventSearchPage";
import React from "react";
import {EventCardModel, EventModel} from "../../../models/eventModel";
import EventCard from "./EventCard";
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: '1em 3em',
            align: 'center'
        },
        text: {
            fontWeight: 'normal',
        },
        paper: {
            alignItem:'center',
            margin:"auto",
            padding: '1em 2em'
        }
    }),
);
const EventCardList = (props: { events: EventCardModel[] }) => {
    const classes = useStyles();
        return (<Grid container spacing={4} className={classes.root}>
            {props.events.map(event => <Grid item xs={4} key={event._id}><EventCard event={event}/></Grid>)}
            {props.events.length == 0 && (<Paper elevation={3} className={classes.paper}>
                <p className={classes.text}> Pas d'évenements en cours </p>
            </Paper>)}
        </Grid>)
}
export default EventCardList;


