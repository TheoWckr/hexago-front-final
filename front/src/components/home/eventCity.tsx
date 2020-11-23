import React from "react";
import {Container, Grid, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#951B81'
    },
});

export const EventCity = () => {
    const classes = useStyles();

    return (
        <AppBar position={'static'} className={classes.root}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <h3>
                            INDIQUEZ VOTRE VILLE
                        </h3>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>

                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
};
