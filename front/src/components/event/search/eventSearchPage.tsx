import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React, {useState} from "react";
import EventSearchPanel from "./EventSearchPanel";
import EventSearchListLoader from "./EventSearchListLoader";

const useStyles = makeStyles(() =>
    createStyles({
        searchPanel: {
            padding: '1em 2em',
        }
    })
);

export interface EventSearchProps {
    localisation?: string,
    date?: Date,
    listGames: string[]
}

export const eventSearchPropsDefault: EventSearchProps = {
    date: undefined,
    localisation: undefined,
    listGames: []
}

const EventSearchPage = () => {
    const classes = useStyles();
    const [search, setSearch] = useState<EventSearchProps>(eventSearchPropsDefault)

    return (<div>
        <div className={classes.searchPanel}>
            <EventSearchPanel setSearch={setSearch}/>
        </div>
        <EventSearchListLoader search={search}/>
    </div>)
}

export default EventSearchPage;