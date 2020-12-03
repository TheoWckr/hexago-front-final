import {EventCardModel} from "../../../models/eventModel";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventCard from "./EventCard";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 60
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30
    }
};

const EventCarrousel = (props: { events: EventCardModel[] }) => {

        return (
            <Carousel

            ssr
            itemClass="image-item"
            responsive={responsive}
            transitionDuration={1000}
        >
            {props.events.map(event => {
                return (
                    <EventCard event={event} key={event._id}/>
                );
            })}
            </Carousel>)

}
export default EventCarrousel