import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios, UtilsAxios} from "../utils/utilsAxios";
import {GameModel} from "../models/gameModel";
import {GameCreateForm} from "../models/form/gameCreateForm";
import GameSearchProps from "../models/game/gameSearch";

const routeName = MAIN_ADRESS+'gamedetails/';
export const GameService = {

    /** Renvois tous les jeux */
    getAllGames() :AxiosPromise {
        return axios.get(routeName);
    },
    getGamesForQuickSearch(search :string ) :AxiosPromise {
        return axios.get(routeName);
    },

    /** formulaire pour créer un jeu */
    createGame(game : GameModel, file?: File) :AxiosPromise {
        let gameRequest = new GameModel(game);
        gameRequest._id = undefined;
        let gameFormData : GameCreateForm = {
            description: "",
            genres: [],
            name: "",
            playerMax: 0,
            playerMin: 0,
            popularity: 0,
            releaseDate: ""
        };
        gameFormData.author = game.author;
        gameFormData.baseGameId = game.baseGameId;
        gameFormData.description = game.description;
        gameFormData.distributor = game.distributor;
        gameFormData.editor = game.editor;
        gameFormData.gameLengthMax = game.gameLengthMax;
        gameFormData.gameLengthMin = game.gameLengthMin;
        gameFormData.image = file;
        gameFormData.minAge = game.minAge;
        gameFormData.playerMax = game.playerMax;
        gameFormData.playerMin = game.playerMin;
        gameFormData.name = game.name;
        gameFormData.releaseDate  = game.releaseDate;
        gameFormData.popularity = game.popularity;
        gameFormData.genres = [];
        game.genres.forEach(value => gameFormData.genres.push(value._id))

        return axios.post(routeName + 'create',  UtilsAxios.convertModelToFormData(gameFormData), {
            headers: {
                'credentials': 'include',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type':'application/x-www-form-urlencoded'
            }
        });
    },

    getGame(id : string) :AxiosPromise {
        return axios.get(routeName+id);
    },

    getGamesPage(page: number, gameSearch?: GameSearchProps, sortBy?: string, baseGameId?: string) :AxiosPromise {
        let sortValue = '-1';
        let whatToSortBy = 'popularity';
        if(sortBy){
            sortValue = sortBy;
        }

        //Every non essential elements
        let additionalElements = '';
        if(gameSearch){
            if(gameSearch.name && gameSearch.name.length > 0)
                additionalElements += `&name=${gameSearch.name}`
            if(gameSearch.genres.length > 0) {
                additionalElements += `&genres=`
                gameSearch.genres.forEach((value,index) =>
                     additionalElements +=  index === gameSearch.genres.length ? `${value},` :`${value}` )
            }
            if(gameSearch.year){
                additionalElements += `&releaseDate=${gameSearch.year}`
            }
        }
        if(baseGameId) {
            additionalElements += '&baseGameId=' + baseGameId;
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
