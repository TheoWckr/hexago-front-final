import {eventModel} from "../models/eventModel";
import gameData from "./gameData";

let list = [];

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
