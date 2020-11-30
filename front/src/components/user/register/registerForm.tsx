import React, {useState, useEffect} from 'react';
import './register.css';
import {Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {KeyboardDatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

import {UserService} from "../../../services/userService";
import {useSnack} from "../../../services/hooks/useSnackBar";
import {useHistory} from "react-router";

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
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birth, setBirth] = useState(new Date().toString());
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState(''); 
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
	const {snack,openSnack} = useSnack()
	const history = useHistory();


	const [error, setError] = useState({
    	firstname: false,
    	lastname: false,
    	username: false,
    	email: false,
    	phone: false,
    	pwd: false,
    	pwdconfirm: false
    });

    useEffect(() => {
        if (firstname.trim() && lastname.trim() && email.trim() && phoneNumber.trim() && birth.trim() && username.trim() && password.trim() && passwordConfirm.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [firstname, lastname, email, phoneNumber, birth, username, password, passwordConfirm, error]);

    const handleRegister = () => {
    	if (password != passwordConfirm) {
    		return;
		}
    	const user = {
    		"username": username,
    		"firstname": firstname,
    		"lastname": lastname,
    		"password": password,
    		"email": email,
    		"phone": phoneNumber,
    		"dateOfBirth": birth
    	}
    	console.log("user : ", user);
        UserService.createUser(user).then(
			() => {
				openSnack("Register validated, an email will be send to you")
				history.push("/");
			}
		).catch(()=>
			openSnack("Error in entered datas")
		);
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

    const checkPasswords = (pwdconfirm: string) => {
    	console.log("pwdconfirm : ", error.pwdconfirm);
    	let newError = error;
    	if (pwdconfirm != password) {
    		newError.pwdconfirm = true;
    		newError.pwd = true
    	}
    	else {
    		newError.pwdconfirm = false;
    		newError.pwd = false;
    		setPasswordConfirm(pwdconfirm);
    	}
    	setError({...newError});
    };

    return (
        <div className={classes.registerContainer}>
			{snack()}
            <span className="userLogo"></span>
            <div style={{width: '76%'}}>
                <form noValidate autoComplete="off">
                	<Grid container>
                		<Grid container item sm={12} md={6}>
		                    <TextField
		                        error={error.firstname}
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
			            <Grid container item sm={12} md={6}>
		                    <TextField
		                        error={error.lastname}
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
		                <Grid container item sm={12}>
		                    <TextField
		                        error={error.username}
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
		                <Grid container item sm={12}>
		                    <TextField
		                        error={error.email}
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
		                <Grid container item sm={12} md={6}>
		                    <TextField
		                        error={error.phone}
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
		                <Grid container item sm={12} md={6}>
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
		                <Grid container item sm={12} md={6}>
		                    <TextField
		                        error={error.pwd}
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
		                <Grid container item sm={12} md={6}>
		                    <TextField
		                        error={error.pwdconfirm}
		                        id="pwd-confirm"
		                        className={classes.formInputs}
		                        type="password"
		                        label="Confirmation du mot de passe"
		                        placeholder="Confirmation du mot de passe"
		                        margin="normal"
		                        helperText={helperText}
		                        onChange={(e) => checkPasswords(e.target.value)}
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
