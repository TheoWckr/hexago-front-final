import {GameModel} from "./gameModel";

export class eventModel {
    _id?: string;
    date: string;
    duration: number;
    owner: string;
    details: string;
    nbPlayers: number;
    maxPlayers: number;
    locationId: string;
    listGames: GameModel[];
    constructor({
                    _id = '',
                    date = '',
                    duration = 0,
                    owner = '',
                    details = '',
                    nbPlayers = 0,
                    maxPlayers = 0,
                    locationId = '',
                    listGames = [],
                } = {}) {

        this._id = _id.length === 0  ? undefined : _id;
        if (date.length === 0)
            this.date = new Date().toDateString();
        else
            this.date = date;
        this.duration = duration;
        this.owner =  owner;
        this.details = details;
        this.nbPlayers = nbPlayers;
        this.maxPlayers = maxPlayers;
        this.locationId = locationId;
        this.listGames = listGames;
    }
}
