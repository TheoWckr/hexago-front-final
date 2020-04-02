import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios} from "../utils/utilsAxios";

const routeName = MAIN_ADRESS+'gamedetails';

const GameService = {

    /** Renvois tous les user */
    getAllGames() :AxiosPromise {
        return axios.get(routeName);
    },
    /** formulaire pour créer un jeu */
    createGame(body : any) :AxiosPromise {
        console.log("Create game  Body : " , JSON.stringify((body)) );

        console.log("Create game  JSON : " , JSON.stringify((body)) );
        return axios.post(routeName + '/create', JSON.stringify(body));
    },

    getGame(id : string) :AxiosPromise {
        return axios.get(routeName+'/'+id);
    },

    getGamesPage(page: number) {
        return axios.get(routeName+'?limit=12&offset='+ page +'&whatToSortBy=popularity&sortValue=-1');
    },

    deleteGame(id: string) : AxiosPromise {
        return axios.delete(routeName+id);
    }
};

export default GameService;
