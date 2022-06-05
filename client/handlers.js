import {render} from "./node_modules/lit-html/lit-html.js";
import {useTemplate} from "./templates.js";
import {useService} from "./services.js"

// DOM selections:
let wall = document.querySelector(".wall");


// Handlers/Render:
const home = (ctx, next) => {
    console.log('C:>>> Home Handler:')
    console.log('C:>>> Home Handler: CTX:', ctx)
    console.log('C:>>> Home Handler: Render homeTemp')
    render(useTemplate.homeTemp(), wall);
};

const register = (ctx, next) => {
    console.log('C:>>> Register Handler:')
    console.log('C:>>> Register Handler: CTX:', ctx)
    console.log('C:>>> Register Handler: Render registerTemp')
    render(useTemplate.registerTemp(), wall);
};

const login = (ctx, next) => {
    console.log('C:>>> LogIN Handler:')
    console.log('C:>>> LogIN Handler: CTX:', ctx)
    console.log('C:>>> LogIN Handler: Render loginTemp')
    render(useTemplate.loginTemp(), wall);
};

const about = (ctx, next) => {
    console.log('C:>>> About Handler:')
    console.log('C:>>> About Handler: CTX:', ctx)
    console.log('C:>>> About Handler: Render aboutTemp')
    render(useTemplate.aboutTemp(), wall);
};

function welcome (ctx, next) {
    location.replace("/");
};

function profile (ctx, next) {
    console.log('C:>>> profile Handler:')
    console.log('C:>>> profile Handler: CTX:', ctx)
    console.log('C:>>> profile Handler: Render profileTemp')
    render(useTemplate.profileTemp(), wall);

    console.log('C:>>> profile Handler: Adding Events...')

    let profileBody = document.querySelector('.profileBody');
    let profileBar = document.querySelector('.profileBar');
    profileBar.addEventListener('click', onClick);

    profileBody.appendChild(useTemplate.profileSettingsTemp());
    
    function onClick (e) {
        e.preventDefault();
        console.log('C:>>> profile Handler: Event is Trigered...')

        if (e.target.className === 'profileSettings'){
            profileBody.textContent = '';
            profileBody.appendChild(useTemplate.profileSettingsTemp());

        } else if (e.target.className === 'profileVrTours'){
            profileBody.textContent = '';
            profileBody.appendChild(useTemplate.profileVrToursTemp());
        };
    }
}

export const useHandlerFor = {
    home,
    about,
    register,
    login,
    welcome,
    profile,
    // profileSettings,
    // profileVrTours
};