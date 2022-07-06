import page from "./node_modules/page/page.mjs";
import {useHandlerFor} from "./handlers.js";
import { useGlobalMiddleware } from "./globalmiddleware.js";

// Global Middleware:
console.log('C:>>> Global Middleware acting...')
page(useGlobalMiddleware.cleanWallfromErrors);
page(useGlobalMiddleware.addEventSubmitOnFilterForm);

// Router:
console.log('C:>>> Router acting...')

page("/", useHandlerFor.home);
page("/register", useHandlerFor.register);
page("/login", useHandlerFor.login);
page("/about", useHandlerFor.about);
page("/profile", useHandlerFor.profile);
page("/welcome", useHandlerFor.welcome);

page.start();