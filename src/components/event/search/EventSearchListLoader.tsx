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
                .catch((reason: any) => {})
                .then((value: { data: { content: any; }; }) => {
                    if (value) {
                        setEvents(value.data.content)
                    }
                })
        })();
    }, [props.search])

    return(<EventCardList events={events} vp_size="large" />)
}
export default EventSearchListLoader;
