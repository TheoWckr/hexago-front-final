export interface createEventForm{
    date : Date;
    duration :number;
    minPlayers: number;
    maxPlayers: number;
    listGames?: string[];
    locationId : string;
    phone: string;
    details: string;
    listPlayers : string[]
}


export interface getEvent{
    _id: string;
}

export interface searchEvent {
    date?: Date;
    locationId?: String;
    listGames?: String[];
    showEventFull?: boolean;
    limit: number;
    offset: number;
}

