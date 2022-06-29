import page from "./node_modules/page/page.mjs";
import {useHandlerFor} from "./handlers.js";
import { useGlobalMiddleware } from "./globalmiddleware.js";
// import Marzipano from "marzipano/dist/marzipano.js";

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
};

// Global Middleware:
console.log('C:>>> Global Middleware acting...')
page(useGlobalMiddleware.cleanWallfromErrors);


// Router:
console.log('C:>>> Router acting...')

page("/", useHandlerFor.home);
page("/register", useHandlerFor.register);
page("/login", useHandlerFor.login);
page("/about", useHandlerFor.about);
page("/profile", useHandlerFor.profile);
page("/welcome", useHandlerFor.welcome);

page.start();