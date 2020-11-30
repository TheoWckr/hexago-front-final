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
    },

    searchEventByLocation(location : string = "", limit : number = 0 , offset : number = 0 ){
        let paramsString ='?'
        if(location.length > 0)
            paramsString += `locationId=${location}&`
        paramsString += `limit=${limit}&offset=${offset}`
        const header = {
            headers: {
                token: localStorage.getItem("token")
            }
        };
        return axios.get(routeName+'/searchlist'+paramsString, header);
    },

    subscribeEvent(eventId : string){
        const header = {
            headers : {
                token: localStorage.getItem('token')
            }
        };
        return axios.put(routeName+'subscribe/'+eventId,{}, header);
    },
    unSubscribeEvent(eventId : string, userId : string){
        const header = {
            headers : {
                token: localStorage.getItem('token')
            }
        };
        return axios.put(routeName+'unsubscribe/'+eventId, {playerId:userId}, header);
    }
}
