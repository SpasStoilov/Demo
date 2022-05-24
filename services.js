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
    let foundUser = await UserModel.findOne({email: email});

    if (!foundUser) {
        foundUser = {errmsg: 'Wrong Email!'};
        console.log('>>> ERROR (at: services.js):', foundUser.errmsg);
    };
    
    console.log('>>> User BEFORE PASS (at: services.js):', foundUser);

    if (JSON.stringify(foundUser) !== JSON.stringify({errmsg: 'Wrong Email!'})){
        if (logPassword !== foundUser.password){
            foundUser = {errmsg: 'Wrong password!'};
            console.log('>>> ERROR (at: services.js):', foundUser.errmsg);
        };
    };

    return foundUser;
};


async function userCreation (email, username, password) {
    const userInstance = new UserModel({
        email,
        username,
        password
    });

    return useBackValidator.validateCreation(userInstance);
}


//------ Service Registrations ----:
module.exports = {
    userCreation,
    checkForUser
};