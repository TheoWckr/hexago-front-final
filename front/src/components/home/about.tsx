import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import img from '../../assets/home.jpg';
import {Container} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        height: '100%',
        background: `url(${img}) no-repeat`,
        backgroundSize: "cover",
    },
    overlay: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '1.5rem',
    },
    title: {
        color: '#ffffff'
    },
});

export const About = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.overlay}>
                <Container className={classes.content}>
                    <h1 className={classes.title}>&laquo; Un jeu, des rencontres &raquo;</h1>
                    <h2 className={classes.title}>Participez à vos jeux favoris ou laissez vous tenter par la
                        découverte.
                        Jouer
                        où vous le souhaitez, en compagnie de joueurs intéressés.</h2>
                    <button className={'callToActionBtn'}>
                        Je participe <span>&rarr;</span>
                    </button>
                    <button className={'goDownBtn'}>
                        <span>&darr;</span>
                    </button>
                </Container>
            </div>
        </div>
    )
};
