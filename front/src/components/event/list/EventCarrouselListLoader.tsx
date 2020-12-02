import React, {useEffect, useState} from "react";

import {EventCardModel} from "../../../models/eventModel";
import EventCardList from "../list/EventCardList";
import {EventService} from "../../../services/eventService";
import {EventSearchProps} from "../search/eventSearchPage";
import EventCarrousel from "./EventCarrousel";

const EventCarrouselListLoader = (props : {search : EventSearchProps}) => {
    const [events, setEvents] = useState<EventCardModel[]>([])
    useEffect(() =>{
        console.log('Update', props.search);

        (async function anyNameFunction() {
            await EventService.searchEvent(props.search)
                .catch((reason: any) => console.log("Error", reason))
                .then((value: { data: { content: any; }; }) => {
                    if (value) {
                        setEvents(value.data.content)
                    }
                })
        })();
    }, [props.search])

    return(<EventCarrousel events={events} />)
}
export default EventCarrouselListLoader;