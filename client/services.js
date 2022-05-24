import { fetchME } from './fetchme.js';
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

function sendLogInInf (e) {
    e.preventDefault();
    let logInData = new FormData(e.currentTarget);
    console.log('>>> Form Data Log In (at: client/services.js):', logInData)
    fetchME.sendLogInData(logInData);
};



export const useService = {
    sendRegisterInf,
    sendLogInInf,
}