import React, {useState, useEffect} from 'react';
import './login.css';
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {LoginProvider} from "./loginProvider";

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
            width: '45%'
        },
        username: {
            marginRight: 10
        },
        password: {
            marginLeft: 10
        }
    }),
);

export const LoginForm = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    const handleLogin = () => {
        if (username === 'abc@email.com' && password === 'password') {
            setError(false);
            setHelperText('Login Successfully');
        } else {
            setError(true);
            setHelperText('Incorrect username or password')
        }
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
                    <TextField
                        error={error}
                        id="username"
                        className={`${classes.formInput} ${classes.username}`}
                        type="email"
                        label="Username"
                        placeholder="Username"
                        margin="normal"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                        variant="outlined"
                    />
                    <TextField
                        error={error}
                        id="password"
                        className={`${classes.formInput} ${classes.password}`}
                        type="password"
                        label="Password"
                        placeholder="Password"
                        margin="normal"
                        helperText={helperText}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                        variant="outlined"
                    />
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
        </div>
    );
};
