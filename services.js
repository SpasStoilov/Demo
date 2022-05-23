const UserModel = require("./Models/users.js");
const useBackValidator = require('./validations.js');


async function userCreation (email, username, password) {

    const userInstance = new UserModel({
        email,
        username,
        password
    });

    return useBackValidator.validateCreation(userInstance);
}


module.exports = {
    userCreation
};