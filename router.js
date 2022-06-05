const useHandler = require("./handlers.js");
const {body} = require('express-validator');
const useLocalMiddlewere = require('./LocalMiddlewares.js');

// router:

function router (server){
    console.log('S:>>> Router acting...')

    server.post(
        "/users/register",
        body('email').notEmpty().bail().isEmail().normalizeEmail().trim(),
        body('username').notEmpty().bail().isLength({min: 3}),
        body('password').notEmpty().bail().isLength({min: 1}),
        body('reppassword').notEmpty().bail().isLength({min: 1}),
        useLocalMiddlewere.userExistInDataBase,
        useHandler.register
    );
    
    //neww
    server.post('/user/change', 
    body('email').notEmpty().bail().isEmail().normalizeEmail().trim(),
    body('username').notEmpty().bail().isLength({min: 3}),
    body('password').notEmpty().bail().isLength({min: 1}),
    body('reppassword').notEmpty().bail().isLength({min: 1}),
    useLocalMiddlewere.userExistInDataBase,
    useHandler.settingsDataChange
    );

    server.post(
        "/users/login", 
        useLocalMiddlewere.userExistInDataBase,
        useHandler.logIn
    );

    server.get('/user/data', useHandler.extractingUserDataRegistration)
    server.get("/logout", useHandler.logout);
    server.get("*", useHandler.home);
};

module.exports = router;