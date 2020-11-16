import React from "react";
import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "grid",
        placeItems: "center",
        background: 'url("dice.jpg") no-repeat',
        backgroundSize: 'cover',
        padding: '1.5rem'
    },
    title: {
        color: '#ffffff'
    },
    box: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '1.5rem',
    },
});

export const About = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>À Propos</h1>
            <Container className={classes.box}>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec lacus diam. Nullam est nibh,
                    porttitor ac cursus ut, gravida in ante. Integer laoreet consectetur est, sit amet convallis ante
                    suscipit eu. Nunc nunc mi, sodales non cursus eu, sodales hendrerit lacus. Integer vel nisl
                    efficitur, sollicitudin odio sit amet, facilisis metus. Maecenas vulputate pellentesque blandit.
                    Etiam enim nulla, vestibulum vel nisl sit amet, iaculis dictum mi. Praesent sapien diam, tempus a
                    sagittis in, convallis non tellus. Nam lobortis tristique risus, a pretium odio tincidunt commodo.
                    Nunc finibus dui sodales massa pharetra, vitae faucibus lorem aliquet. Nam pretium laoreet erat.
                    Pellentesque eget libero ut neque ultricies eleifend vel ac nisi. In id turpis vulputate, viverra
                    diam id, finibus elit. Curabitur dolor dui, luctus vel efficitur vitae, rutrum quis diam. Integer
                    vestibulum sem eget augue condimentum, ac iaculis erat blandit. Nullam eleifend, nulla rutrum
                    pellentesque porttitor, sapien tortor fringilla augue, vel suscipit ante neque posuere tellus.
                </Typography>
            </Container>
        </div>
    )
};
