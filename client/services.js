import { fetchME } from './fetchme.js';
import { useValidator } from './validations.js';
import {useTemplate} from "./templates.js";
import {render} from "./node_modules/lit-html/lit-html.js";
import {goMarzipano} from "./formalVrTemplateLogic.js";

const patternImgName = /(?<=end\$)[^\/:*?"<>|]+(?=\.jpg$|\.png$)/;
const patterImgID = /ID[0-9-]+end\$/;
const patterImgEx = /(.jpg$|.png$)/;


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
};

const fieldsOfIntrest = {
    propertyfloorVrForm:'Етаж на апартамента',
    areaCommonPartsVrForm: 'Площ с общи части',
    areaNoneCommonPartsVrForm: 'Площ без общи части',
    yearConstructionVrForm: 'Година на строеж',
    buildingSizeVrForm: 'Етаж на сграда',
    furnitureVrForm: 'Обзавеждане',
    constructionVrForm: 'Строителство',
    heatingVrForm: 'Отопление'
};

const BtnDescriptors = {
    '.btnDescription-VrFormalForm': '.description-VrFormalForm',
    '.btnAdress-VrFormalForm': '.GoogleAdress-VrFormalForm',
    '.btnBuyerInformation-VrFormalForm': '.buyerInformation-VrFormalForm',
    '.btnSellarInformation-VrFormalForm': '.sellarInformation-VrFormalForm',
};


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


function vrDataFormSubmition(btnCreatVr, VrToursHolder, userVrToursList, flag=false){

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
                                       // returns: {field: errMessage}
        let errorMessenger = useValidator.vrFormCreationValidation(vrFormCreationDATA, flag);
        //-----------------------------------------------------------


        // Check for Errors:
        if (Object.keys(errorMessenger).length === 0){

            // returns -> newUser object:
            fetchME.sendVrFormCreationDATA(vrFormCreationDATA, flag)
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
                      
                        fetchME.userVrs()
                            .then(resp => resp.json())
                            .then(user => {
                                fillUserVrToursList(user, userVrToursList);
                            })
                            .catch(err => console.log("C:>>> trigerProfileSettingsAndVrTourLogic -> fetchME.userVrs() -> ERRORS", err.message))
                    }
                  
                })
                .catch((err) => console.log(err))
            //--------------------------------------------------------------------

        } else {
            console.log('C:>>> vrDataFormSubmition -> We have Front End ERRORS!:', errorMessenger);
        };

    };
}


function fillUserVrToursList(user, userVrToursList, hide=false){
    console.log("C:>>> Service -> fillUserVrToursList -> User", user);
    console.log("C:>>> Service -> fillUserVrToursList -> userVrToursList", userVrToursList);
    
    // here we clear the list:
    userVrToursList.textContent = '';
    //-------------------------------------------------------------------------------

    if (user.vrs.length !== 0){
        const vrsList = user.vrs
        vrsList.reverse();

        console.log("C:>>> Service -> fillUserVrToursList -> user.vrs", user.vrs);
        const patternLocation = /(?<=src=")[a-zA-Z0-9://.?=!% ";-]+(?=" width)/

        for (let vr of vrsList){

            let newvr = vr;

            for (let [vrField, vrFieldValue] of Object.entries(vr)){

                console.log("C:>>> Service -> fillUserVrToursList -> vr -> field:", vrField);
                console.log("C:>>> Service -> fillUserVrToursList -> vr -> value:", vrFieldValue);

                if (vrField === 'LocationVrForm'){
                    let matchValue = vrFieldValue.match(patternLocation)
                    if (!matchValue) {
                        newvr[vrField] = defaultLocation
                    } else {
                        console.log("C:>>> Service -> fillUserVrToursList -> GoogleLocations SRC:", matchValue[0])
                        newvr[vrField] = matchValue[0]
                    }
                }
                else if (!vrFieldValue && vrField !== "_id" && vrField !== "__v"){
                    console.log("C:>>> Service -> fillUserVrToursList -> Field Empty -> value:", vrFieldValue)
                    delete newvr[vrField];
                }
                else if (Object.keys(dictionaryValues).includes(vrFieldValue)){
                    console.log("C:>>> Service -> fillUserVrToursList -> dictionaryValues -> value:", dictionaryValues[vrFieldValue]);
                    newvr[vrField] = dictionaryValues[vrFieldValue]
                }
                else if (vrField === 'areaCommonPartsVrForm' || vrField === 'areaNoneCommonPartsVrForm') {
                    newvr[vrField] = vrFieldValue + " " + "кв.м."
                }
                

            };

            // creat vr and append:    
            console.log("C:>>> Service -> fillUserVrToursList -> newvr", newvr);
            let frag = document.createRange().createContextualFragment(useTemplate.formalVrTemplate(newvr));
            userVrToursList.appendChild(frag);
            //-----------------------------------------------------------------------------

            // select all apended in userTourList:
            const selectFrags = Array.from(userVrToursList.querySelectorAll('.formalVrFormHolder'));
            console.log("C:>>> Service -> fillUserVrToursList -> AllFragsMade:", selectFrags);
            let lastFrag = selectFrags[selectFrags.length - 1]
            console.log("C:>>> Service -> fillUserVrToursList -> LastFragMade:", lastFrag);
            //-----------------------------------------------------------------------------

            // Dom selection:
            let buttonsHolder = lastFrag.querySelector('.buttonViews-VrFormalForm');
            console.log("C:>>> Service -> fillUserVrToursList -> buttonsHolder:", buttonsHolder);

            //here we hide DotMenu if and only if the user dose not acsesing his Vr true ProfileVrTours:
            if (hide === 'hideDotMenu'){
                lastFrag.querySelector('.manuHolder-VrFormalForm').style.display = 'none';
            }
            //----------------------------------------------------------------------------------

            let pano = lastFrag.querySelector('#pano')
            console.log("C:>>> Service -> fillUserVrToursList -> Pano:", pano)

            let descriptionVrFormalForm = lastFrag.querySelector(".description-VrFormalForm")
            console.log("C:>>> Service -> fillUserVrToursList -> description-VrFormalForm:", descriptionVrFormalForm)
            //----------------------------------------------------------------------------
          
            // img Object Info Holder:
            const imgNameAndID = {};
            //----------------------------------------------------------------------------

            // fill description-VrFormalForm and block-description-VrFormalForm:
            for (let [field, value] of Object.entries(newvr)){

                console.log("XXXXX description-VrFormalForm and block-description-VrFormalForm")

                if (Object.keys(fieldsOfIntrest).includes(field)){
                    let frag = document.createRange().createContextualFragment(useTemplate.blockDescriptionVrFormalForm(fieldsOfIntrest[field], value));
                    descriptionVrFormalForm.appendChild(frag);
                    console.log("XXX:descriptionVrFormalForm->", descriptionVrFormalForm)
                }
            }

            const allFieldOfIntrest = descriptionVrFormalForm.querySelectorAll('.block-description-VrFormalForm:nth-child(2n)')

            for (let fieldIn of allFieldOfIntrest) {
                console.log("YYYYYY description-VrFormalForm and block-description-VrFormalForm")
                fieldIn.style.backgroundColor = "#7ADFDF"
            }
            //----------------------------------------------------------------------------
            
            let imgs = newvr.imgs;
            console.log("C:>>> Service -> fillUserVrToursList -> newvr.imgs:", imgs);

            // btn creation and append to buttonsHolder:
            let count = 1
            for (let img of imgs) {

                const imgName = img.match(patternImgName)[0];
                const imgID = img.match(patterImgID)[0];
                const imgEx = img.match(patterImgEx)[0];
                imgNameAndID[imgName] = [imgID, imgEx];

                console.log("C:>>> Service -> fillUserVrToursList -> imgName:", imgName)
                console.log("C:>>> Service -> fillUserVrToursList -> imgID:", imgID)
                console.log("C:>>> Service -> fillUserVrToursList -> imgEx:", imgEx)

                let btn = document.createElement('button');
                btn.textContent = imgName;

                if (count == 1){
                btn.style.backgroundColor = '#CFCFCF';
                }

                buttonsHolder.appendChild(btn);
                count ++;
            };
            //---------------------------------------------------------------------------

            const ImgName = Object.keys(imgNameAndID)[0];
            const ImgID = imgNameAndID[ImgName][0];
            const ImgEx = imgNameAndID[ImgName][1];
            const firstImgLocation = `useruploads/${ImgID}${ImgName}${ImgEx}`;

            console.log("C:>>> C:>>> Service -> fillUserVrToursList -> IMG -> name, ID, Ex:", imgNameAndID);
            console.log("C:>>> C:>>> Service -> fillUserVrToursList -> IMG -> firstImgLocation:", firstImgLocation);

            goMarzipano(firstImgLocation, pano, imgNameAndID, buttonsHolder);
            
        }

    }
    else {
        console.log("C:>>> fillUserVrToursList -> No VR's found!")
    }
}


function fillDataToEditInVrFormTemplate(vrObjectToEdit, btnCreatVr, VrToursHolder, userVrToursList, id){
    console.log('C:>>> fillDataToEditInVrFormTemplate: acting...');

    //styles:
    btnCreatVr.style.display = 'none';
    //------------------------------------------------------------------------------------------------

    // DOM selections:
    let vrFormFragment = document.createRange().createContextualFragment(useTemplate.vrFormTemplate())
    btnCreatVr.after(vrFormFragment)
    
    const vrForm = document.querySelector('.btnCloseVrForm').parentElement;
    console.log('C:>>> fillDataToEditInVrFormTemplate: vrForm', vrForm);

    const idInput = document.createElement('input')
    idInput.type = 'text';
    idInput.name = 'editObjId'
    idInput.value = id
    idInput.style.display = 'none'
    
    vrForm.querySelector('.vrCreatForm').prepend(idInput)
    
    let deleteNextImgsHolder = vrForm.querySelector('.delete-next-imgs-holder');
    deleteNextImgsHolder.style.display = "block";

    const btnCloseVrForm = vrForm.querySelector('.btnCloseVrForm');

    //-------------------------------------------------------------------------------------------------

    // adding imgs check boxes for delete: 
  
    for (let adrs of vrObjectToEdit.imgs){
        const imgName = adrs.match(patternImgName)[0];
        const imgID = adrs.match(patterImgID)[0];
        const imgEx = adrs.match(patterImgEx)[0];

        let temp = `
        <img src="/useruploads/${imgID}${imgName}${imgEx}" alt="pic">
        <input type="checkbox" name="${adrs}" value=${adrs}><label class="img-delete-lable">${imgName}</label>`;
        deleteNextImgsHolder.innerHTML += temp;
    }

    //-------------------------------------------------------------------------------------------------

    // appending information in vrFormToEdit:
    for (let [field, value] of Object.entries(vrObjectToEdit)){

        const fieldNotToSelectAndFill = ['imgs','__v','_id']
        if (!fieldNotToSelectAndFill.includes(field)){

            if (field === "RadioBtnVrForm"){
                console.log('C:>>> fillDataToEditInVrFormTemplate: vrForm -> element To fill:', vrForm.querySelector(`[value=${value}]`))
                vrForm.querySelector(`[value=${value}]`).value = value;
                vrForm.querySelector(`[value=${value}]`).checked = true
            }
            else{
                console.log('C:>>> fillDataToEditInVrFormTemplate: vrForm -> element To fill:', vrForm.querySelector(`[name=${field}]`))
                vrForm.querySelector(`[name=${field}]`).value = value
            }
            
        };
    }
    //-------------------------------------------------------------------------------------------------
    
    // Delete Edit VrForm:
    btnCloseVrForm.addEventListener('click', onDeleteVrForm);
    function onDeleteVrForm(){
        btnCreatVr.style.display = '';
        VrToursHolder.removeChild(btnCloseVrForm.parentElement)
    };
    //------------------------------------------------------------------------------------------------

    // Adding and removing Input Images:
    useTemplate.vrFormInputImgTempAndLogic()
    //------------------------------------------------------------------------------------------------

    // Data sumbmition to server:
    let flag = 'edit'
    vrDataFormSubmition(btnCreatVr, VrToursHolder, userVrToursList, flag)
    //------------------------------------------------------------------------------------------------
}

// iznesena rabotq po neq:

function vrFormalFormFunctionality(userVrToursList, btnCreatVr=false, VrToursHolder=false) {

    userVrToursList.addEventListener('click', onClickVrToursHolder);

    function onClickVrToursHolder(e){
        e.preventDefault()
        console.log('C:>>> trigerProfileSettingsAndVrTourLogic: VrToursHolder is clicked at:', e.target);

        // close menuOptions for all VrFormalForms:
        let allformalVrFormHolders = userVrToursList.querySelectorAll('.formalVrFormHolder')

        for (let formalForm of allformalVrFormHolders){
            formalForm.querySelector('.options-manuHolder-VrFormalForm').style.display = 'none';
        };
        //--------------------------------------------------------------------------------------------------

        // checking what is clicked:
        if (e.target.nodeName === "BUTTON" &&
         Object.keys(BtnDescriptors).includes('.' + e.target.className) || 
         e.target.className === "show-Less-VrFormalForm")
         {

            const buttonInformation = e.target.parentElement;
            buttonInformation.querySelector(".show-Less-VrFormalForm").style.display = "block"
            const formalVrFormHolder = buttonInformation.parentElement;

            // btn Decriptors backgroundColor chnage:
            for (let [btnClasName, fieldToExpandClassName] of Object.entries(BtnDescriptors)){
                console.log(buttonInformation)
                buttonInformation.querySelector(btnClasName).style.backgroundColor = '';
                formalVrFormHolder.querySelector(fieldToExpandClassName).style.display = 'none';
            };
            //-----------------------------------------------------------------------------------------

            console.log(e.target.className)

            if (e.target.className !== "show-Less-VrFormalForm"){
                e.target.style.backgroundColor = "#CFCFCF"
                formalVrFormHolder.querySelector(BtnDescriptors['.' + e.target.className]).style.display = 'block';
            }
            else{
                buttonInformation.querySelector(".show-Less-VrFormalForm").style.display = 'none'
            }
       
            //-----------------------------------------------------------------------------------------
        }
        else if (e.target.nodeName === "BUTTON" && e.target.className == 'btnManu-VrFormalForm'){

            // Displaying menu options for vrFormalForm:
            let optionsManuHolderVrFormalForm = e.target.parentElement.parentElement.querySelector(".options-manuHolder-VrFormalForm")
            optionsManuHolderVrFormalForm.style.display = "flex"
            //------------------------------------------------------------------------------------------
        }
        else if (e.target.value.startsWith("Delete-") && btnCreatVr && VrToursHolder){

            //Delete vrFormalForm:
            const idToDelete = e.target.value.slice(7);
            console.log("c:>>> idToDelete:", idToDelete)

            
            fetchME.deleteVrFormalForm(idToDelete)
                .then(resp => resp.json())
                .then(result => {

                    // result -> { _id: '62be0d5e39984e905e7d5a7b' } or {}
                    console.log('C:>>> trigerProfileSettingsAndVrTourLogic: VrToursHolder -> DeleteButn -> fetch Result:', result);

                    if (Object.keys(result).length !== 0) {
                        userVrToursList.removeChild(e.target.parentElement.parentElement)
                    };
                })
                .catch(err => console.log(err.message))

            //--------------------------------------------------------------------------------------
        }
        else if (e.target.value.startsWith("Edit-") && btnCreatVr && VrToursHolder){

            //Edit vrFormalForm:
            const idToEdit = e.target.value.slice(5);
            console.log("c:>>> idToEdit:", idToEdit)


            fetchME.userVrs()
                .then(resp => resp.json())
                .then(user => {

                    // result -> [{vrObj1}, {...}]
                    console.log('C:>>> trigerProfileSettingsAndVrTourLogic: VrToursHolder -> EditButn -> fetch Result:', user.vrs);
                    let vrToEdit = user.vrs.filter((vr) => vr['_id'] === idToEdit)[0]
                    console.log('C:>>> trigerProfileSettingsAndVrTourLogic: VrToursHolder -> EditButn -> vrToEdit:', vrToEdit);

                    fillDataToEditInVrFormTemplate(vrToEdit, btnCreatVr, VrToursHolder, userVrToursList, idToEdit)

                })
                .catch(err => console.log(err))

            //------------------------------------------------------------------------------------------

        };

        //----------------------------------------------------------------------------------------------

        
    };

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
            e.target.style.backgroundColor = '#dfdfdf';
            vrBTN.style.backgroundColor = "#F0F2F5";
            //-------------------------------------------------------------------
            
            // Atouching the profileSettingsTemp to profileBody:
            profileBody.appendChild(useTemplate.profileSettingsTemp());
            //-------------------------------------------------------------------

        } else if (e.target.className === 'profileVrTours'){

            console.log('C:>>> trigerProfileSettingsAndVrTourLogic: My Vrs btn is cliked!')

            // styles:
            e.target.style.backgroundColor = '#dfdfdf';
            settingBTN.style.backgroundColor = "#F0F2F5";
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
                    fillUserVrToursList(user, userVrToursList);
                })
                .catch(err => console.log("C:>>> trigerProfileSettingsAndVrTourLogic -> fetchME.userVrs() -> ERRORS", err.message))
            //--------------------------------------------------------------------

            // ADDing VR Formal Form Functionality:
            vrFormalFormFunctionality(userVrToursList, btnCreatVr, VrToursHolder);
            //--------------------------------------------------------------------------------------------------

            // btn creat VR is clicked:
            btnCreatVr.addEventListener('click', onClickCreatVr);
            function onClickCreatVr (e) {
                e.preventDefault()

                console.log('C:>>> trigerProfileSettingsAndVrTourLogic: Button Creat Vr is trigerd!')

                //styles:
                btnCreatVr.style.display = 'none';
                //------------------------------------------------------------------------------------------------

                //selections:
                let vrFormFragment = document.createRange().createContextualFragment(useTemplate.vrFormTemplate())
                btnCreatVr.after(vrFormFragment)
                //------------------------------------------------------------------------------------------------
                
                // Delete VrForm:
                closeVrUserForm(btnCreatVr, VrToursHolder);
                //------------------------------------------------------------------------------------------------

                // Adding and removing Input Images:
                useTemplate.vrFormInputImgTempAndLogic()
                //------------------------------------------------------------------------------------------------

                // Data sumbmition to server:
                vrDataFormSubmition(btnCreatVr, VrToursHolder, userVrToursList)
                //------------------------------------------------------------------------------------------------
            };
        };
    }
};


//new:
function getAllVrs(){
    
    console.log('C:>>> Service -> getAllVrs acting...');

    fetchME.getAllUsersVrs()
        .then(resp => resp.json())
        .then(listOfVrObjcts => {

            // Constructing fakeUser:
            const fakeUser = {
                vrs: listOfVrObjcts
            }
            //------------------------------------------------------------------------------------

            // DOM:
            let wallVrHolderList = document.querySelector('.wall-vr-holder-list')
            //------------------------------------------------------------------------------------
            
            console.log('C:>>> Service -> getAllVrs -> fakeUser:', fakeUser);
            console.log('C:>>> Service -> getAllVrs -> wallVrHolderList:', wallVrHolderList);

            // fill wallVrHolderList (here we must send flag to hide edit delete):
            fillUserVrToursList(fakeUser, wallVrHolderList, 'hideDotMenu');

            // trigar logic of the template (without edit and delete menu!!!!):

            vrFormalFormFunctionality(wallVrHolderList);

                // ?btnCreatVr, ?VrToursHolder are used in edit: we are not gonna (edit and delete menu!!!! we need flags)
                // flags are going to tel if the user acses vr templete from profilVr()where he can creat Vrs or not (Wall)

            //------------------------------------------------------------------------------------

        })
        .catch(err => console.log(err.message))

}


//new:
async function sendFilteredVrData(objectData){

    console.log("C:>>> Service -> sendFilteredVrData acting...")

    try {

        const result = await fetchME.getFilteredVrs(objectData);
        const filteredVrData = await result.json();  // [{...}, {...}]
        onsole.log("C:>>> Service -> sendFilteredVrData -> filteredVrData:", filteredVrData);

        // Constructing fakeUser:
        const fakeUser = {
            vrs: filteredVrData
        }
        //------------------------------------------------------------------------------------

        let wallVrHolderList = document.querySelector('.wall-vr-holder-list');
        wallVrHolderList.textContent = '';
        
        fillUserVrToursList(fakeUser, wallVrHolderList, 'hideDotMenu');

    } catch (err) {
        console.log("C:>>> Service -> sendFilteredVrData -> Error:", err)
    }
    
}

export const useService = {
    sendRegisterInf,
    sendLogInInf,
    getUserData,
    sumbitNewSettingData,
    trigerProfileSettingsAndVrTourLogic,
    closeVrUserForm,
    vrDataFormSubmition,
    getAllVrs,
    sendFilteredVrData
}