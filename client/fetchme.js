const baseURL = "http://localhost:3000";
import page from "./node_modules/page/page.mjs";

function sendRegisterData(bodyInfo) {
    console.log('C:>>> Fetch sendRegisterData acting...')
    bodyInfo['flag'] = 'register';

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
            let spanError = document.querySelector('.spanErrorRegister');

            //result: returns list if it has erros and obj if it not, or User exist in data base!
                
            if (!result.errmsg && result[0]){
                console.log('C:>>> Fetch sendRegisterData: Some Errors found...')
                spanError.style.display = 'block'

                for (let el of result) {
                    let li = document.createElement('li')
                    li.textContent = `${el.param} : ${el.msg}`
                    spanError.appendChild(li)
                };

            } else if (result.errmsg){
                console.log('C:>>> Fetch sendRegisterData: Pass Dont match!')
                spanError.style.display = 'block'
                let li = document.createElement('li')
                li.textContent = `Error: ${result.errmsg}`
                spanError.appendChild(li)
                
            } else {
                console.log('C:>>> Fetch sendRegisterData: Registter Message:', result.errmsg);
                console.log('C:>>> Fetch sendRegisterData: No Errors found...')
                console.log('C:>>> Fetch sendRegisterData: Redirect to: loginTemp')
                page.redirect('/login');
            };

        });
};


function sendLogInData(logInData){
    console.log('C:>>> Fetch sendLogInData acting...')
    let LogErrMsg = document.querySelector('.LogInErrHead');
    LogErrMsg.textContent = "";
    LogErrMsg.style.display = 'none';

    let {email, password} = Object.fromEntries(logInData);
    let logInBody = {
        'email': email,
        'password': password,
        'flag': 'login'
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
                console.log('C:>>> Fetch sendLogInData: Regirect to /welcome')
                page.redirect('/welcome');
            } else {
                console.log('C:>>> Fetch sendLogInData: Problem with Login!')
                console.log('C:>>> Fetch sendLogInData: Loading Error Headers...')
                LogErrMsg.textContent = User.errmsg;
                LogErrMsg.style.display = 'block';
            };
        });
};

function userDataRegistrations() {
    console.log('C:>>> fetchME userDataRegistrations...')
    return fetch(`${baseURL}/user/data`);
};


function sendSettingsData(bodyInfo) {

    console.log('C:>>> fetchME -> sendSettingsData...: ', bodyInfo)

    return fetch(`${baseURL}/user/change`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(bodyInfo)
    });
};


function sendVrFormCreationDATA(vrFormCreationDATA, flag=false){
    console.log('C:>>> fetchME -> sendVrFormCreationDATA...: ', vrFormCreationDATA)
    
    if (!flag){
        return fetch(`${baseURL}/user/vruploads`, {
            method: "POST",
            body: vrFormCreationDATA
        })
    };

    return fetch(`${baseURL}/user/vruploads/edit`, {
        method: "PUT",
        body: vrFormCreationDATA
    });
}

function userVrs() {
    return fetch(`${baseURL}/user/vrs`)
}

function deleteVrFormalForm (idToDelete) {
    return fetch(`${baseURL}/user/vrs/delete`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({'_id': idToDelete})
    });
};

function getAllUsersVrs(){
    console.log('C:>>>FetchMe -> getAllUsersVrs acting...')
    return fetch(`${baseURL}/allvrs`)
}

function getFilteredVrs (filterData) {
    console.log('C:>>> FetchMe -> getFilteredVrs acting...')

    return fetch(`${baseURL}/allvrs/filtered`, {
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify(filterData)
    });
}

export const fetchME = {
    sendRegisterData,
    sendLogInData,
    userDataRegistrations,
    sendSettingsData,
    sendVrFormCreationDATA,
    userVrs,
    deleteVrFormalForm,
    getAllUsersVrs,
    getFilteredVrs
}