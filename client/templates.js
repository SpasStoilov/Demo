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
        
        <label for="type-VrForm">Тип обява *</label>
        <div class="Radio-Btn-holder-VrForm">
            <label>Продажба</label>
            <input type="radio" name="RadioBtnVrForm" value="Sale">
            <label>Наем</label>
            <input type="radio" name="RadioBtnVrForm" value="Apartment">
            <label>Замяна</label>
            <input type="radio" name="RadioBtnVrForm" value="Replace">
        </div>
      
        <label for="TypeApartment-VrForm">Вид на имота *</label>
        <div>
            <select name="TypeApartment-VrForm" id="">
                <option value="All-VrForm">Всички</option>
                <option value="OneRoom-VrForm">Едностаен</option>
                <option value="TwoRooms-VrForm">Двустаен</option>
                <option value="ThreeRooms-VrForm">Тристаен</option>
                <option value="ManyRooms-VrForm">Многостаен</option>
                <option value="Penthouse-VrForm">Мезонет</option>
                <option value="House-VrForm">Къща</option>
                <option value="ParkingSpace-VrForm">Паркомясто</option>
                <option value="Basement-VrForm">Мазе</option>
                <option value="Studio-VrForm">Ателие</option>
                <option value="Shop-VrForm">Магазин</option>
            </select>
        </div>
        
        <label for="Location-VrForm">Адрес на имота *</label>
        <input type="text" name="Location-VrForm">
        
        <label for="property-floor-VrForm">Етаж на апартамента *</label>
        <input type="text" name="property-floor-VrForm">
        
        <label for="area-common-parts-VrForm">Площ с общи части *</label>
        <input type="text" name="area-common-parts-VrForm">
        
        <label for="area-none-common-parts-VrForm">Площ без общи части *</label>
        <input type="text" name="area-none-common-parts-VrForm">

        <label for="price-VrForm">Цена/кв.м.*</label>
        <input type="text" name="price-VrForm">

        <label for="year-construction-VrForm">Година на строеж</label>
        <input type="text" name="year-construction-VrForm">
        
        <label for="building-size-VrForm">Етаж на сграда</label>
        <input type="text" name="building-size-VrForm">

        <label for="furniture-VrForm">Обзавеждане</label>
        <select name="furniture-VrForm">
            <option value="furnished-VrForm">Обзаведен</option>
            <option value="semi-furnished-VrForm">Полуобзаведен</option>
            <option value="unfurnished-VrForm">Необзаведен</option>
        </select>
        

        <label for="construction-VrForm">Вид Конструкция</label>
        <select name="construction-VrForm">
            <option value="none-construction-VrForm">Друго</option>
            <option value="panels-VrForm">Панел</option>
            <option value="semi-furnished-VrForm">Тухла</option>
        </select>
        

        <label for="heating-VrForm">Отопление</label>
        <select name="heating-VrForm" id="">
            <option value="none-heating-VrForm">Друго</option>
            <option value="gas-VrForm">Газ</option>
            <option value="electricity-furnished-VrForm">Електричество</option>
            <option value="district-heating-VrForm">Топлофикация</option>
            <option value="solar-panels-heating-VrForm">Соларни Панели</option>
        </select>
        
        
        <label for="Complex-VrForm">Допълнителна информация</label>
        <textarea name="more-info-VrForm"></textarea>

        <label for="Complex-VrForm">Затворен Комплекс</label>
        <input type="checkbox" name="Complex-VrForm" id="" value="Complex">

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