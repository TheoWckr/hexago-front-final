import {EventSearchProps} from "../search/eventSearchPage";
import React from "react";
import {EventCardModel, EventModel} from "../../../models/eventModel";
import EventCard from "./EventCard";
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {GridSize} from "@material-ui/core/Grid"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: '1em 2em',
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
const EventCardList = (props: { events: EventCardModel[], vp_size : string }) => {
    const classes = useStyles();
    var xs: GridSize, sm: GridSize, md: GridSize;
    if (props.vp_size == "medium") {
        xs = sm = 12;
        md = 6;
    }
    else {
        xs = 12;
        sm = 6;
        md = 4;
    }
    return (<Grid container spacing={4} className={classes.root}>
        {props.events.map(event => <Grid item xs={xs} sm={sm} md={md} key={event._id}><EventCard event={event}/></Grid>)}
        {props.events.length == 0 && (<Paper elevation={3} className={classes.paper}>
            <p className={classes.text}> Pas d'évenements en cours </p>
        </Paper>)}
    </Grid>)
}
export default EventCardList;


