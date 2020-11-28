import {axios, MAIN_ADRESS} from "../utils/utilsAxios";
import {AxiosPromise} from "axios";
import {createEventForm, searchEvent} from "../models/service/eventServiceType";


const routeName = MAIN_ADRESS+'event/';

export const EventService = {

    createEvent(event : createEventForm) :AxiosPromise {
        const header = {
            headers : {
                token: localStorage.getItem('token')
            }
        };
        return axios.post(routeName+'create', event, header );
    },
    getEvent(id : string) :AxiosPromise {
        const header = {
            headers : {
                token: localStorage.getItem('token')
            }
        };
        return axios.get(routeName+'searchid/'+id, header);
    },

    searchEvent(params : searchEvent){
        let paramsString ='?'
        console.log("params : " ,params)
        if(params.date)  paramsString +=`date=${params.date}&`
        if(params.listGames)  paramsString +=`listGames=${params.listGames.toString().replace('[','').replace(']','')}&`
        if(params.locationId) paramsString +=`locationId=${params.locationId}&`
        if(params.limit) paramsString +=`limit=${params.limit}&`
        else paramsString +=`limit=5&`
        if(params.offset) paramsString +=`offset=${params.offset}&`
        else paramsString +=`offset=0`
        const header = {
            headers: {
                token: localStorage.getItem("token")
            }
        };
        console.log("header :", header);
        return axios.get(routeName+'/searchlist'+paramsString, header);
    }
}
