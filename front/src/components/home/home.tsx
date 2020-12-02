import React from "react";
import {Typography, Paper} from "@material-ui/core";
import {About} from "./about";
import {makeStyles} from "@material-ui/core/styles";
import {EventCity} from "./eventCity";
import './home.css';

const useStyles = makeStyles({
    text: {
        textAlign: 'center',
        fontSize: '1.3rem',
        padding: '1rem 0'
    },
});

export const Home = () => {
    const classes = useStyles();

    return (
        <div className={'remainHeight'}>
            <About/>
            <EventCity/>
            <Paper elevation={3}>
                <Typography className={classes.text}>
                    Hexago est un site de mise en relation de joueurs amateurs et passionnés.
                </Typography>
                <Typography className={classes.text}>Choisissez un jeu, une
                    ville et une date, et laissez vous guider par l'application.
                </Typography>
                <Typography className={classes.text}>Les évènements peuvent se produire dans
                    des lieux publics (dans un bar) ou privés (chez un particulier).
                </Typography>
                <Typography className={classes.text}> Le service est exclusivement accessible
                    aux personnes majeures.
                </Typography>
            </Paper>
        </div>
    )
};
