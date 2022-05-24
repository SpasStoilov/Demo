const useBackService = require('./services.js');

// function logValidation(req, res, next) {
//     let {email, username, password} = req.body;
//     next();

// };

async function userExistInDataBase(req, res, next) {
    let {email, password} = req.body;
    const result = await useBackService.checkForUser(email, password); //return: obj/false
    res
    next();
};


module.exports = {
    // logValidation,
    userExistInDataBase,
}