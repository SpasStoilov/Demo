import { fetchME } from './fetchme.js';
import { useValidator } from './validations.js';
import {useTemplate} from "./templates.js";

function sendRegisterInf(e){
    console.log('C:>>> Service sendRegisterInfo acting...')
    console.log('C:>>> Service sendRegisterInfo: Extract FormData...')

    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    console.log('C:>>> Service sendRegisterInfo: Use Validator...')
    const validator = useValidator.register(formData); // return {value, message, bodyInfo}

    let spanError = document.querySelector('.spanErrorRegister');
    spanError.style.display = 'none';
    spanError.textContent = '';
    
    if (!validator.value) {
        console.log('C:>>> Service sendRegisterInfo: Front End Error!')
        spanError.style.display = 'block';
        spanError.textContent = `${validator.message}!`;
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
  
    let formSettingsData = new FormData(e.currentTarget);

    console.log('C:>>> Service sumbitNewSettingData: Extract FormData...:', formSettingsData)
    console.log('C:>>> Service sumbitNewSettingData: Use Validator...');

    let ulErrorsHead = document.querySelector('.settingsErrosHead')
    ulErrorsHead.style.display = 'none';
    ulErrorsHead.textContent = '';

    // setting default borders to input settings:
    for (let field of Object.keys(Object.fromEntries(formSettingsData))){
        document.querySelector(`.settingsInformation > input[name=${field}]`).style.borderColor = '#ECECEC';
    }

    //FrontEnd Validations
    const validator = useValidator.register(formSettingsData); // return {value, message, bodyInfo}
    if (!validator.value) {

        for (let [field, value] of Object.entries(validator.bodyInfo)){
            let inputField = document.querySelector(`.settingsInformation > input[name=${field}]`);
            inputField.style.borderColor = '#ECECEC'
            if (!value) {
                inputField.style.borderColor = 'red';
            }
        }

        console.log('C:>>> Service sumbitNewSettingData: alert(validator.message):')
        let li = document.createElement('li')
        li.textContent = `${validator.message}!`
        ulErrorsHead.appendChild(li)
        ulErrorsHead.style.display = 'block';

    } else {
        
        console.log('C:>>> Service sumbitNewSettingData: Send FormData To Server...: ', validator.bodyInfo)
        fetchME.sendSettingsData(validator.bodyInfo)
            .then(resp => resp.json())
            .then(result => {

                console.log('C:>>> Service sumbitNewSettingData: Data Received:', result)

                //result: [ {value:'...', msg:'...', param:'...', locations:'...'} , ...] / User
                
                if (!result[0]) {
                    console.log('C:>>> Service sumbitNewSettingData: New Values Atach to settings Inputs...')
                    document.querySelector('.settingsInformation input[name=email]').value = result.email;
                    document.querySelector('.settingsInformation input[name=username]').value = result.username;
                    document.querySelector('.settingsInformation input[name=password]').value = result.password;
                    document.querySelector('.settingsInformation input[name=reppassword]').value = '';
                } else {
                    // [ {value:'...', msg:'...', param:'...', locations:'...'} , ...]
                    console.log('C:>>> Service sumbitNewSettingData: Errors from Server: ', result)
                    ulErrorsHead.style.display = 'block';
                    for (let errObj of result) {
                        let li = document.createElement('li')
                        li.textContent = `${errObj.param}: ${errObj.msg}.`
                        ulErrorsHead.appendChild(li)
                    };
                    console.log('C:>>> Service sumbitNewSettingData: ErrorsHead: ', ulErrorsHead)
                };

            })
            .catch(err => console.log(err));
    };

}


function trigerProfileSettingsAndVrTourLogic () {

    console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Adding Events...')

    let profileBody = document.querySelector('.profileBody');
    profileBody.textContent = '';

    let settingBTN = document.querySelector('.profileSettings')
    let vrBTN = document.querySelector('.profileVrTours')

    let profileBar = document.querySelector('.profileBar');

    profileBar.addEventListener('click', onClick);
    profileBody.appendChild(useTemplate.profileSettingsTemp());
    
    function onClick (e) {
        e.preventDefault();
        console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Event is Trigered...')
        profileBody.textContent = '';

        if (e.target.className === 'profileSettings'){
            console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Settings btn is cliked!')
            // some setup:
            e.target.style.backgroundColor = '#48b664';
            vrBTN.style.backgroundColor = '#cacaca';
            
            // render:
            profileBody.appendChild(useTemplate.profileSettingsTemp());

        } else if (e.target.className === 'profileVrTours'){

            console.log('C:>>> trigerProfileSettingsAndVrTourLogic: My Vrs btn is cliked!')
            // some setup:
            e.target.style.backgroundColor = '#48b664';
            settingBTN.style.backgroundColor = '#cacaca';
          
            // render:
            let frag = document.createRange().createContextualFragment(useTemplate.profileVrToursTemp())
            profileBody.appendChild(frag)

            // selections:
            const btnCreatVr = document.querySelector('.creatVr');
            const VrToursHolder = document.querySelector('.VrToursHolder');
            const userVrToursList = document.querySelector('.userVrToursList');
            // here we must fetch all User Vr's and apended in '.userVrToursList !!! //

            btnCreatVr.addEventListener('click', onClickCreatVr)

            function onClickCreatVr (e) {
                e.preventDefault()
                btnCreatVr.style.display = 'none';

                console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Event Creat VR is trigert!')
                // here we must fetch all User Vr's and apended in '.userVrToursList !!! //

                console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Button Creat Vr is trigerd!')
                let vrFormFragment = document.createRange().createContextualFragment(useTemplate.vrFormTemplate())
                btnCreatVr.after(vrFormFragment)
                
                // delete VrForm:
                const btnCloseVrForm = document.querySelector('.btnCloseVrForm')
                btnCloseVrForm.addEventListener('click', onDeleteVrForm);
                function onDeleteVrForm(){
                    btnCreatVr.style.display = '';
                    VrToursHolder.removeChild(btnCloseVrForm.parentElement)
                }

                // adding and removing InputImage and IMGs id logic:
                let btnAddImageInput = document.querySelector(".btnAddImageInput")
                btnAddImageInput.addEventListener('click', onClickBtnInputImg);

                let btnDeleteImageInput = document.querySelector(".btnDeleteImageInput")
                btnDeleteImageInput.addEventListener('click', onClickBtnInputImg);

                let formInputImageHolder = document.querySelector(".formInputImageHolder")
                let countId = 0

                function onClickBtnInputImg(e){
                    e.preventDefault()
                    console.log(e.target.className)
        
                    if (e.target.className === 'btnAddImageInput'){
                        countId += 1
                        let inputImageVrForm = document.createElement('input')
                        inputImageVrForm.className = `inputImageVrForm-${countId}`
                        inputImageVrForm.name = `inputImageVrForm-${countId}`
                        inputImageVrForm.type = 'file'
                        formInputImageHolder.appendChild(inputImageVrForm)

                    } else if (e.target.className === 'btnDeleteImageInput' && countId > 0){
                        countId -= 1
                        formInputImageHolder.removeChild(formInputImageHolder.lastChild)
                    }
                }
                //--------------------------------------------------------
          
                // inputImage background logic:
                formInputImageHolder.addEventListener('change', onChangePicInput)
                function onChangePicInput(e){
                    if (e.target.nodeName == "INPUT"){

                        let reader = new FileReader()
                        reader.addEventListener('load', () => {
                            console.log(reader.result)
                            e.target.style.backgroundImage = `url(${reader.result})`
                        })

                        console.log("CTX: ", e.target)
                        console.log("CTX: ", e.target.files)
                        console.log("INF about pic upload: ", e.target.files[0])
                        reader.readAsDataURL(e.target.files[0]);
                    }
                };
                //----------------------------------------------------------

                // data sumbmition:
                let vrCreatForm = document.querySelector('.vrCreatForm');

                vrCreatForm.addEventListener('submit', onSubmitNewVr)
                function onSubmitNewVr (e) {
                    e.preventDefault()
                    console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Button Save Vr is trigerd!')

                    let vrFormCreationDATA = new FormData(e.currentTarget);
                    console.log('C:>>> trigerProfileSettingsAndVrTourLogic -> Form Data:', Object.fromEntries(vrFormCreationDATA))

                    //frontValidation--------------------------------------------:

                    // returns: {field: errMessage}
                    let errorMessenger = useValidator.vrFormCreationValidation(vrFormCreationDATA);

                    if (Object.keys(errorMessenger).length === 0){

                        console.log('C:>>> trigerProfileSettingsAndVrTourLogic -> Form Data: NO ERRORS');
                        btnCreatVr.style.display = '';
                        VrToursHolder.removeChild(vrCreatForm.parentElement)

                        // returns: newUser {}
                        fetchME.sendVrFormCreationDATA(vrFormCreationDATA)
                            .then((result) => result.json())
                            .then((newUser) => {

                                console.log(newUser)
                                // fill the VRform and atoch to userVrToursList (it is selectet somewere up)

                            })
                            .catch((err) => console.log(err.message))
 
                    } else {
                        console.log('C:>>> trigerProfileSettingsAndVrTourLogic -> Form Data -> ERRORS:', errorMessenger);
                    };
                };
            };
        };
    }
};


export const useService = {
    sendRegisterInf,
    sendLogInInf,
    getUserData,
    sumbitNewSettingData,
    trigerProfileSettingsAndVrTourLogic
}