const baseURL = "http://localhost:3000";
import {useTemplate} from './templates.js';
import {render} from "./node_modules/lit-html/lit-html.js";

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
            
            // returns list if it has erros and obj if it not!
            const responseErrors = result[0];
            
            if (responseErrors){
                useTemplate.errorHeaderResgister(result);
            } else {
                const wall = document.querySelector(".wall");
                let checkForErrorHeader = document.querySelector('.errorHeader');
                if (checkForErrorHeader){
                    wall.removeChild(checkForErrorHeader);
                }
                render(useTemplate.loginTemp(), wall);
            }
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
        .then(resp => resp.text())
        .then(result => console.log('>>> Login resp (at: client/fetchme):', result))
};



export const fetchME = {
    sendRegisterData,
    sendLogInData,
}