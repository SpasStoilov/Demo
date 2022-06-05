import { fetchME } from './fetchme.js';
import { useValidator } from './validations.js';

function sendRegisterInf(e){
    console.log('C:>>> Service sendRegisterInfo acting...')
    console.log('C:>>> Service sendRegisterInfo: Extract FormData...')

    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    console.log('C:>>> Service sendRegisterInfo: Use Validator...')
    const validator = useValidator.register(formData); // return {value, message, bodyInfo}

    if (!validator.value) {
        alert(validator.message);
    } else {
        console.log('C:>>> Service sendRegisterInfo: Send FormData To Server...')
        fetchME.sendRegisterData(validator.bodyInfo);
    };
 
};

function sendLogInInf (e) {
    console.log('C:>>> Service sendLogInInf acting...');
    console.log('C:>>> Service sendLogInInf: Extract FormData...');

    e.preventDefault();
    let logInData = new FormData(e.currentTarget);

    console.log('C:>>> Service sendLogInInf: Send FormData To Server:', logInData);
    fetchME.sendLogInData(logInData);
   
};

function getUserData (){
    console.log('C:>>> Service getUserData...');
    let result =  fetchME.userDataRegistrations(); // return UserData or epmpy obj
    console.log('C:>>> Service getUserData: RESULT: ', result);
    return result;
}

/// new?
function sumbitNewSettingData (e) {
    console.log('C:>>> Service sumbitNewSettingData acting...')
    console.log('C:>>> Service sumbitNewSettingData: Extract FormData...')
    
    let formSettingsData = new FormData(e.currentTarget);

    console.log('C:>>> Service sumbitNewSettingData: Use Validator...');
    //FrontEnd Validations
    const validator = useValidator.register(formSettingsData); // return {value, message, bodyInfo}


    if (!validator.value) {
        alert(validator.message);
    } else {
        console.log('C:>>> Service sumbitNewSettingData: Send FormData To Server...')
        fetchME.sendSettingsData(validator.bodyInfo)
            .then(resp => resp.json())
            .then(result => {
                console.log('C:>>> Service sumbitNewSettingData: Data Received:', result)
                let ulErrorsHead = document.querySelector('.settingsErrosHead')
                ulErrorsHead.textContent = ''
                ulErrorsHead.style.display = 'none';

                //result: [ {value:'...', msg:'...', param:'...', locations:'...'} , ...] / User
                if (!result.msg) {
                    console.log('C:>>> Service sumbitNewSettingData: New Values Atach to settings Inputs...')
                    document.querySelector('input[name=settingEmail]').value = result.email
                    document.querySelector('input[name=settingName]').value = result.username
                    document.querySelector('input[name=settingPass]').value = result.password
                    document.querySelector('input[name=settingRepPass]').value = result.password
                } else {
                    // [ {value:'...', msg:'...', param:'...', locations:'...'} , ...]
                    console.log('C:>>> Service sumbitNewSettingData: Errors from Server: ', result)
                    ulErrorsHead.style.display = 'block';
                    for (let errObj of result) {
                        let li = document.createElement('li')
                        li.textContent = `${errObj.param}: ${errObj.msg}`
                        ulErrorsHead.appendChild(li)
                    };
                };

            })
            .catch(err => console.log(err));
    };

}


export const useService = {
    sendRegisterInf,
    sendLogInInf,
    getUserData,
    sumbitNewSettingData
}