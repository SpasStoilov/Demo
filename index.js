// Startig DATAbase Conections:
const starDataBase = require("./dataBaseConfig.js");
starDataBase();


// SERVER:
const express = require("express");
const server = express();
server.listen(3000, () => console.log("Express working on port  3000"));


// tamplate engine register/config:
const hbs = require('express-handlebars');
server.engine('.hbs', hbs.engine({
    extname: '.hbs',
}));


// Global middlewares:
const GlobalMidllewares = require("./GlobalMiddlewares.js");
GlobalMidllewares(server, express);


// Rounter:
const router = require("./router.js");
router(server);