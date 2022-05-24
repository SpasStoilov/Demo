const useBackService = require('./services.js');

// function logValidation(req, res, next) {
//     let {email, username, password} = req.body;
//     next();

// };

async function userExistInDataBase(req, res, next) {
    console.log('>>> Req LogIN Body (at: LocalMiddwares.js):', req.body)

    let {email, password} = req.body;
    const result = await useBackService.checkForUser(email, password); //return: UserObj/ErrorOBJ
    req.session.user = result;
    console.log('>>> Req User Session (at: LocalMiddwares.js):', req.session)
    next();
};


module.exports = {
    // logValidation,
    userExistInDataBase,
}