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
            console.log('>>>Register result:', result);
            
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
    fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(logInData)
    })
        .then(resp => resp.json())
        .then(result => console.log('>>> Login resp:', result))
        .catch(err => console.log('>>> Login resp Error:', err))
};



export const fetchME = {
    sendRegisterData,
    sendLogInData,
}