import React, {useEffect, useState} from 'react';
import EventCreateForm from "./eventCreateForm";
import Button from "@material-ui/core/Button";
import {Container, Grid, Typography} from "@material-ui/core";
import {EventModel} from "../../../models/eventModel";
import {useSnack} from "../../../services/hooks/useSnackBar";

const EventCreatePage = () => {

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
          <Typography variant={'h2'}>Création d'un évènement</Typography>
          <Grid
              container
             // sm={6}
              direction="column"
              justify="center"
              >
          <EventCreateForm event={event} />
              {snack()}
          <Button
              onClick={()=> openSnack()}
              disabled={false}
          >
              Create Event
          </Button>
          </Grid>
      </Container>
    );
};

export default EventCreatePage;
