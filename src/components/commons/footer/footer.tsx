import React from "react";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import background from '../../../assets/tabletop_dashboard.jpg'
import {Grid, Link, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            width:"100%",
            height:"200px",
            marginTop:"3em"

        },
        root: {
            flexGrow: 1,
            borderTop:'0.5rem solid  #cabbdc',
            background: ' #cabbdc',

        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        container: {
            fontFamiliy: "Roboto",
            backgroundColor: "rgba(255,255,255,0.9)"

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

export const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container  >
                <Grid item xs={6}>
                    <Paper style={{height:"100%", padding:"2.5em",background: '#cabbdc',}}>
                    <Typography variant={"h6"} align={"center"}> Lien Utiles  </Typography>
                        <Link target={"/bonjour"}> FAQ </Link>
                    </Paper>
                </Grid>
            <Grid item xs={6} >
                <Paper style={{height:"100%", padding:"2.5em",  background: '#cabbdc',}}>
                <Typography variant={"h6"} align={"center"}> A propos  </Typography>
                <Typography align={"center"}> Hexago est un projet mené par 6 étudiants d'EPITECH dans le cadre de leurs études en MSC </Typography>
                </Paper>

            </Grid>
            </Grid>
        </div>
    )
};
