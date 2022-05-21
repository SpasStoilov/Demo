import {fetchME} from './fetchme.js';


function sendRegisterInf(e){
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let {email, username, password, reppassword} = Object.fromEntries(formData);

    let bodyInfo = {
        'email': email,
        'username': username,
        'password': password,
    };

    if (password != reppassword) {
        let repasswordEL = document.querySelector('input[name=reppassword]');
        repasswordEL.style.borderColor = "red"
        alert("Passwords do not match!")
    } else {
        fetchME.sendRegisterData(bodyInfo);
    };
};



export const useService = {
    sendRegisterInf
}