import {EventSearchProps} from "./eventSearchPage";
import React, {useEffect, useState} from "react";

import {EventCardModel} from "../../../models/eventModel";
import EventCardList from "../list/EventCardList";
import {EventService} from "../../../services/eventService";

const EventSearchListLoader = (props : {search : EventSearchProps}) => {
    const [events, setEvents] = useState<EventCardModel[]>([])
    useEffect(() =>{
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

    return(<EventCardList events={events} />)
}
export default EventSearchListLoader;
