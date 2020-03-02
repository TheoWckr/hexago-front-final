import React from 'react';
import { Toolbar,} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import './Header.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";



const Header = () => {
   function getTitle():string {
        return 'HexaGo';
    }
    const classes = useStyles();
    const date : Date = new Date();

    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={[classes.title, "App-title"].join(' ')}>
                        <span className="App-title">HexaGo</span>
                    </Typography>
                    <ButtonGroup variant="text"   aria-label="text primary button group">
                        <Button color="inherit">Create Event</Button>
                        <Button color="inherit"> Find Event </Button>
                        <Button color="inherit">Sign In</Button>
                        <Button color="inherit">Sign Up</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
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
        }
    ),
);



export default Header;
