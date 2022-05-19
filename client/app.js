import page from "./node_modules/page/page.mjs";
// import { clientRouter } from "./router.js";
import { useHandler } from "./handlers";

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}

// Router:
// clientRouter(page);

page("/", useHandler.home);
page("/register", useHandler.register);
page("/login", useHandler.login);
page("/about", useHandler.about);

page.start();