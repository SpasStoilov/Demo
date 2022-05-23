const UserModel = require("./Models/users.js");
const useBackValidator = require('./validations.js');
const bcrypt = require('bcrypt');


async function hashPassword (pass) {
    const salt = 8;
    const hashed = await bcrypt.hash(pass, salt);
    return hashed;
}


async function userCreation (email, username, password) {
    let hashedPass = ''; 
    try {
        hashedPass = await hashPassword(password);
    } catch (err) {
        console.log('>>> userCrations Error (services.js):', err.message);
    }

    console.log('>>> Hashed pass:', hashedPass);
    
    const userInstance = new UserModel({
        email,
        username,
        password: hashedPass
    });

    return useBackValidator.validateCreation(userInstance);
}


//------ Service Registrations ----:
module.exports = {
    userCreation
};