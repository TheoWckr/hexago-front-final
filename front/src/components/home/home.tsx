import React from "react";
import {Typography, Grid, Button, Container} from "@material-ui/core";
import {About} from "./about";
import {makeStyles} from "@material-ui/core/styles";
import {EventCity} from "./eventCity";
import './home.css';

const useStyles = makeStyles({
    text: {
        textAlign: 'center',
        fontSize: '1.5rem',
        padding: '3rem 0'
    },
});

export const Home = () => {
    const classes = useStyles();

    return (
        <div className={'remainHeight'}>
            <About/>
            <EventCity/>
            <Container>
                <Typography className={classes.text}>
                    Hexago est un site de mise en relation de joueurs amateurs et passionnés. Choississez un jeu, une
                    ville
                    et une date, et laissez vous guider par l'applications. Les évènements peuvent se reproduire dans
                    des
                    lieux publics (dans un bar) ou privés (chez un particulier). Le service est exclusivement accessible
                    aux
                    personnes majeures.
                </Typography>
            </Container>
        </div>
    )
};
