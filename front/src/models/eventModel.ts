import {GameModel} from "./gameModel";

export class EventModel {
    date = new Date().toString();
    duration = 0;
    localization = "";
    details = "";
    playerMin = 2;
    playerMax = 4;
    phoneNumber ="";
    games = new Array<String>();
    listPlayers= new Array<String>();
    owner = "";
}

export interface EventCreateForm{
    date:string,
    duration : number,
    localization:string,
    playerMin:number,
    playerMax: number,
    phoneNumber:string,
    games: string [],
    detail: string,
}

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
                    listGames = new Array<GameModel>(),
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
