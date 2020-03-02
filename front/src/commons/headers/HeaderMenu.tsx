import React from 'react';
import {Box, Paper} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';



const HeaderMenu = () => {
    const classes = useStyles();
    return (
        <span className={classes.root}>
            <ButtonGroup  variant="contained" color="primary" aria-label="contained primary button group">
                <Button>Create Event</Button>
                <Button> Find Event </Button>

                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button>Sign In</Button>
                    <Button>Sign Up</Button>
                </ButtonGroup>
            </ButtonGroup>
            </span>


    );
}

export default HeaderMenu;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                marginRight: theme.spacing(2),

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
        }
    ),
);
