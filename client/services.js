import {fetchME} from './fetchme.js';
import { useValidator } from './validations.js';

function sendRegisterInf(e){

    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    const validator = useValidator.register(formData);

    if (!validator.value) {
        alert(validator.message);
    } else {
        fetchME.sendRegisterData(validator.bodyInfo);
    };
 
};

function sendLogInInf(e){
    e.preventDefault();
    let logInData = new FormData(e.currentTarget);
    fetchME.sendLogInData(logInData);
};



export const useService = {
    sendRegisterInf,
    sendLogInInf,
}