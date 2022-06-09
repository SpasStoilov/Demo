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

function profileVrToursTemp(){
    console.log('C:>>> profileVrToursTemp load...')

    let VrToursHolder = document.createElement('div');
    VrToursHolder.className = 'VrToursHolder'
    VrToursHolder.style.display = 'block';
    VrToursHolder.style.backgroundColor = 'white'
    VrToursHolder.style.width = '800px';
    VrToursHolder.style.height = '600px';
    console.log(VrToursHolder)
    return VrToursHolder
};

export const useTemplate = {
    homeTemp,
    loginTemp,
    registerTemp,
    aboutTemp,
    profileTemp,
    profileSettingsTemp,
    profileVrToursTemp,
};