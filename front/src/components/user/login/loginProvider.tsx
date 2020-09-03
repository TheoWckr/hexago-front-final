import React from 'react';
import './login.css';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginBtn: {
            borderWidth: 2,
            borderStyle: 'solid',
            width: 300,
            borderRadius: 50,
            '&:hover': {},
        },
        providerContainer: {
            marginTop: 50
        },
        providerItem: {
            display: 'flex',
            justifyContent: 'center'
        },
        providerBtn: {
            width: 200,
            margin: 2
        }
    }),
);

export const LoginProvider = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.providerContainer}>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.providerItem}>
                <img alt="facebook" src="facebook.png" className={classes.providerBtn}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.providerItem}>
                <img alt="google" src="google.png" className={classes.providerBtn}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.providerItem}>
                <img alt="apple" src="apple.png" className={classes.providerBtn}/>
            </Grid>
        </Grid>
    )
};
