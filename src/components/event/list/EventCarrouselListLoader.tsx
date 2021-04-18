import React, {useEffect, useState} from "react";

import {EventCardModel} from "../../../models/eventModel";
import EventCardList from "./EventCardList";
import {EventService} from "../../../services/eventService";
import {EventSearchProps} from "../search/eventSearchPage";
import EventCarrousel from "./EventCarrousel";
import {Typography} from "@material-ui/core";

const EventCarrouselListLoader = (props : {search : EventSearchProps}) => {
    const [events, setEvents] = useState<EventCardModel[]>([])
    useEffect(() =>{
            EventService.searchEvent(props.search)
                .catch((reason: any) => {})
                .then((value: { data: { content: any } }) => {
                    if (value && value.data.content != undefined) {
                        console.log('daTATATA ', value.data.content)

                        setEvents(value.data.content)
                    }
                })
        }
    , [props.search])

    return(<div>{
        events.length >0   ?
            (<EventCarrousel events={events} />)
        :
        <Typography style={{padding:'30px', textAlign:'center'}}>Aucun évenement ne correspond a votre recherche </Typography>
}</div>)
}
export default EventCarrouselListLoader;