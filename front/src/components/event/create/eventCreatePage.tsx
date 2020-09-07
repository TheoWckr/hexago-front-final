import React, {useEffect, useState} from 'react';
import EventCreateForm from "./eventCreateForm";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
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
      <div >
          Event create page

          <Grid
              container
              sm={6}
              direction="column"
              justify="center"
              alignItems="center"

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
          <Grid
              sm={3} />
      </div>
    );
};

export default EventCreatePage;
