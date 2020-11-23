import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios} from "../utils/utilsAxios";
import {GameModel} from "../models/gameModel";

const routeName = MAIN_ADRESS+'gamedetails/';
export const GameService = {

    /** Renvois tous les jeux */
    getAllGames() :AxiosPromise {
        return axios.get(routeName);
    },
    getGamesForQuickSearch(search :string ) :AxiosPromise {
        return axios.get(routeName+'/');
    },

    /** formulaire pour créer un jeu */
    createGame(game : GameModel) :AxiosPromise {
        let gameRequest = new GameModel(game);
        gameRequest._id = undefined;
        return axios.post(routeName + '/create', gameRequest);
    },

    getGame(id : string) :AxiosPromise {
        return axios.get(routeName+'/'+id);
    },

    getGamesPage(page: number, sortBy?: string, sortOrder?: string, popularity?: number,baseGameId? : string ) :AxiosPromise {
        let sortValue = '-1';
        let whatToSortBy = 'popularity';
        if (sortOrder && sortOrder){
            sortValue = sortOrder;
        }
        if(sortBy){
            sortValue = sortBy;
        }
        //Every non essential elements
        let additionalElements = '';
        if(baseGameId){
            additionalElements += '&baseGameId='+baseGameId;
        }

        return axios.get(routeName+'?limit=12&offset='+ page +'&whatToSortBy='+ whatToSortBy +'&sortValue='+sortValue+additionalElements);
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
