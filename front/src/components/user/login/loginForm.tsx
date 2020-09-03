import React, {useState, useEffect} from 'react';
import './login.css';
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {LoginProvider} from "./loginProvider";
import {UserService} from "../../../services/userService";
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core";
import {useHistory} from "react-router";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerBtn: {
            marginTop: 25
        },
        loginBtn: {
            color: '#312783',
            borderWidth: 2,
            borderStyle: 'solid',
            width: 200,
            borderRadius: 50,
            backgroundColor: 'rgba(0,0,0,0)',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,0)',
            },
        },
        loginContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        },
        formContainer: {
            width: '100%'
        },
        formBox: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        },
        formInput: {
            width: '100%'
        },
    }),
);

export const LoginForm = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (email.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, password]);

    const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const handleLogin = async () => {
        setLoad(true);
        await sleep(1000);
        UserService.login({
            email: email,
            password: password
        })
            .then(value => {
                setError(false);
                setLoad(false);
                localStorage.setItem('token', value.data.token);
                history.push("/");
            })
            .catch(reason => {
                setError(true);
                setHelperText('Incorrect username or password');
            });
    };

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
        }
    };

    return (
        <div className="loginContainer">
            <span className="userLogo"></span>
            <div className={classes.formContainer}>
                <form noValidate autoComplete="off" className={classes.formBox}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box pl={2} pr={2}>
                                <TextField
                                    error={error}
                                    id="email"
                                    className={`${classes.formInput}`}
                                    type="email"
                                    label="Email"
                                    placeholder="Email"
                                    margin="normal"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e)}
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box pl={2} pr={2}>
                                <TextField
                                    error={error}
                                    id="password"
                                    className={`${classes.formInput}`}
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    helperText={helperText}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e)}
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <div className={classes.containerBtn}>
                <Button
                    className={classes.loginBtn}
                    onClick={() => handleLogin()}
                    disabled={isButtonDisabled}>
                    Login
                </Button>
            </div>
            <LoginProvider/>
            <Backdrop open={load}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
};
