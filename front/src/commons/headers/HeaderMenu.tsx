import React from 'react';
import {Box, Paper} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';



const HeaderMenu = () => {
    const classes = useStyles();
    return (
        <span className={classes.root}>
            <ButtonGroup  variant="contained" color="primary" aria-label="contained primary button group">
                <Link to="/gamecreate"><Button>Create Event</Button> </Link>
                <Link to="/gamelist"> <Button> Find Event </Button> </Link>
                <Link to="/gamedisplay"> <Button> Show Event </Button></Link>

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
