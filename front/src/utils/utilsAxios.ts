import Axios, {AxiosResponse} from "axios";

export let axios = require('axios') ;
export const MAIN_ADRESS = "http://localhost:3100/"
export const UtilsAxios = {


console (response: AxiosResponse) {

        console.log('axios', axios)
        console.log('Data ' ,response.data);
        console.log('Statuts', response.status);
        console.log('Statuts Text', response.statusText);
        console.log('Headeres', response.headers);
        console.log('Config', response.config);
    }
};
