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

    <form class="vrCreatForm" enctype="multipart/form-data">

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
        </select>
        
        
        <label for="LocationVrForm">Адрес на имота *</label>
        <input type="text" name="LocationVrForm">
        
        <label for="propertyfloorVrForm">Етаж на апартамента *</label>
        <input type="text" name="propertyfloorVrForm">
        
        <label for="areaCommonPartsVrForm">Площ с общи части *</label>
        <input type="text" name="areaCommonPartsVrForm">
        
        <label for="areaNoneCommonPartsVrForm">Площ без общи части *</label>
        <input type="text" name="areaNoneCommonPartsVrForm">

        <label for="priceVrForm">Цена/кв.м.*</label>
        <input type="text" name="priceVrForm">

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

export const useTemplate = {
    homeTemp,
    loginTemp,
    registerTemp,
    aboutTemp,
    profileTemp,
    profileSettingsTemp,
    profileVrToursTemp,
    vrFormTemplate
};