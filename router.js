const useHandler = require("./handlers.js");
const {body} = require('express-validator');


// router:

function router (server){

    server.post(
        "/users",
        body('email').notEmpty().bail().isEmail(),
        body('username').notEmpty().bail().isLength({min: 3}),
        body('password').notEmpty().bail().isLength({min: 8}),
        useHandler.register
    );


    server.get("*", useHandler.home);
};

module.exports = router;