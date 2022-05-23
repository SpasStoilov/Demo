const baseURL = "http://localhost:3000";
import {useTemplate} from './templates.js';
import {render} from "./node_modules/lit-html/lit-html.js";

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
            console.log(result)
            if (result[0]){
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



export const fetchME = {
    sendRegisterData
}