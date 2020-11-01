import {GameModel} from "./gameModel";

export class eventModel {
    _id?: string;
    date: string;
    duration: string;
    owner: string;
    details: string;
    nbPlayers: number;
    maxPlayers: number;
    localisation: string;
    listGames: GameModel[];
    constructor({
                    _id = '',
                    date = '',
                    duration = '',
                    owner = '',
                    details = '',
                    nbPlayers = 0,
                    maxPlayers = 0,
                    localisation = '',
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
        this.localisation = localisation;
        this.listGames = listGames;
    }
}
