import {EventSearchProps} from "./eventSearchPage";
import React, {useEffect, useLayoutEffect, useState} from "react";

import {EventCardModel} from "../../../models/eventModel";
import EventCardList from "../list/EventCardList";
import {EventService} from "../../../services/eventService";
import {data} from "../../../data-mock/gameDetailMockList";

const EventSearchListLoader = (props : {search : EventSearchProps}) => {
    const [events, setEvents] = useState<EventCardModel[]>([])

    useLayoutEffect (() =>{
        (async function anyNameFunction() {
            await EventService.searchEvent(props.search)
                .catch((reason: any) => console.log("Error", reason))
                .then((value: { data: { content: any; }; }) => {
                    console.log("Events", data)
                    if (value) {
                        setEvents(value.data.content)
                    }
                })
        })();
        console.log("passage")
    }, [props.search])

    return(<EventCardList events={events} />)
}
export default EventSearchListLoader;
