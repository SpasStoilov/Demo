import { render } from "./node_modules/lit-html/lit-html.js";
import { useTeplate } from "./templates.js";

// DOM selections:
const wall = document.querySelector(".wall");



// Handlers/Render:
const home = (ctx, next) => {
    render(useTeplate.home(), wall);
};

const register = (ctx, next) => {
    render(useTeplate.register(), wall);
};

const login = (ctx, next) => {
    render(useTeplate.login(), wall);
};

const about = (ctx, next) => {
    render(useTeplate.about(), wall);
};


// Register:
export const useHandler = {
    home,
    register,
    login,
    about
};