import {GameModel} from "../models/gameModel";
import gameService from "../services/gameService";
import {AxiosResponse} from "axios";

let detail: GameModel[] = [];

gameService.getGamesPage(1).then((result: AxiosResponse) => {
    result.data.content.forEach((game: {}) => {
        detail.push(new GameModel(game));
    });
});

export default detail;
