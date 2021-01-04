import React, {useEffect, useState} from "react";

import {EventCardModel} from "../../../models/eventModel";
import EventCardList from "./EventCardList";
import {EventService} from "../../../services/eventService";
import {EventSearchProps} from "../search/eventSearchPage";
import EventCarrousel from "./EventCarrousel";

const EventCarrouselListLoader = (props : {search : EventSearchProps}) => {
    const [events, setEvents] = useState<EventCardModel[]>([])
    useEffect(() =>{
        (async function anyNameFunction() {
            await EventService.searchEvent(props.search)
                .catch((reason: any) => {})
                .then((value: { data: { content: any; }; }) => {
                    if (value) {
                        setEvents(value.data.content)
                    }
                })
        })();
    }, [props.search])

    return(<div>{events.length >0 && <EventCarrousel events={events} />}</div>)
}
export default EventCarrouselListLoader;