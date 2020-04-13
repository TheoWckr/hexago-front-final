import {AxiosResponse} from "axios";

export const axios = require('axios') ;


export const MAIN_ADRESS = "http://localhost:3100/";
let contentType = 'Content-Type';
export const UtilsAxios = {
        /**
         * Permet un display rapide des élements d'une reponse
         * @param response
         */
        displayReponse (response: AxiosResponse) {
                console.log('axios', axios);
                console.log('Data ' ,response.data);
                console.log('Statuts', response.status);
                console.log('Statuts Text', response.statusText);
                console.log('Headeres', response.headers);
                console.log('Config', response.config);
    },
        axiosHeaders : {
               [contentType] : 'application/json'
        }
};
