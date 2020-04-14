import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios} from "../utils/utilsAxios";
import {GameModel} from "../models/gameModel";

const routeName = MAIN_ADRESS+'gamedetails/';
export const GameService = {

    /** Renvois tous les user */
    getAllGames() :AxiosPromise {
        return axios.get(routeName);
    },
    /** formulaire pour créer un jeu */
    createGame(game : GameModel) :AxiosPromise {
        game._id = undefined;
        return axios.post(routeName + '/create', game);
    },

    getGame(id : string) :AxiosPromise {
        return axios.get(routeName+'/'+id);
    },

    getGamesPage(page: number) {
        return axios.get(routeName+'?limit=12&offset='+ page +'&whatToSortBy=popularity&sortValue=-1');
    },

    deleteGame(id: string) : AxiosPromise {
        return axios.delete(routeName+id);
    },
    updateGame(gameToEdit :GameModel) : AxiosPromise{
        const gameID = gameToEdit._id;
        gameToEdit._id = undefined;
        return axios.put(routeName+gameID, gameToEdit);
    }
};

export default GameService;
