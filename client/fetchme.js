const baseURL = "http://localhost:3000";
import {useTemplate} from './templates.js';
import {render} from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

function sendRegisterData(bodyInfo) {

    fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyInfo)
    })
        .then(resp => resp.json())
        .then(result => {
            
            console.log('>>> Register result (at: fetchme):', result);
            const wall = document.querySelector(".wall");
            const responseErrors = result[0]; //: returns list if it has erros and obj if it not, or User exist in data base!
                
            if (!result.errmsg && responseErrors){
                useTemplate.errorHeaderResgister(result);
            } else if (!result.errmsg){
                let checkForErrorHeader = document.querySelector('.errorHeader');
                if (checkForErrorHeader){
                    wall.removeChild(checkForErrorHeader);
                }
                render(useTemplate.loginTemp(), wall);
            } else {
                console.log('>>> Registter Message (at: fetchme.js):', result.errmsg);
                render(useTemplate.loginTemp(), wall);
            };
        });
};


function sendLogInData(logInData){

    let {email, password} = Object.fromEntries(logInData);
    let logInBody = {
        'email': email,
        'password': password,
    };

    console.log('>>> Client Login Data (at: client/fetchme.js)', logInBody)

    fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(logInBody)
    })
        .then(resp => resp.json())
        .then(User => {
            console.log('>>> Login resp (at: client/fetchme):', User);
            console.log('>>>:', (!User.errmsg));
            if (!User.errmsg) {
                page.redirect('/');
            } else {
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