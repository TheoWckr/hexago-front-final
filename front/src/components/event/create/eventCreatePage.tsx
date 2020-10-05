import React, {useEffect, useState} from 'react';
import EventCreateForm from "./eventCreateForm";
import Button from "@material-ui/core/Button";
import {Container, createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {EventModel} from "../../../models/eventModel";
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
    const [event, setEvent] = useState(new EventModel());
    const {openSnack, snack} = useSnack("Bonjour")

    useEffect(() => {
        if(event.date && event.details.trim().length > 0
            && event.phoneNumber.trim().length > 8 && event.localization.trim().length > 0 )
            setButtonDisabled(false)
        else             setButtonDisabled(true)

    }, [event]);

    return (
      <Container>
          <Paper className={classes.paper} >
          <Typography align={"center"} variant={'h3'}>Création d'un évènement</Typography>
          <Grid
              container
              direction="column"
              >
          <EventCreateForm event={event} />
              {snack()}
          <Button
              onClick={()=> openSnack()}
              disabled={false}
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
