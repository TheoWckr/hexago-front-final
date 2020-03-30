import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios} from "../utils/utilsAxios";

const routeName = MAIN_ADRESS+'genre/';
export const GenreService = {

    /** Renvois tous les user */
    getAllGenres() :AxiosPromise {
        return axios.get(routeName);
    },

    createGenre(body : any) :AxiosPromise {
        console.log("Create game  Body : " , JSON.stringify((body)) );
        console.log("Create game  JSON : " , JSON.stringify((body)) );
        return axios.post(routeName + 'create', JSON.stringify(body));
    },

    getGenre(id : string) :AxiosPromise {
        return axios.get(routeName+id);
    },

    deleteGenre(id: string) : AxiosPromise {
        return axios.delete(routeName+id);
    },

    searchGenres(inputSearch :string) : AxiosPromise {
        return axios.get(routeName+'search',{
            search : inputSearch
        })
    }
};
