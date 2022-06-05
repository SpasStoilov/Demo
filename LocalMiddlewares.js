const useBackService = require('./services.js');

// function logValidation(req, res, next) {
//     let {email, username, password} = req.body;
//     next();

// };

async function userExistInDataBase(req, res, next) {
    console.log('S:>>> LocalMiddlewares acting...')
    console.log('S:>>> LocalMiddlewares:userExistInDataBase: Req Body:', req.body)

    let {email, password} = req.body;

    console.log('S:>>> LocalMiddlewares: userExistInDataBase: Check for User');
    const result = await useBackService.checkForUser(email, password); //return: UserObj/ErrorOBJ

    console.log('S:>>> LocalMiddlewares: userExistInDataBase: Save found result in req.session.user');
    req.session.user = result;
    console.log('S:>>> LocalMiddlewares: userExistInDataBase: Display Session:', req.session)
    console.log('S:>>> LocalMiddlewares: userExistInDataBase: NEXT()...')
    next();
};

//new

async function verifyNewSettings (req, res, next){
    console.log('S:>>> LocalMiddlewares: verifyNewSettings acting...')
    console.log('S:>>> LocalMiddlewares: verifyNewSettings: userExistInDataBase: Req Body:', req.body)
    let {email, password} = req.body;

    console.log('S:>>> LocalMiddlewares: verifyNewSettings: Check for User');
    const result = await useBackService.checkForUser(email, password); //return: User Obj / {errmsg: '...'}
    req.chekUserExist = result
    next()
}

module.exports = {
    userExistInDataBase,
    verifyNewSettings

}