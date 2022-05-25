import page from "./node_modules/page/page.mjs";
import {useHandlerFor} from "./handlers.js";

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}

// Global Middleware:
function cleanWall(ctx, next){
    let wall = document.querySelector('.wall');
    let errHead = document.querySelector('.errorHeader');
    if (errHead) {
        wall.removeChild(errHead);
    }
    next();
};

page(cleanWall);


// Router:
page("/", useHandlerFor.home);
page("/register/", useHandlerFor.register);
page("/login", useHandlerFor.login);
page("/about", useHandlerFor.about);

page.start();