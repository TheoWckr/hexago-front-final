import React, {useEffect, useState} from 'react';
import EventCreateForm from "./eventCreateForm";
import Button from "@material-ui/core/Button";
import {Container, createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {useSnack} from "../../../services/hooks/useSnackBar";
import {makeStyles} from "@material-ui/core/styles";
import {createEventForm} from "../../../models/service/eventServiceType";
import {EventService} from "../../../services/eventService";
import {useHistory} from "react-router";
import Simple from "./simple";

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
    const history = useHistory();

    const [isButtonDisabled,setButtonDisabled] = useState(false);
    const [createEventForm, setCreateEventForm] = useState<createEventForm>({} as createEventForm);

    useEffect(() => {
        if(createEventForm.date &&createEventForm.details.trim().length > 0
            && createEventForm.phone.trim().length > 8 && createEventForm.locationId.trim().length > 0
            && createEventForm.listGames!.length > 0 )
            setButtonDisabled(false)
        else             setButtonDisabled(true)
    }, [createEventForm]);

    const {openSnack, snack} = useSnack("Sortie validée ")

    const sendForm = () => {
        console.log("Send")
        EventService.createEvent(createEventForm)
            .catch((err) => console.log("Erreur create event" , err) )
            .then((result) => {
                console.log("reussite", result)
                openSnack()
                history.push("/");
            })
    }


    return (
      <Container>
          <Paper className={classes.paper} >
          <Typography align={"center"} variant={'h3'} >Création d'un évènement</Typography>
          <Grid
              container
              direction="column"
              >
          <EventCreateForm setButtonDisabled={setButtonDisabled} setCreateEventForm={setCreateEventForm}/>
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
          <Simple></Simple>
      </Container>
    );
};

export default EventCreatePage;
