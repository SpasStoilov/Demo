import {render} from "./node_modules/lit-html/lit-html.js";
import {useTemplate} from "./templates.js";

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
    wall.addEventListener('click', onClick);
    
    function onClick (e) {
        e.preventDefault();
        console.log('C:>>> profile Handler: Event is Trigered...')
        profileBody.textContent = '';

        if (e.target.className === 'profileSettings'){
            console.log('C:>>> profile Handler: Profile Settings load...')
            let settingsHolder = document.createElement('div');
            settingsHolder.className = 'settingsHolder'
            settingsHolder.style.display = 'block';
            settingsHolder.style.backgroundColor = 'red'
            settingsHolder.style.width = '800px';
            settingsHolder.style.height = '600px';
            console.log(settingsHolder)
            profileBody.appendChild(settingsHolder);

        } else if (e.target.className === 'profileVrTours'){
            console.log('C:>>> profile Handler: Profile VrTours load...')
            let VrToursHolder = document.createElement('div');
            VrToursHolder.className = 'VrToursHolder'
            VrToursHolder.style.display = 'block';
            VrToursHolder.style.backgroundColor = 'blue'
            VrToursHolder.style.width = '800px';
            VrToursHolder.style.height = '600px';
            console.log(VrToursHolder)
            profileBody.appendChild(VrToursHolder);
        };
    }
}

// function profileSettings (ctx, next) {
//     onsole.log('C:>>> profileSettings Handler:')
//     console.log('C:>>> profileSettings Handler: CTX:', ctx)
//     console.log('C:>>> profileSettings Handler: Render profileTemp')
//     render(useTemplate.profileSettingsTemp(), wall);
// }
// function profileVrTours (ctx, next) {
//     onsole.log('C:>>> profileVrTours Handler:')
//     console.log('C:>>> profileVrTours Handler: CTX:', ctx)
//     console.log('C:>>> profileVrTours Handler: Render profileTemp')
//     render(useTemplate.profileVrToursTemp(), wall);
// }


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