const baseURL = "http://localhost:3030/"


function sendRegisterData(bodyInfo) {
    fetch(`${baseURL}/users`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyInfo)
    })
        .then(resp => resp.json())
        .then(result => console.log(result))
        .catch(err => console.log(err));
};



export const fetchME = {
    sendRegisterData
}