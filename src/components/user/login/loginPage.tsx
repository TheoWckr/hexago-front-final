import React from 'react';
import {LoginForm} from "./loginForm";
import './login.css';
import {Grid} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leftContain: {
            display: 'flex',
            userSelect: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            backgroundColor: '#312783',
            backgroundImage: "url('login_image.jpg')",
            backgroundSize: 'cover'
        },
        fullHeight: {
            height: 'calc(100vh - 64px)'
        },
        [theme.breakpoints.down('xs')]: {
            fullHeight: {
                height: 'calc(100vh - 56px)'
            }
        }
    }),
);

export const LoginPage = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.fullHeight}>
            <Hidden only={['xs', 'sm']}>
                <Grid item md={4} lg={4} className={classes.leftContain}>
                    CONNEXION
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <LoginForm/>
            </Grid>
        </Grid>
    )
};
