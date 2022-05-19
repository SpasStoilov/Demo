import { html } from "./node_modules/lit-html/lit-html.js";


// Templates:
const home = () => html`<h1>HOME</h1>`;

const about = () => html`<h1>2About</h1>`;

const register = () => html`
<form>
    <label for="email">E-mail:</label><br>
    <input type="text" id="email" name="email" placeholder="Enter email"/><br>
    <label for="username">UserName:</label><br>
    <input type="text" id="username" name="username" placeholder="Enter name"/><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" placeholder="Enter password"/><br>
    <label for="reppassword">Repeat Password:</label><br>
    <input type="password" id="reppassword" name="reppassword" placeholder="Enter"/><br>
    <input type="submit" value="SendData"><br>
</form>
`;

const login = () => html`
<form>
    <label for="username">UserName:</label><br>
    <input type="text" id="username" name="username" placeholder="Enter name"/><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" placeholder="Enter password"/><br>
    <input type="submit" value="Log"><br>
</form>
`;

// Register:
export const useTeplate = {
    login,
    register,
    about,
    home,
}