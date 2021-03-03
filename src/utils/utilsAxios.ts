import {AxiosResponse} from "axios";

export const axios = require('axios') ;


//export const MAIN_ADRESS = "https://hexago-back.herokuapp.com";
export const MAIN_ADRESS = "http://localhost:3100/";
let contentType = 'Content-Type';
export const UtilsAxios = {
        /**
         * Permet un display rapide des élements d'une reponse
         * @param response
         */
        displayReponse (response: AxiosResponse) {
              /*  console.log('axios', axios);
                console.log('Data ' ,response.data);
                console.log('Statuts', response.status);
                console.log('Statuts Text', response.statusText);
                console.log('Headeres', response.headers);
                console.log('Config', response.config); */
    },
    convertModelToFormData(model: any, form: FormData = new FormData(), namespace = ''): FormData {
        let formData = form || new FormData();

        for (let propertyName in model) {
            if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
            let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
            if (model[propertyName] instanceof Date)
                formData.append(formKey, model[propertyName].toISOString());
            else if (model[propertyName] instanceof Array) {
                model[propertyName].forEach((element: string, index: any) => {
                    const tempFormKey = `${formKey}[${index}]`;
                    formData.append(tempFormKey, element);
                });
            }
            else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File))
                this.convertModelToFormData(model[propertyName], formData, formKey);
            else if (model[propertyName] instanceof File)
                formData.append(formKey,model[propertyName])
            else
                formData.append(formKey, model[propertyName].toString());
        }
        return formData;
    },
        axiosHeaders : {
               [contentType] : 'application/json'
        }
};
