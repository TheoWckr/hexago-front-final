import React, {useContext, useState} from "react";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Container, Box} from "@material-ui/core";
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import DashboardExpandableEventList from './DashboardExpandableEventList';
import {EventService} from "../../services/eventService";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: "#312783",
            color: "white",
            padding: "1em",
            borderRadius: "0.5em"
        },
        eventTypeTitle: {
            margin: "0",
        },
        fav: {
            marginBottom: "1em",
        }
    })
)

export const DashboardFavoriteAndPastEvents = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.fav}>
                <h3 className={classes.eventTypeTitle}>Mes évènements favoris: </h3>
                <DashboardExpandableEventList />
            </div>
            <h3 className={classes.eventTypeTitle}>Mes évènements passés: </h3>
            <DashboardExpandableEventList/>
        </div>
    )
};

export default DashboardFavoriteAndPastEvents;
