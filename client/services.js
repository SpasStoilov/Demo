import { fetchME } from './fetchme.js';
import { useValidator } from './validations.js';
import {useTemplate} from "./templates.js";
import {render} from "./node_modules/lit-html/lit-html.js";
import {goMarzipano} from "./formalVrTemplateLogic.js";


const defaultLocation = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.2986166567994!2d23.31935981575583!3d42.697397421723046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856ec8633e15%3A0xbb095af9967ad612!2sbulevard%20%22Knyaginya%20Maria%20Luiza%22%202%2C%201000%20Sofia%20Center%2C%20Sofia!5e0!3m2!1sen!2sbg!4v1656494888255!5m2!1sen!2sbg";

const dictionaryValues = {
    Sale:'Продажба',
    Apartment: "Наем",
    Replace: "Замяна",

    OneRoomVrForm: "Едностаен",
    TwoRoomsVrForm: "Двустаен",
    ThreeRoomsVrForm: "Тристаен",
    ManyRoomsVrForm: "Многостаен",
    PenthouseVrForm: "Мезонет",
    HouseVrForm: "Къща",
    ParkingSpaceVrForm: "Паркомясто",
    BasementVrForm: "Мазе",
    StudioVrForm: "Ателие",
    ShopVrForm: "Магазин",
    GroundVrForm: "Земя",

    otherFurnishedVrForm: "Друго",
    furnishedVrForm: "Обзаведен",
    semiFurnishedVrForm: "Полуобзаведен",
    unfurnishedVrForm: "Необзаведен",

    noneConstructionVrForm: "Друго",
    newConstructionVrForm: "Ново строителство",
    oldConstructionVrForm: "Старо строителство",
    complexConstructionVrForm: "Комплекс",

    noneHeatingVrForm: "Друго",
    gasVrForm: "Газ",
    electricityFurnishedVrForm: "Електричество",
    districtHeatingVrForm: "Топлофикация",
    solarPanelsHeatingVrForm: "Соларни Панели"
}


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

};


function closeVrUserForm(btnCreatVr, VrToursHolder){

    const btnCloseVrForm = document.querySelector('.btnCloseVrForm')

    btnCloseVrForm.addEventListener('click', onDeleteVrForm);
    function onDeleteVrForm(){
        btnCreatVr.style.display = '';
        VrToursHolder.removeChild(btnCloseVrForm.parentElement)
    };

};


function vrDataFormSubmition(btnCreatVr, VrToursHolder, userVrToursList){

    console.log('C:>>> vrDataFormSubmition -> acting...:');

    // selections:
    const vrCreatForm = document.querySelector('.vrCreatForm');
    //----------------------------------------------------------------

    vrCreatForm.addEventListener('submit', onSubmitNewVr)

    function onSubmitNewVr (e) {
        e.preventDefault()

        console.log('C:>>> vrDataFormSubmition: Button Save Vr is trigerd!')
        
        // selections:
        let vrFormCreationDATA = new FormData(e.currentTarget);
        console.log('C:>>> vrDataFormSubmition -> Form Data:', Object.fromEntries(vrFormCreationDATA))
        //----------------------------------------------------------------

        //frontValidation--------------------------------------------:
        let errorMessenger = useValidator.vrFormCreationValidation(vrFormCreationDATA); // returns: {field: errMessage}
        //-----------------------------------------------------------

        // Check for Errors:
        if (Object.keys(errorMessenger).length === 0){

            // returns -> newUser object:
            fetchME.sendVrFormCreationDATA(vrFormCreationDATA)
                .then((result) => result.json())
                .then((newUser) => {

                    console.log('C:>>> vrDataFormSubmition -> New Userer:', newUser)

                    if (!newUser.email){
                        console.log('C:>>> vrDataFormSubmition -> We have Server Errors!');
                        useValidator.vrFormCreationValidation(Object.entries(newUser))
                    }
                    else {
                        console.log('C:>>> vrDataFormSubmition -> NO Server ERRORS!');
                        btnCreatVr.style.display = '';
                        VrToursHolder.removeChild(vrCreatForm.parentElement)
                        let newVrObjToAppend = newUser.vrs[0]
                    }
 
                    // fill the VRform and atoch to userVrToursList (it is selectet somewere up)


                    // {_id: '62b5b8c4323ccf634d992b50', email: 'c8pensil@gmail.com', username: 'SpasPStoilov',  password: '123', vrs: Array(1), …}

                    // email: "c8pensil@gmail.com"
                    // password: "123"
                    // username: "SpasPStoilov"
                    // vrs: Array(1)
                        // 0:
                            // LocationVrForm: "1"
                            // RadioBtnVrForm: "Sale"
                            // TypeApartmentVrForm: "OneRoomVrForm"
                            // areaCommonPartsVrForm: 1
                            // areaNoneCommonPartsVrForm: 1
                            // buildingSizeVrForm: null
                            // constructionVrForm: "noneConstructionVrForm"
                            // furnitureVrForm: "otherFurnishedVrForm"
                            // heatingVrForm: "noneHeatingVrForm"
                            // imgs: ['./static/useruploads/IronmanWallpaper.jpg']
                            // moreInfoVrForm: ""
                            // priceVrForm: 1
                            // propertyfloorVrForm: 1
                            // yearConstructionVrForm: 1
                  
                })
                .catch((err) => console.log(err))
            //--------------------------------------------------------------------

        } else {
            console.log('C:>>> vrDataFormSubmition -> We have Front End ERRORS!:', errorMessenger);
        };

    };
}


function fillUserVrToursList(user, userVrToursList){
    console.log("C:>>> Service -> fillUserVrToursList -> User", user);
    console.log("C:>>> Service -> fillUserVrToursList -> userVrToursList", userVrToursList);

    if (user.vrs.length !== 0){
        const vrsList = user.vrs
        const patternLocation = /(?<=src=")[a-zA-Z0-9://.?=!% ";-]+(?=")/

        for (let vr of vrsList){

            let newvr = vr

            for (let [vrField, vrFieldValue] of Object.entries(vr)){

                console.log("C:>>> Service -> fillUserVrToursList -> vr -> field:", vrField);
                console.log("C:>>> Service -> fillUserVrToursList -> vr -> value:", vrFieldValue);

                if (vrField === 'LocationVrForm'){
                    let matchValue = vrFieldValue.match(patternLocation)
                    if (!matchValue) {
                        newvr.vrField = defaultLocation
                    } else {
                        newvr.vrField = matchValue[0]
                    }
                }
                else if (!vrFieldValue && vrField !== "_id"){
                    console.log("C:>>> Service -> fillUserVrToursList -> Field Empty -> value:", vrFieldValue)
                    newvr.vrField = " "
                }
                else if (Object.keys(dictionaryValues).includes(vrFieldValue)){
                    console.log("C:>>> Service -> fillUserVrToursList -> dictionaryValues -> value:", dictionaryValues[vrFieldValue]);
                    newvr[vrField] = dictionaryValues[vrFieldValue]
                }
            };
                
            console.log("C:>>> Service -> fillUserVrToursList -> vr", newvr);
            let frag = document.createRange().createContextualFragment(useTemplate.formalVrTemplate(newvr));
            userVrToursList.appendChild(frag);

            // goMarzipano(vr.imgs, userVrToursList);
            
        }
        
    }
    else {
        console.log("C:>>> fillUserVrToursList -> No VR's found!")
    }
}


function trigerProfileSettingsAndVrTourLogic () {

    console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Adding Events...')

    // Selections:
    let profileBody = document.querySelector('.profileBody');
    let settingBTN = document.querySelector('.profileSettings');
    let vrBTN = document.querySelector('.profileVrTours');
    let profileBar = document.querySelector('.profileBar');
    //--------------------------------------------------------------------------

    // styles:
    profileBody.textContent = '';
    profileBody.appendChild(useTemplate.profileSettingsTemp());
    profileBar.addEventListener('click', onClick);
    //--------------------------------------------------------------------------
  
    function onClick (e) {
        e.preventDefault();

        console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Event is Trigered...')

        // Clearing profileBody content:
        profileBody.textContent = '';
        //----------------------------------------------------------------------

        if (e.target.className === 'profileSettings'){

            console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Settings btn is cliked!')

            // styles:
            e.target.style.backgroundColor = '#48b664';
            vrBTN.style.backgroundColor = '#cacaca';
            //-------------------------------------------------------------------
            
            // Atouching the profileSettingsTemp to profileBody:
            profileBody.appendChild(useTemplate.profileSettingsTemp());
            //-------------------------------------------------------------------

        } else if (e.target.className === 'profileVrTours'){

            console.log('C:>>> trigerProfileSettingsAndVrTourLogic: My Vrs btn is cliked!')

            // styles:
            e.target.style.backgroundColor = '#48b664';
            settingBTN.style.backgroundColor = '#cacaca';
            //-------------------------------------------------------------------
          
            // Atouching the profileVrToursTemp to profileBoddy:
            let frag = document.createRange().createContextualFragment(useTemplate.profileVrToursTemp())
            profileBody.appendChild(frag)
            //-------------------------------------------------------------------

            // selections:
            const btnCreatVr = document.querySelector('.creatVr');
            const VrToursHolder = document.querySelector('.VrToursHolder');
            const userVrToursList = document.querySelector('.userVrToursList');
            //--------------------------------------------------------------------

            // here we fetch all User Vr's and apended in '.userVrToursList !!!
             fetchME.userVrs()
                .then(resp => resp.json())
                .then(user => {
                    fillUserVrToursList(user, userVrToursList)
                })
                .catch(err => console.log("C:>>> trigerProfileSettingsAndVrTourLogic -> fetchME.userVrs() -> ERRORS", err.message))
            //--------------------------------------------------------------------

            btnCreatVr.addEventListener('click', onClickCreatVr)

            function onClickCreatVr (e) {
                e.preventDefault()

                console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Button Creat Vr is trigerd!')

                //styles:
                btnCreatVr.style.display = 'none';
                //--------------------------------------------------------------------

                //selections:
                let vrFormFragment = document.createRange().createContextualFragment(useTemplate.vrFormTemplate())
                btnCreatVr.after(vrFormFragment)
                //--------------------------------------------------------------------
                
                // Delete VrForm:
                closeVrUserForm(btnCreatVr, VrToursHolder);
                //--------------------------------------------------------------------

                // Adding and removing Input Images:
                useTemplate.vrFormInputImgTempAndLogic()
                //--------------------------------------------------------------------

                // Data sumbmition to server:
                vrDataFormSubmition(btnCreatVr, VrToursHolder, userVrToursList)
                //--------------------------------------------------------------------
            };
        };
    }
};


export const useService = {
    sendRegisterInf,
    sendLogInInf,
    getUserData,
    sumbitNewSettingData,
    trigerProfileSettingsAndVrTourLogic,
    closeVrUserForm,
    vrDataFormSubmition
}