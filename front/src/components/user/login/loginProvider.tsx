import React from 'react';
import './login.css';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import {Grid} from "@material-ui/core";
import {LoginForm} from "./loginForm";

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
    }),
);

export const LoginProvider = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.providerContainer}>
            <Grid item xs={12} sm={12} md={4} lg={4} className={classes.providerItem}>
                <Button className={classes.loginBtn} startIcon={<DeleteIcon/>}>Sign in with Facebook</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} className={classes.providerItem}>
                <Button className={classes.loginBtn} startIcon={<DeleteIcon/>}>Sign in with Google</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} className={classes.providerItem}>
                <Button className={classes.loginBtn} startIcon={<DeleteIcon/>}>Sign in with Apple</Button>
            </Grid>
        </Grid>
    )
};
