const useHandler = require("./handlers.js");
const {body} = require('express-validator');
const { home } = require("./handlers.js");


// router:

function router (server){
    server.get("*", useHandler.home);
};

module.exports = router;