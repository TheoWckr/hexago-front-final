import React, {useContext} from 'react';
import {LoginForm} from "./loginForm";
import './login.css';
import {Grid} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import {AuthContext, useAuth} from "../../../services/hooks/useAuth";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leftContain: {
            display: 'flex',
            userSelect: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            backgroundColor: '#312783'
        },
        fullHeight: {
            height: 'calc(100vh - 64px)'
        }
    }),
);

export const LoginPage = () => {
    const classes = useStyles();
    const {isLogged} = useContext(AuthContext);

    return (
        <Grid container className={classes.fullHeight}>
            <Hidden only={['xs', 'sm']}>
                <Grid item md={4} lg={4} className={classes.leftContain}>
                    {isLogged && 'CONNEXION'}
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <LoginForm/>
            </Grid>
        </Grid>
    )
};
