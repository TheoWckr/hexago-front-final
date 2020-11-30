import {eventModel} from "../models/eventModel";
import gameData from "./gameData";
import {GameModel} from "../models/gameModel";

let list = new Array<GameModel>();

list.push(gameData);

// @ts-ignore
let eventData = new eventModel({
    date: new Date().toDateString(),
    duration: 120,
    owner: 'me',
    details: 'blah blah',
    nbPlayers: 5,
    maxPlayers: 10,
    locationId: 'Nancy',
    listGames: list,
});

export default eventData;
