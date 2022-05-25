import {render} from "./node_modules/lit-html/lit-html.js";
import {useTemplate} from "./templates.js";

// DOM selections:
let wall = document.querySelector(".wall");


// Handlers/Render:
const home = (ctx, next) => {
    render(useTemplate.homeTemp(), wall);
};

const register = (ctx, next) => {
    render(useTemplate.registerTemp(), wall);
    // let emailInput = document.querySelector("input[name=email]");
    // console.log(emailInput)
    // emailInput.style.borderRadius = "5px";
};

const login = (ctx, next) => {
    render(useTemplate.loginTemp(), wall);
};

const about = (ctx, next) => {
    render(useTemplate.aboutTemp(), wall);
};


export const useHandlerFor = {
    home,
    about,
    register,
    login
};