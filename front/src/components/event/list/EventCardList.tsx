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
            padding: '1em 3em'
        },
        text: {
            fontWeight: 'normal',
        }
    }),
);
const EventCardList = (props: { events: EventCardModel[] }) => {
    const classes = useStyles();

    if (props.events.length == 0) {
        return (<div className={classes.root}>
            <Paper elevation={3}>
                <p className={classes.text}> Pas de liste à afficher </p>
            </Paper>
        </div>)
    } else
        return (<Grid container spacing={4} className={classes.root}>
            {props.events.map(event => <Grid item xs={4}><EventCard event={event}/></Grid>)}
        </Grid>)
}
export default EventCardList;


