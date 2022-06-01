import { fetchME } from './fetchme.js';
import { useValidator } from './validations.js';

function sendRegisterInf(e){
    console.log('C:>>> Service sendRegisterInfo acting...')
    console.log('C:>>> Service sendRegisterInfo: Extract FormData...')

    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    console.log('C:>>> Service sendRegisterInfo: Use Validator...')
    const validator = useValidator.register(formData);

    if (!validator.value) {
        alert(validator.message);
    } else {
        console.log('C:>>> Service sendRegisterInfo: Send FormData To Server...')
        fetchME.sendRegisterData(validator.bodyInfo);
    };
 
};

function sendLogInInf (e) {
    console.log('C:>>> Service sendLogInInf acting...')
    console.log('C:>>> Service sendLogInInf: Extract FormData...')

    e.preventDefault();
    let logInData = new FormData(e.currentTarget);

    console.log('C:>>> Service sendLogInInf: Send FormData To Server:', logInData)
    fetchME.sendLogInData(logInData);
   
};



export const useService = {
    sendRegisterInf,
    sendLogInInf,
}