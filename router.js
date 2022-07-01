const useHandler = require("./handlers.js");
const {body} = require('express-validator');
const useLocalMiddlewere = require('./LocalMiddlewares.js');

// router:

function router (server){
    console.log('S:>>> Router acting...')

    server.delete("/user/vrs/delete", useHandler.deleteVrFormalForm)

    server.post(
        "/user/vruploads",
        useHandler.vrFormCreation
    );

    server.post(
        "/users/register",
        body('email').notEmpty().bail().isEmail().normalizeEmail().trim(),
        body('username').notEmpty().bail().isLength({min: 3}),
        body('password').notEmpty().bail().isLength({min: 1}),
        body('reppassword').notEmpty().bail().isLength({min: 1}),
        useLocalMiddlewere.userExistInDataBase,
        useHandler.register
    );
    
    server.put('/user/change', 
    body('email').notEmpty().bail().isEmail().normalizeEmail().trim(),
    body('username').notEmpty().bail().isLength({min: 3}),
    body('password').notEmpty().bail().isLength({min: 1}),
    // body('reppassword').notEmpty().bail().isLength({min: 1}),
    useLocalMiddlewere.verifyNewSettings,
    useHandler.settingsDataChange
    );

    server.post(
        "/users/login", 
        useLocalMiddlewere.userExistInDataBase,
        useHandler.logIn
    );

    server.get('/user/data', useHandler.extractingUserDataRegistration)
    server.get("/logout", useHandler.logout);
    server.get("/user/vrs", useHandler.getUserVrs)
    server.get("*", useHandler.home);
};

module.exports = router;