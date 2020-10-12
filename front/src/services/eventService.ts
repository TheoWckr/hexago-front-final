import {axios, MAIN_ADRESS} from "../utils/utilsAxios";
import {GameModel} from "../models/gameModel";
import {AxiosPromise} from "axios";
import {createEventForm, searchEvent} from "../models/service/eventServiceType";


const routeName = MAIN_ADRESS+'event/';

export const EventService = {

    //
    createEvent(event : createEventForm) :AxiosPromise {
        return axios.post(routeName, event);
    },
    //http://localhost:3100?/event/searchid/_id
    getEvent(id : string) :AxiosPromise {
        return axios.get(routeName+'/searchid/'+id);
    },

    searchEvent(params : searchEvent){
        let args =''
        if(params.date)  args +='?date='


        return axios.get(routeName+'/')

    }
}
