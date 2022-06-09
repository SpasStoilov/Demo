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
    profileBody.textContent = '';

    let settingBTN = document.querySelector('.profileSettings')
    let vrBTN = document.querySelector('.profileVrTours')

    let profileBar = document.querySelector('.profileBar');

    profileBar.addEventListener('click', onClick);
    profileBody.appendChild(useTemplate.profileSettingsTemp());
    
    function onClick (e) {
        e.preventDefault();
        console.log('C:>>> profile Handler: Event is Trigered...')
        profileBody.textContent = '';

        if (e.target.className === 'profileSettings'){
           
            // some setup:
            e.target.style.backgroundColor = '#48b664';
            vrBTN.style.backgroundColor = '#cacaca';
            
            // render:
            profileBody.appendChild(useTemplate.profileSettingsTemp());

        } else if (e.target.className === 'profileVrTours'){

            console.log('Enter VR tours!!!')
            // some setup:
            e.target.style.backgroundColor = '#48b664';
            settingBTN.style.backgroundColor = '#cacaca';
          
            // render:
            let frag = document.createRange().createContextualFragment(useTemplate.profileVrToursTemp())
            profileBody.appendChild(frag)

            // selections:
            const btnCreatVr = document.querySelector('.creatVr');
            const VrToursHolderBody = document.querySelector('.VrToursHolder');
            const userVrToursList = document.querySelector('.userVrToursList');

            btnCreatVr.addEventListener('click', onClickCreatVr)
            function onClickCreatVr (e) {

                // here we must fetch all User Vr's and apended in '.userVrToursList !!! //

                let vrFormFragment;

                if (e.target.textContent === 'Създай Обява') {

                    e.target.textContent = 'Запази';
                    vrFormFragment = document.createRange().createContextualFragment(useTemplate.vrFormTemplate())
                    VrToursHolderBody.prepend(vrFormFragment)

                } else if (e.target.textContent === 'Запази'){

                // here we must save the new Vr in data base !!! //

                    e.target.textContent = 'Създай Обява';
                    const li = document.createElement('li');
                    vrFormFragment = document.querySelector('.vrForm');
                    li.appendChild(vrFormFragment);
                    userVrToursList.prepend(li);
                };

            };

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
};