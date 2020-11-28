import React, {useEffect, useState} from "react";
import EventDisplayPage from "./eventDisplayPage";
import {useParams} from "react-router";
import EventDisplayType from "../../../models/event/eventDisplayType";
import {EventService} from "../../../services/eventService";

const EventDisplayPageLoader = () => {
    const {id} = useParams<{ id: string }>();
    const[event,setEvent] =  useState<EventDisplayType | undefined>( undefined);
    /**
     * Handling event display,
     * if problem, closing the page
     */
    useEffect(() => {
            (async function anyNameFunction() {
                await EventService.getEvent(id)
                    .catch(reason => console.log("Error", reason))
                    .then(value => {
                        if (value)
                            setEvent(value.data.content)
                        console.log("getEvent", event)
                    })
            })();
        }
        , [])

    if(event){
    return (<EventDisplayPage event={event} />)
    }
    else return (<div>Erreur 404</div>)
};

export default EventDisplayPageLoader;