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