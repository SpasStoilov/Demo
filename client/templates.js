import {html, render} from "./node_modules/lit-html/lit-html.js";
import { useService } from "./services.js";

console.log('C:>>> Templates acting...')

const homeTemp = () => html`<h1>HOME</h1>`;

const aboutTemp = () => html`<h1>2About</h1>`;


const registerTemp = () => html`
<ul class="spanErrorRegister"></ul>
<form class="registerForm" @submit=${useService.sendRegisterInf}>
    <input type="text" id="email" name="email" placeholder="Емайл"/><br>
    <input type="text" id="username" name="username" placeholder="Име"/><br>
    <input type="password" id="password" name="password" placeholder="Парола"/><br>
    <input type="password" id="reppassword" name="reppassword" placeholder="Повтори парола"/><br>
    <input type="submit" class="registerButton" value="Регистрация"><br>
</form>`;


const loginTemp = () => html`
<li class="LogInErrHead"></li>
<form class="loginForm" @submit=${useService.sendLogInInf}>
    <input type="text" id="email" name="email" placeholder="enter email"/><br>
    <input type="password" id="password" name="password" placeholder="enter password"/><br>
    <input type="submit" class="loginButton" value="Влез"><br>
</form>`;

const profileTemp = () => html`
<div class="profileBar">
    <a href="/profile/settings" class="profileSettings">Настройки</a>
    <a href="/profile/vrtours" class="profileVrTours">Мойте Обяви</a>
</div>
<ul class="settingsErrosHead"></ul>
<div class="profileBody"><div>
`;

function profileSettingsTemp(){

    console.log('C:>>> profileSettingsTemp load...')
    let settingsHolder = document.createElement('div');
    settingsHolder.className = 'settingsHolder'
    
    useService.getUserData()
        .then(resp => resp.json())
        .then(rslt => {
            let Userer = rslt
            console.log('C:>>> profileSettingsTemp: Fill UserData', Userer);
            let userEmail = Userer.email;
            let userName = Userer.username;
            let userPass = Userer.password;
            const UserDataTemp = () => html`
            <form class="settingsInformation">
                <label for="email">Имейл</label><br>
                <input name="email" class="settingsEmail" type="text" value="${userEmail}"><br>
                <label for="username">Име</label><br>
                <input name="username" class="settingsUsername" type="text" value="${userName}"><br>
                <label for="password">Парола</label><br>
                <input name="password" class="settingsPassword" type="text" value="${userPass}"><br>
                <label for="reppassword">Потвърди - парола</label><br>
                <input name="reppassword" class="settingsReppassword" type="text"><br>
                <input type="submit" class="saveSettings" value="Запази">
            </form>
            `;
            render(UserDataTemp(), settingsHolder);

            console.log('C:>>> profileSettingsTemp: Add Serves/Event: Submit')
            let settingsForm = document.querySelector('.settingsInformation');
            console.log("C:>>> profileSettingsTemp: Settings Form Element: ", settingsForm)
            settingsForm.addEventListener('submit',  onSubmit);

            function onSubmit (e) {
                e.preventDefault();
                useService.sumbitNewSettingData(e)
            };

        })
        .catch(err => console.log(err));
    
    console.log(settingsHolder)
    return settingsHolder
};


const profileVrToursTemp = () => `
<div class="VrToursHolder">
    <button class="creatVr">Създай Обява</button>
    <ul class="userVrToursList"></ul>
</div>
`;

const vrFormTemplate = () => `
<div class="vrForm">

    <button class="btnCloseVrForm">X</button><br>

    <form class="vrCreatForm">

        <div class="formInputImageHolder">
            <input name="inputImageVrForm" type="file"></input>
        </div>
        
        <div>
            <button class="btnDeleteImageInput">-</button>
            <button class="btnAddImageInput">+</button>
        </div>
        
        <label for="typeVrForm">Тип обява *</label>
        <div class="RadioBtnHolderVrForm">
            <label>Продажба</label>
            <input type="radio" name="RadioBtnVrForm" value="Sale" checked>
            <label>Наем</label>
            <input type="radio" name="RadioBtnVrForm" value="Apartment">
            <label>Замяна</label>
            <input type="radio" name="RadioBtnVrForm" value="Replace">
        </div>
      
        <label for="TypeApartmentVrForm">Вид на имота *</label>
        <select name="TypeApartmentVrForm" id="">
            <option value="OneRoomVrForm">Едностаен</option>
            <option value="TwoRoomsVrForm">Двустаен</option>
            <option value="ThreeRoomsVrForm">Тристаен</option>
            <option value="ManyRoomsVrForm">Многостаен</option>
            <option value="PenthouseVrForm">Мезонет</option>
            <option value="HouseVrForm">Къща</option>
            <option value="ParkingSpaceVrForm">Паркомясто</option>
            <option value="BasementVrForm">Мазе</option>
            <option value="StudioVrForm">Ателие</option>
            <option value="ShopVrForm">Магазин</option>
            <option value="GroundVrForm">Земя</option>
        </select>
        
        <label for="imgs-googleLocationDescription">Google Адрес на имота *</label>
        <div class="imgs-googleLocationDescription">
            <img src="/googleLocationDescription/step1.jpg" alt="pichere">
            <img src="/googleLocationDescription/step2.jpg" alt="pichere">
            <img src="/googleLocationDescription/step3.jpg" alt="pichere">
            <img src="/googleLocationDescription/step4.jpg" alt="pichere">
        </div>

        <label for="LocationVrForm">Поставете копирания адрес в полето:</label>
        <input type="text" name="LocationVrForm">
        
        <label for="propertyfloorVrForm">Етаж на апартамента *</label>
        <input type="text" name="propertyfloorVrForm">
        
        <label for="areaCommonPartsVrForm">Площ с общи части *</label>
        <input type="text" name="areaCommonPartsVrForm">
        
        <label for="areaNoneCommonPartsVrForm">Площ без общи части *</label>
        <input type="text" name="areaNoneCommonPartsVrForm">

        <label for="priceVrForm">Цена/кв.м.*</label>
        <input type="text" name="priceVrForm">
        
        <label for="curuncyVrForm">Валута</label>
        <select name="curuncyVrForm">
            <option value="EURO">Евро</option>
            <option value="BGN">Лева</option>
        </select>

        <label for="yearConstructionVrForm">Година на строеж</label>
        <input type="text" name="yearConstructionVrForm">
        
        <label for="buildingSizeVrForm">Етаж на сграда</label>
        <input type="text" name="buildingSizeVrForm">

        <label for="furnitureVrForm">Обзавеждане</label>
        <select name="furnitureVrForm">
            <option value="otherFurnishedVrForm">Друго</option>
            <option value="furnishedVrForm">Обзаведен</option>
            <option value="semiFurnishedVrForm">Полуобзаведен</option>
            <option value="unfurnishedVrForm">Необзаведен</option>
        </select>
        

        <label for="constructionVrForm">Вид Конструкция</label>
        <select name="constructionVrForm">
            <option value="noneConstructionVrForm">Друго</option>
            <option value="panelsVrForm">Панел</option>
            <option value="semiFurnishedVrForm">Тухла</option>
        </select>
        

        <label for="heatingVrForm">Отопление</label>
        <select name="heatingVrForm">
            <option value="noneHeatingVrForm">Друго</option>
            <option value="gasVrForm">Газ</option>
            <option value="electricityFurnishedVrForm">Електричество</option>
            <option value="districtHeatingVrForm">Топлофикация</option>
            <option value="solarPanelsHeatingVrForm">Соларни Панели</option>
        </select>
        
        
        <label for="ComplexVrForm">Допълнителна информация</label>
        <textarea name="moreInfoVrForm"></textarea>

        <label for="ComplexVrForm">Затворен Комплекс</label>
        <input type="checkbox" name="ComplexVrForm" id="" value="Complex">

        <input class=".uploadVrBtn" type="submit" value="Запази">
    </form>

</div>
`;


function vrFormInputImgTempAndLogic() {

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
}


export const useTemplate = {
    homeTemp,
    loginTemp,
    registerTemp,
    aboutTemp,
    profileTemp,
    profileSettingsTemp,
    profileVrToursTemp,
    vrFormTemplate,
    vrFormInputImgTempAndLogic
};