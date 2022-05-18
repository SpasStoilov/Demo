import page from "./node_modules/page/page.mjs";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.querySelector("#root");


const homeTemplate = () => html`<h1>HOME</h1>`;
// const aboutTemplate = () => html`<h1>2About</h1>`;

const registerTemplate = () => html`
<form>
    <label for="email">E-mail:</label>
    <input type="text" id="email" name="email" placeholder="Enter email"/>
    <label for="username">UserName:</label>
    <input type="text" id="username" name="username" placeholder="Enter name"/>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter password"/>
    <input type="submit" value="SendData">
</form>`;

const loginTemplate = () => html`
<form>
    <label for="username">UserName:</label>
    <input type="text" id="username" name="username" placeholder="Enter name"/>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter password"/>
    <input type="submit" value="Log">
</form>`;


const homeRender = (ctx, next) => {
    render(homeTemplate(), root);
};

const registerRender = (ctx, next) => {
    render(registerTemplate(), root);
};

const loginRender = (ctx, next) => {
    render(loginTemplate(), root);
};

const aboutRender = (ctx, next) => {
    render(aboutTemplate(), root);
};

page("/", homeRender);
page("/register", registerRender);
page("/login", loginRender);
page("/about", aboutRender);

page.start();