import React, {useContext} from 'react';
import {Toolbar, useTheme,} from "@material-ui/core";
import './Header.css';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {Link, useHistory} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DehazeRoundedIcon from '@material-ui/icons/DehazeRounded';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {AuthContext} from "../../../services/hooks/useAuth";

const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {isLogged, disconnect } = useContext(AuthContext);
    const history = useHistory();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAnchorEl(null);
        disconnect();
        history.push("/");
    };

    const push_login = () => {
        setAnchorEl(null);
        history.push("/login");
    }

    const push_register = () => {
        setAnchorEl(null);
        history.push("/register");
    }

    return (
        <AppBar className={classes.background} position="static" elevation={0}>
            <Toolbar>
                <Typography variant="h6" className={[classes.title, "App-title"].join(' ')}>
                    <span className="App-title">HexaGo</span>
                </Typography>
                <IconButton
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <DehazeRoundedIcon/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    {isLogged && (
                        [
                            <MenuItem key={0} onClick={handleClose} component={Link} to={'/GenreManagement/'}>Genre management</MenuItem>,
                            <MenuItem key={1} onClick={handleClose} component={Link} to={'/GameCreate/'}>Create Game</MenuItem>,
                            <MenuItem key={2} onClick={handleClose} component={Link} to={'/GameSearch/'}>Game List</MenuItem>,
                            <MenuItem key={3} onClick={handleClose} component={Link} to={'/GameDisplay/'}>Display game</MenuItem>,
                            <MenuItem key={4} onClick={logout}>Logout</MenuItem>
                        ]
                    )}
                    {!isLogged && (
                        [
                            <MenuItem key={0} onClick={handleClose} component={Link} to={'/login'}>Log In</MenuItem>,
                            <MenuItem key={1} onClick={handleClose} component={Link} to={'/register'}>Register</MenuItem>
                        ]
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                flexGrow: 1,
            },
            menuLink: {
                marginRight: theme.spacing(2),
                color: theme.palette.common.white,
                textDecoration: 'none'
            },
            menuButton: {
                marginRight: theme.spacing(2),
                color: theme.palette.common.white
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
            background: {
                backgroundColor: '#312783'
            }
        },
    ),
);

export default Header;
