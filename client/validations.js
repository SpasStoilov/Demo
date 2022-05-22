function register(formData){
    
    let {email, username, password, reppassword} = Object.fromEntries(formData);
    let bodyInfo = {
        'email': email,
        'username': username,
        'password': password,
        'reppassword': reppassword
    };

    let message = "ok";
    let value = true;
    // const validateEmail = (email) => {
    //     return email.match(
    //       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     );
    // };

    // const bodyNotEmpty = Object.values(bodyInfo).every(value => value);
    // if (!bodyNotEmpty) {
    //     message = "Fields Must Not be empty!";
    // } else if (!validateEmail(email)) {
    //     message = "Email is Not Valid!";
    // } else if (username.length < 3) {
    //     message = "Username is too short!";
    // } else if (password.length < 2) {
    //     message = "Password is too short!";
    // } else if (password != reppassword) {
    //     const reppasswordField = document.querySelector('input[name=reppassword]');
    //     reppasswordField.style.borderColor = "red";
    //     message = "Passwords do not match!";
    // }

    // if (message != "ok"){
    //     value = false;
    // };

    return {value, message, bodyInfo}
};


export const useValidator = {
    register
}