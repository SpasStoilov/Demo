const useHandler = require("./handlers.js");
const {body} = require('express-validator');
const useLocalMiddlewere = require('./LocalMiddlewares.js');

// router:

function router (server){

    server.post(
        "/users/register",
        body('email').notEmpty().bail().isEmail().normalizeEmail().trim(),
        body('username').notEmpty().bail().isLength({min: 3}),
        body('password').notEmpty().bail().isLength({min: 1}),
        useLocalMiddlewere.userExistInDataBase,
        useHandler.register
    );

    server.post(
        "/users/login", 
        useLocalMiddlewere.userExistInDataBase,
        useHandler.logIn
    );

    server.get("*", useHandler.home);
};

module.exports = router;