import {GameModel} from "../models/gameModel";
import {genderMockList} from "./GenderMock";

let gameData = new GameModel(
    "Philippe des Pallières et Hervé Marly",
    30,
    7.8    ,
    8,
    "Le loup garou de thiercelieu",
    12,
    4,
    "Lui-Même",
    "",
    "2012-03-19T07:22Z",
    "<div> <p> Les Loups-Garous de Thiercelieux est un jeu de société d'ambiance dans lequel chaque joueur incarne un villageois ou un loup-garou, et dont le but général est : 	</p> <ul><li>Pour les villageois (dont certains ont des pouvoirs ou des particularités) : démasquer et tuer tous les loups-garous ; </li><li>Pour les loups-garous : d'éliminer tous les villageois et ne pas se faire démasquer ;</li> </ul></div>",
    12,
    "Lui-Même",
    genderMockList);

export default gameData;
