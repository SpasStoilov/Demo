const { validationResult } = require("express-validator");
const useBackService = require('./services.js');

//------ Request Hendler Functions ----:

function home (req, res) {
    // const User = req.session.user;
    res.render('home.hbs');
};


async function register (req, res) {

    const { user } = req.session; // UserObj/ErrorOBJ
    delete req.session.user;
    console.log('>>> Try Register (at: handlers.js):', user);

    //  if defind go in = user not found
    if (user.errmsg) {
        
        let {email, username, password} = req.body;
        const [...ServerErrReport] = validationResult(req).errors;
        const DataBaseErrReport = await useBackService.userCreation(email, username, password);
        
        console.log('>>> REQUEST Body:', req.body);
        console.log('>>> SEVER ERRORS REPORT:', ServerErrReport);
        console.log('>>> DATABASE ERRORS REPORT:', DataBaseErrReport);
        
        let TOTALerrREPORT = DataBaseErrReport.concat(ServerErrReport);
        console.log('>>> TOTAL REPORT:', TOTALerrREPORT);

        let repeatErrors = [];
        const FILTERDerrREPORT = TOTALerrREPORT.filter( err => {
            let found = repeatErrors.find( field => {
                return err.param === field;
            });

            if (!found) {
                repeatErrors.push(err.param)
                return true  
            };
            return false
        });

        console.log('>>> FILTERED ERRORS:', FILTERDerrREPORT);

        if (JSON.stringify(FILTERDerrREPORT) !== '[]') {
            res.json(FILTERDerrREPORT);
        } 
        else {
            res.json(req.body);
        };
    } 
    //  if undefind go in = user found
    else {
        res.json({errmsg: 'User Exist'});
    };

};


function logIn (req, res) {
    const { user } = req.session; // UserObj/ErrorOBJ
    console.log('>>> User Try to log (at: handlers.js):', user);
    if (user.errmsg) {
        delete req.session.user;
    };
    res.json(user);

};

//------ Hendler Registrations ----:
const useHandler = {
    home,
    register,
    logIn
};

module.exports = useHandler;