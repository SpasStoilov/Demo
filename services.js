const UserModel = require("./Models/users.js");
const useBackValidator = require('./validations.js');
const bcrypt = require('bcrypt');


async function hashPassword (pass) {
    const salt = 8;
    const hashed = await bcrypt.hash(pass, salt);
    return hashed;
};

async function comparePasswords (pass, hash) {
    const result = await bcrypt.compare(pass, hash);
    return result;
};


async function checkForUser (email, logPassword) {
    let foundUser;

    try {
        foundUser = await UserModel.findOne({
            email
        });
        console.log('>>> User Found (at: services.js):', foundUser);
        await comparePasswords(logPassword, foundUser.password)

    } catch (err) {
        console.log('>>> Find User Error (at: services.js):', err.message);
        foundUser = false;
    };

    return foundUser;
};


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
    userCreation,
    checkForUser
};