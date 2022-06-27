const useBackService = require('./services.js');


async function userExistInDataBase(req, res, next) {
    console.log('S:>>> LocalMiddlewares acting...')
    console.log('S:>>> LocalMiddlewares:userExistInDataBase: Req Body:', req.body)
    let result;
    let flag = req.body.flag
    delete req.body.flag

    if (flag === 'register'){

        let {email, password, reppassword} = req.body;

        console.log('S:>>> LocalMiddlewares: userExistInDataBase: Check for User');
        result = await useBackService.checkForUser(email); //return: UserObj/ErrorOBJ

        if (result.hasOwnProperty('errmsg') && reppassword !== password) {
            result = {errmsg: 'Passwords do not match!'}
            console.log('S:>>> LocalMiddlewares: userExistInDataBase: ', result.errmsg);
        }

    } else if (flag === 'login'){
        let {email, password} = req.body;
        console.log('S:>>> LocalMiddlewares: userExistInDataBase: Check for User');
        result = await useBackService.checkForUser(email, password, flag); //return: UserObj/ErrorOBJ
    }

    req.session.user = result;
    console.log('S:>>> LocalMiddlewares: userExistInDataBase: Display Session:', req.session)
    console.log('S:>>> LocalMiddlewares: userExistInDataBase: NEXT()...')

    next();
};


async function verifyNewSettings (req, res, next){
    console.log('S:>>> LocalMiddlewares: verifyNewSettings acting...')
    console.log('S:>>> LocalMiddlewares: verifyNewSettings: userExistInDataBase: Req Body:', req.body)
    
    let {email} = req.body;
    let result;

    if (req.body.email !== req.session.user.email) {
        console.log('S:>>> LocalMiddlewares: verifyNewSettings: Check for User');
        result = await useBackService.checkForUser(email); //return: User Obj / {errmsg: '...'}
        req.chekUserExist = result
    } else {
        req.chekUserExist = {errmsg: 'Wrong password!'}
    }
    next()
}



module.exports = {
    userExistInDataBase,
    verifyNewSettings,
}