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
        .then(result => page.redirect("/login"))
        .catch(err => console.log(err));
};



export const fetchME = {
    sendRegisterData
}