import React, {useContext, useState} from 'react';
import {Toolbar,} from "@material-ui/core";
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
import {SnackContext} from "../../../services/hooks/useSnackBar";

const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {isLogged, disconnect} = useContext(AuthContext);
    const {openSnack} = useContext(SnackContext)
    const history = useHistory();
    const [isAnimate, setAnimate] = useState(false);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // Action associée au bouton de logout
    const logout = () => {
        //Logique application
        disconnect();
        //Logique de rendu
        setAnchorEl(null);
        openSnack("Vous êtes désormais déconnecté")
        history.push("/");
    };
    const triggerGif = () => {
        if (!isAnimate) {
            setAnimate(true)
            setTimeout(() => {
                setAnimate(false)
            }, 3700);
        }
    }
    return (
        <AppBar className={classes.background} position="static" elevation={0}>
            <Toolbar onMouseEnter={triggerGif}>

                <img src={isAnimate ? "/dice-anim.gif" : "/dice-static.png"} style={{height: "50px", cursor: "pointer"}}
                     onClick={() => history.push("/")}/>
                <Typography variant="h6" className={[classes.title, "App-title"].join(' ')}>
                    <span className="App-title" style={{cursor: "pointer"}}
                          onClick={() => history.push("/")}>HexaGo</span>
                </Typography>
                {!isLogged && (
                    [
                        <MenuItem key={0} onClick={handleClose} component={Link} to={'/login'}>Connection</MenuItem>,
                        <MenuItem key={1} onClick={handleClose} component={Link}
                                  to={'/register'}>Inscription</MenuItem>,
                    ]
                )}
                {isLogged && (
                    <React.Fragment>
                        <MenuItem onClick={handleClose} style={{border: 'indigo'}} component={Link}
                                  to={'/event/create'}>Création de partie</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to={'/event/search'}>Recherche
                            d'évenements </MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to={'/GameSearch/'}>Liste des jeux</MenuItem>

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
                                    <MenuItem key={0} onClick={handleClose} component={Link} to={'/GenreManagement/'}>Gestion
                                        des genres</MenuItem>,
                                    <MenuItem key={1} onClick={handleClose} component={Link} to={'/GameCreate/'}>Création
                                        de jeu</MenuItem>,

                                    <MenuItem key={9} onClick={logout}>Déconnexion</MenuItem>
                                ]
                            )}
                        </Menu>
                    </React.Fragment>
                )}

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
