import React from 'react';
import {Toolbar, useTheme,} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import './Header.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Toolbar >
                    <Typography variant="h6" className={[classes.title, "App-title"].join(' ')}>
                        <span className="App-title">HexaGo</span>
                    </Typography>
                        <Link to="/GenreManagement/">  <Button className={classes.menuButton} >Genre Management</Button></Link>
                        <Link to="/GameCreate/">  <Button className={classes.menuButton} >Create Game</Button></Link>
                        <Link to="/GameSearch/">  <Button className={classes.menuButton} > Game List </Button></Link>
                        <Link to="/GameDisplay/">  <Button className={classes.menuButton} > Display Game </Button></Link>
                        <Link to="/login"><Button className={classes.menuButton} >Sign In</Button></Link>
                        <Link to="/register"> <Button className={classes.menuButton} >Sign Up</Button></Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
                color:theme.palette.common.white
            },
            title: {
                flexGrow: 1,
            },
            rootMenu: {
                marginRight: theme.spacing(2),

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
        },
    ),
);



export default Header;
