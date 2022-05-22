import page from "./node_modules/page/page.mjs";
const baseURL = "http://localhost:3000"


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
            const errorMessage = result.errors.map(el => `${el.param} : ${el.msg}`);
            console.log(errorMessage)
            const wall = document.querySelector('.wall');
            let errorHeader = document.querySelector('.errorHeader')

            if (errorHeader){
                errorHeader.textContent = '';
            } else {
                errorHeader = document.createElement('div');
                errorHeader.className = "errorHeader"
                wall.prepend(errorHeader);
            }

            const listerrors = document.createElement('ul');
            errorHeader.appendChild(listerrors);
            errorHeader.style.backgroundColor = "red";
           
            errorMessage.forEach(msg => {
                let li = document.createElement('li')
                li.textContent = msg;
                listerrors.appendChild(li);
            });

        });
};



export const fetchME = {
    sendRegisterData
}