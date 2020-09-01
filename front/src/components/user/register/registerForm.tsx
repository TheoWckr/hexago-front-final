import React, {useState, useEffect} from 'react';
import './register.css';
import { Typography, Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {KeyboardDatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerBtn: {
            marginTop: 25
        },
        registerBtn: {
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
        registerContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        },
        formBox: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        },
        formInputs: {
        	width: '100%',
        	marginLeft: '0.5rem',
        	marginRight: '0.5rem' 
        }
    }),
);

export const RegisterForm = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    var [birth, setBirth] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState(''); 
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (firstName.trim() && lastName.trim() && email.trim() && phoneNumber.trim() && birth.trim() && username.trim() && password.trim() && passwordConfirm.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [firstName, lastName, email, phoneNumber, birth, username, password, passwordConfirm]);

    const handleRegister = () => {
        if (username === 'abc@email.com' && password === 'password') {
            setError(false);
            setHelperText('Register Successfully');
        } else {
            setError(true);
            setHelperText('Incorrect username or password')
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleRegister();
        }
    };

    const handleChangeReleasedDate = (date: MaterialUiPickersDate) => {
    	if (date)
    		setBirth(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
    };

    return (
        <div className={classes.registerContainer}>
            <span className="userLogo"></span>
            <div style={{width: '76%'}}>
                <form noValidate autoComplete="off">
                	<Grid container>
                		<Grid container sm={12} md={6}>
		                    <TextField
		                        error={error}
		                        id="first-name"
		                        className={classes.formInputs}
		                        type="text"
		                        label="Prénom"
		                        placeholder="Prénom"
		                        margin="normal"
		                        onChange={(e) => setFirstName(e.target.value)}
		                        onKeyPress={(e) => handleKeyPress(e)}
		                        variant="outlined"
		                    />
			            </Grid>
			            <Grid container sm={12} md={6}>
		                    <TextField
		                        error={error}
		                        id="last-name"
		                        className={classes.formInputs}
		                        type="text"
		                        label="Nom"
		                        placeholder="Nom"
		                        margin="normal"
		                        helperText={helperText}
		                        onChange={(e) => setLastName(e.target.value)}
		                        onKeyPress={(e) => handleKeyPress(e)}
		                        variant="outlined"
		                    />
		                </Grid>
		                <Grid container sm={12}>
		                    <TextField
		                        error={error}
		                        id="username"
		                        className={classes.formInputs}
		                        type="text"
		                        label="Pseudonyme"
		                        placeholder="Pseudonyme"
		                        margin="normal"
		                        helperText={helperText}
		                        onChange={(e) => setUsername(e.target.value)}
		                        onKeyPress={(e) => handleKeyPress(e)}
		                        variant="outlined"
		                    />
		                </Grid>
		                <Grid container sm={12}>
		                    <TextField
		                        error={error}
		                        id="email"
		                        className={classes.formInputs}
		                        type="email"
		                        label="Adresse email"
		                        placeholder="Adresse email"
		                        margin="normal"
		                        helperText={helperText}
		                        onChange={(e) => setMail(e.target.value)}
		                        onKeyPress={(e) => handleKeyPress(e)}
		                        variant="outlined"
		                    />
		                </Grid>
		                <Grid container sm={12} md={6}>
		                    <TextField
		                        error={error}
		                        id="phone"
		                        className={classes.formInputs}
		                        type="text"
		                        label="Téléphone"
		                        placeholder="Téléphone"
		                        margin="normal"
		                        helperText={helperText}
		                        onChange={(e) => setPhoneNumber(e.target.value)}
		                        onKeyPress={(e) => handleKeyPress(e)}
		                        variant="outlined"
		                    />
		                </Grid>
		                <Grid container sm={12} md={6}>
		                    <KeyboardDatePicker
					            className={classes.formInputs}
					            margin="normal"
					            id="date-picker-dialog"
					            placeholder="Date de naissance (dd/mm/yyyy)"
					            format="MM/dd/yyyy"
					            value={birth}
					            onChange={handleChangeReleasedDate}
		                        onKeyPress={(e) => handleKeyPress(e)}
					            KeyboardButtonProps={{
					                'aria-label': 'change birth date',
					            }}
					        />
		                </Grid>
		                <Grid container sm={12} md={6}>
		                    <TextField
		                        error={error}
		                        id="pwd"
		                        className={classes.formInputs}
		                        type="password"
		                        label="Mot de passe"
		                        placeholder="Mot de passe"
		                        margin="normal"
		                        helperText={helperText}
		                        onChange={(e) => setPassword(e.target.value)}
		                        onKeyPress={(e) => handleKeyPress(e)}
		                        variant="outlined"
		                    />
		                </Grid>
		                <Grid container sm={12} md={6}>
		                    <TextField
		                        error={error}
		                        id="pwd-confirm"
		                        className={classes.formInputs}
		                        type="password"
		                        label="Confirmation du mot de passe"
		                        placeholder="Confirmation du mot de passe"
		                        margin="normal"
		                        helperText={helperText}
		                        onChange={(e) => setPasswordConfirm(e.target.value)}
		                        onKeyPress={(e) => handleKeyPress(e)}
		                        variant="outlined"
		                    />
		                </Grid>
		            </Grid>
                </form>
            </div>
            <div className={classes.containerBtn}>
                <Button
                    className={classes.registerBtn}
                    onClick={() => handleRegister()}
                    disabled={isButtonDisabled}>
                    Register
                </Button>
            </div>
        </div>
    );
};