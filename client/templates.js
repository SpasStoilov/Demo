import {html} from "./node_modules/lit-html/lit-html.js";
import { useService } from "./services.js";


const errorHeaderResgister = (result) => {

    const errorMessages = result.errors.map(el => `${el.param} : ${el.msg}`);

    let resultErrors = '';
    errorMessages.forEach(element => resultErrors +=`<h1>${element}</h1>`);
    resultErrors = `<div class="errorHeader">${resultErrors}</div>`;

    let fragErrors = document.createRange().createContextualFragment(resultErrors);
    const wall = document.querySelector('.wall');
    let checkForErrorHeader = document.querySelector('.errorHeader');

    if (checkForErrorHeader){
        wall.removeChild(checkForErrorHeader)
    }
    wall.prepend(fragErrors)
};


const homeTemp = () => html`<h1>HOME</h1>`;



const aboutTemp = () => html`<h1>2About</h1>`;


const registerTemp = () => html`
<form class="registerForm" @submit=${useService.sendRegisterInf}>
    <label for="email">E-mail:</label><br>
    <input type="text" id="email" name="email" placeholder="Enter email"/><br>
    <label for="username">UserName:</label><br>
    <input type="text" id="username" name="username" placeholder="Enter name"/><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" placeholder="Enter password"/><br>
    <label for="reppassword">Repeat Password:</label><br>
    <input type="password" id="reppassword" name="reppassword" placeholder="Enter"/><br>
    <input type="submit" value="SendData"><br>
</form>`;



const loginTemp = () => html`
<form>
    <label for="username">UserName:</label><br>
    <input type="text" id="username" name="username" placeholder="Enter name"/><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" placeholder="Enter password"/><br>
    <input type="submit" value="Log"><br>
</form>`;



export const useTemplate = {
    homeTemp,
    loginTemp,
    registerTemp,
    aboutTemp,
    errorHeaderResgister
};