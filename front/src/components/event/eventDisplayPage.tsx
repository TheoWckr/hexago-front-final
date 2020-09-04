import React from "react";
import {useParams} from "react-router";


const EventDisplayPage = () => {

    let { id } = useParams();



    return (
        <div>
        Event display Page
        </div>
    )
};

export default EventDisplayPage;