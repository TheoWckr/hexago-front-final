import React, {useContext} from "react";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Container, Box} from "@material-ui/core";
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import DashboardTopBar from './dashboard/DashboardTopBar';
import DashboardListEvent from './dashboard/DashboardListEvent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            color: "#312783",
            fontFamiliy: "Roboto",
        },
        dashboardtitle: {
            paddingLeft: "10px"
        },
        eventContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        favoriteEvents: {
            borderRadius: "10px",
            padding: "15px",
            backgroundColor: "#312783",
            boxShadow: "0px 5px 15px -5px gray",
            color: "white"
        },
        favEventTitle: {
            marginTop: "0",
        },
        seeMoreContainer: {
            textAlign: "center",
        },
        btntest: {
            backgroundColor: "#221b5c",
            border: "none",
            borderRadius: "3px",
            padding: "1em",
            color: "white"
        },
        seemore: {
            color: "white",
            fontSize: "14px",
            '&:hover': {
                textDecoration: "underline",
                cursor: "pointer",
            },
        }
    })
)

const levels = [
    {
        "name": "Novice",
        "reached": false,
        "points": 0
    },
    {
        "name": "Intermédiaire",
        "reached": false,
        "points": 10
    },
    {
        "name": "Pro",
        "reached": false,
        "points": 30
    },
    {
        "name": "Expert",
        "reached": false,
        "points": 50
    },
    {
        "name": "Légendaire",
        "reached": false,
        "points": 80
    }
]

export const Dashboard = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <h1 className={classes.dashboardtitle}>Mon tableau de bord:</h1>
            <DashboardTopBar/>
            <h1 className={classes.dashboardtitle}>Mes prochains évènements:</h1>
            <Grid container spacing={2} className={classes.eventContainer}>
                <Grid item xs={12} md={3}>
                    <div className={classes.favoriteEvents}>
                        <h3 className={classes.favEventTitle}>Mes évènements favoris: </h3>
                        <p>Bordeau (le 28/11/2020)</p>
                        <p>Marseille (le 28/11/2020)</p>
                        <p>Metz (le 28/11/2020)</p>
                        <p>Bordeau (le 28/11/2020)</p>
                        <p>Marseille (le 28/11/2020)</p>
                        <p>Metz (le 28/11/2020)</p>
                        <p>Bordeau (le 28/11/2020)</p>
                        <p>Marseille (le 28/11/2020)</p>
                        <p>Metz (le 28/11/2020)</p>
                        <div className={classes.seeMoreContainer}>
                            <p className={classes.seemore}>Afficher plus d'évènements</p>
                        </div>
                        <h3>Mes évènements passés: </h3>
                    </div>
                </Grid>
                <Grid item xs={12} md={9}>
                    <DashboardListEvent/>
                </Grid>
            </Grid>
        </Container>
    )
};
