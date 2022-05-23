import page from "./node_modules/page/page.mjs";
import {useHandlerFor} from "./handlers.js";

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}

// Global Middleware:

function fetchRegister (ctx, next){
    if (JSON.stringify(ctx.params) != '{}'){
        console.log('>>>CTX.params:', ctx.params);
    };
    next();
};


// Router:
page("/", useHandlerFor.home);
page("/register/", useHandlerFor.register);
page("/login", useHandlerFor.login);
page("/about", useHandlerFor.about);

page.start();