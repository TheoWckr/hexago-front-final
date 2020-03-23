// @ts-ignore

let axios = require('axios');
export const UserService = {


    getUser() {
        return axios.get('http://localhost:3100/users/',
        )
            .then(function (response: any) {
                console.log('Ca a marché', response);
            })
            .catch(function (error: any) {
                console.log('CA A BUG', error);
            })
            .then(function () {
                console.log('APRÈS LE DÉLUGE ');
            });
    }
};
