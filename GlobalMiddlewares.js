const esepressSession = require('express-session');


function GlobalMidllewares(server, express) {

    // --------- middlewere settings -------------:

    const expressSessionConfig = {
        secret: "someKey",
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    }

    // --------- middleware using here -------------:
    // server.use(bodyParser.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(express.static('./client'));
    server.use(express.static('./static'));
    server.use(esepressSession(expressSessionConfig))

};

module.exports = GlobalMidllewares;