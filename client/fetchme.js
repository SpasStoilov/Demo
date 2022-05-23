const baseURL = "http://localhost:3000";
import {useTemplate} from './templates.js';


function sendRegisterData(bodyInfo) {

    fetch(`${baseURL}/users`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyInfo)
    })
        .then(resp => resp.json())
        .then(result => {
            useTemplate.errorHeaderResgister(result);
        });
};



export const fetchME = {
    sendRegisterData
}