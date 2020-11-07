import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios} from "../utils/utilsAxios";
import {GenreModel} from "../models/genreModel";

const routeName = MAIN_ADRESS+'genre/';
export const GenreService = {

    /** AxiosPromise :  Return a list of 0 - {limit} genres containing the string {genre}
     * If genre is empty , return all possible */
    getGenres(genre: string, limit: number) :AxiosPromise {
        let paramsString = '?';
        if(genre && genre.length != 0)
            paramsString += 'genre=' + genre+ '&';
        if(limit && limit > 1)
            paramsString += 'limit=' + limit;
        else paramsString += 'limit=9999';
        return axios.get(routeName + paramsString);
    },

    createGenre(body : GenreModel) :AxiosPromise {
        console.log("Create game  Body : " , JSON.stringify((body)) );
        console.log("Create game  JSON : " , JSON.stringify((body)) );
        return axios.post(routeName + 'create',{genre : body.genre});
    },

    updateGenre(genre: GenreModel)  :AxiosPromise {
        console.log( {genre : genre.genre} );

        return axios.put(routeName + genre._id, {genre : genre.genre});
    },

    getGenre(id : string) :AxiosPromise {
        return axios.get(routeName+id);
    },

    deleteGenre(id: string) : AxiosPromise {
        return axios.delete(routeName+id);
    }
};
