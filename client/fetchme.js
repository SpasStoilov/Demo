const baseURL = "http://localhost:3000";
import {useTemplate} from './templates.js';
import {render} from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

function sendRegisterData(bodyInfo) {
    console.log('C:>>> Fetch sendRegisterData acting...')

    fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyInfo)
    })
        .then(resp => resp.json())
        .then(result => {
            
            console.log('C:>>> Fetch sendRegisterData: Response:', result);
            const wall = document.querySelector(".wall");
            const responseErrors = result[0]; //: returns list if it has erros and obj if it not, or User exist in data base!
                
            if (!result.errmsg && responseErrors){
                console.log('C:>>> Fetch sendRegisterData: Some Errors found...')
                useTemplate.errorHeaderResgister(result);
            } else if (!result.errmsg){
                console.log('C:>>> Fetch sendRegisterData: No Errors found...')
                console.log('C:>>> Fetch sendRegisterData: checkForErrorHeader?')
                let checkForErrorHeader = document.querySelector('.errorHeader');

                if (checkForErrorHeader){
                    console.log('C:>>> Fetch sendRegisterData: Result: Found')
                    console.log('C:>>> Fetch sendRegisterData: Act: Remove')
                    wall.removeChild(checkForErrorHeader);
                }

                console.log('C:>>> Fetch sendRegisterData: Redirect to: loginTemp')
                page.redirect('/login');
                // render(useTemplate.loginTemp(), wall);

            } else {
                console.log('C:>>> Fetch sendRegisterData: Registter Message:', result.errmsg);
                console.log('C:>>> Fetch sendRegisterData: Redirect to: loginTemp')
                page.redirect('/login');
                // render(useTemplate.loginTemp(), wall);
            };
        });
};


function sendLogInData(logInData){
    console.log('C:>>> Fetch sendLogInData acting...')

    let {email, password} = Object.fromEntries(logInData);
    let logInBody = {
        'email': email,
        'password': password,
    };

    console.log('C:>>> Fetch sendLogInData: Client Login Data:', logInBody)

    fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(logInBody)
    })
        .then(resp => resp.json())
        .then(User => {
            console.log('C:>>> Fetch sendLogInData: Response User:', User);
            console.log('C:>>> Fetch sendLogInData: User ERROR message?', (!User.errmsg));

            if (!User.errmsg) {
                
                console.log('C:>>> Fetch sendLogInData: Successesfull Login!')
                
                let navBarOptions = document.querySelector('.navOptions');
                navBarOptions.textContent = '';

                let newBarOptions = {
                    navhome: [document.createElement("a"), '/', 'Начало'],
                    navProfile: [document.createElement("a"), '/profile', 'Профил'],
                    navLogOut:[ document.createElement("a"), '/logout', 'Излез'],
                };

                for (let [classNameEl, value] of Object.entries(newBarOptions)) {
                    console.log(classNameEl, value[0])
                    let element = value[0];
                    element.textContent = value[2]
                    let elhref = value[1];
                    element.className = classNameEl;
                    element.href = elhref;
                    navBarOptions.appendChild(element)
                };

                console.log('C:>>> Fetch sendLogInData: Regirect to /')
                page.redirect('/');
                
            } else {
                console.log('C:>>> Fetch sendLogInData: Problem with Login!')
                console.log('C:>>> Fetch sendLogInData: Loading Error Headers...')

                let wall = document.querySelector('.wall');
                let LogErrMsg = document.querySelector('.LogInErrHead');
                let Msg = document.createElement('p');
                Msg.className = 'PphLogMsgHead';

                if (LogErrMsg){
                    LogErrMsg.textContent = '';
                } else {
                    LogErrMsg = document.createElement('div');
                    LogErrMsg.className = 'LogInErrHead';
                };
                
                Msg.textContent = User.errmsg;
                LogErrMsg.appendChild(Msg);
                wall.prepend(LogErrMsg);
            };
        });
};



export const fetchME = {
    sendRegisterData,
    sendLogInData,
}