import React from "react";
import {Typography, Grid, Button} from "@material-ui/core";
import {About} from "./about";
import {makeStyles} from "@material-ui/core/styles";
import {EventCity} from "./eventCity";
import './home.css';

const useStyles = makeStyles({
    root: {
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        fontSize: '1.5rem',
        padding: '1.5rem'
    },
    title: {
        margin: 0,
        padding: 0,
    },
    box: {
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '1.5rem'
    },
    loginBtn: {
        borderWidth: 2,
        borderStyle: 'solid',
        width: 200,
        borderRadius: 50,
    },
    text: {
        margin: '1.5rem'
    },
    primary: {
        color: '#312783'
    },
    secondary: {
        color: '#951B81'
    }
});

export const Home = () => {
    const classes = useStyles();

    return (
        <div className={'remainHeight'}>
            <About/>
            <div className={classes.root}>
                <h2 className={classes.primary}>ARE YOU READY ?</h2>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} className={classes.box + ' ' + classes.primary}>
                        <h3 className={classes.title}>JE COMMENCE !</h3>
                        <Typography className={classes.text}>
                            Faites de nouvelles découvertes !
                        </Typography>
                        <Button className={classes.loginBtn + ' ' + classes.primary}>
                            S'INSCRIRE
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} className={classes.box + ' ' + classes.secondary}>
                        <h3 className={classes.title}>À MOI DE JOUER !</h3>
                        <Typography className={classes.text}>
                            Découvrez de nouveaux évènements !
                        </Typography>
                        <Button className={classes.loginBtn + ' ' + classes.secondary}>
                            SE CONNECTER
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <EventCity/>
        </div>
    )
};
