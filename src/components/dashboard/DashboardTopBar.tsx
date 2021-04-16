import React, {useContext} from "react";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Container, Box} from "@material-ui/core";
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import DashboardXPBar from './DashboardXPBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        xp: {
            backgroundColor: "#ededed",
            padding: "20px",
            borderRadius: "1em",
            marginBottom: "2em"
        },
        leftSection: {
            display: "flex",
            flexDirection: "row",
            width: "33%"
        },
        xptitle: {
            color: 'grey',
            marginTop: "0px",
            [theme.breakpoints.up("md")]: {
                marginBottom: "1.5em",
            },
        },
        xppicture: {},
        xpwelcome: {
            display: 'flex',
            flexDirection: 'column',
        },
        links: {
            textDecoration: 'none',
            color: "#951B81",
            marginTop: "2px",
            marginBottom: "2px",
        },
        rightSection: {
            textAlign: "center",
            [theme.breakpoints.up('md')]: {
                borderLeft: "3px solid grey",
                paddingLeft: "40px",
                paddingRight: "20px"
            },
            [theme.breakpoints.down('md')]: {
                marginTop: "20px",
            },
        }
    })
)

export const DashboardTopBar = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.xp}>
            <Grid item xs={12} md={4} className={classes.leftSection}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div className={classes.xppicture}>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className={classes.xpwelcome}>
                            <h2 className={classes.xptitle}>Bonjour !</h2>
                            <a className={classes.links} href="#">Modifier votre profil </a>
                            <a className={classes.links} href="#">Verifiez votre mail </a>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8} className={classes.rightSection}>
                <h2 className={classes.xptitle}>Votre Expérience</h2>
                <DashboardXPBar XP={1}/>
            </Grid>
        </Grid>
    )
}

export default DashboardTopBar;
