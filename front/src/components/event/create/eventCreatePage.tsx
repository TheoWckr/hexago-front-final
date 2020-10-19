import React, {useState} from 'react';
import EventCreateForm from "./eventCreateForm";
import Button from "@material-ui/core/Button";
import {Container, createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {useSnack} from "../../../services/hooks/useSnackBar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(3),
            margin: theme.spacing(2),
        },
    }),
);

const EventCreatePage = () => {
    const classes = useStyles();
    const [isButtonDisabled,setButtonDisabled] = useState(false);
    const eventChangeHandler = (newButtonDisabled: boolean) => {
        console.log(newButtonDisabled , isButtonDisabled)
        setButtonDisabled(newButtonDisabled)
    };

    const {openSnack, snack} = useSnack("Sortie validée ")

    const sendForm = () => {
        console.log("Send")
        openSnack()
    }


    return (
      <Container>
          <Paper className={classes.paper} >
          <Typography align={"center"} variant={'h3'} >Création d'un évènement</Typography>
          <Grid
              container
              direction="column"
              >
          <EventCreateForm setButtonDisabled={eventChangeHandler} />
              {snack()}
          <Button
              onClick={()=> sendForm()}
              disabled={isButtonDisabled}
              variant={"contained"}
              size={"small"}
              color={"primary"}
          >
              Create Event
          </Button>
          </Grid>
            </Paper>
      </Container>
    );
};

export default EventCreatePage;
