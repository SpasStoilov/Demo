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
    console.log('S:>>> Service checkForUser acting...');
    console.log('S:>>> Service checkForUser: Chek in UserModel for User?');

    let foundUser = await UserModel.findOne({email: email});
    console.log('S:>>> Service checkForUser: Result:', foundUser);

    if (!foundUser) {
        foundUser = {errmsg: 'Wrong Email!'};
        console.log('S:>>> Service checkForUser: Message:', foundUser.errmsg);
    };
    
    if (JSON.stringify(foundUser) !== JSON.stringify({errmsg: 'Wrong Email!'})){
        if (logPassword !== foundUser.password){
            foundUser = {errmsg: 'Wrong password!'};
            console.log('>>> S:>>> Service checkForUser: ERROR:', foundUser.errmsg);
        };
    };
    
    console.log('S:>>> Service checkForUser: Return foundUser!');
    return foundUser;
};


async function userCreation (email, username, password) {
    console.log('S:>>> Service userCreation acting...');

    console.log('S:>>> Service userCreation: Creating userInstance form UserModel!');
    const userInstance = new UserModel({
        email,
        username,
        password
    });

    console.log('S:>>> Service userCreation: Return Validations Creation Report');
    return useBackValidator.validateCreation(userInstance);
}


//------ Service Registrations ----:
module.exports = {
    userCreation,
    checkForUser
};