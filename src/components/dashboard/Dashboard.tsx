import React, {useContext} from "react";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Container, Box} from "@material-ui/core";
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import DashboardTopBar from './DashboardTopBar';
import DashboardListEvent from './DashboardListEvent';
import DashboardExpandableEventList from './DashboardExpandableEventList';
import DashboardFavoriteAndPastEvents from './DashboardFavoriteAndPastEvents';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            color: "#312783",
            fontFamiliy: "Roboto",
        },
        dashboardtitle: {
            paddingLeft: "10px",
        },
        eventContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        favEventList: {
            height: "5.5em",
            minHeight: "5.5em",
            mawHeight: "5.5em",
            overflow: "hidden",
            transitions: "height 250ms, max-height 250ms",
        },
        favEventListExpanded: {

        },
        favEventListElem: {
            margin: "0.5em",
        },
        seeMoreContainer: {
            textAlign: "center",
        },
        seemore: {
            margin: "0",
            marginTop: "0.5em",
            color: "white",
            fontSize: "14px",
            '&:hover': {
                textDecoration: "underline",
                cursor: "pointer",
            },
        },
        favAndPastEventsContainer: {
            paddingTop: "23px !important"
        }
    })
)

export const Dashboard = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <h1 className={classes.dashboardtitle}>Mon tableau de bord:</h1>
            <DashboardTopBar/>
            <h1 className={classes.dashboardtitle}>Mes prochains évènements:</h1>
            <Grid container spacing={2} className={classes.eventContainer}>
                <Grid item xs={12} md={3} className={classes.favAndPastEventsContainer}>
                    <DashboardFavoriteAndPastEvents/>
                </Grid>
                <Grid item xs={12} md={9}>
                    <DashboardListEvent/>
                </Grid>
            </Grid>
        </Container>
    )
};
