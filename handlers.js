const { validationResult } = require("express-validator");
// const UserModel = require("./Models/users.js");
const useBackService = require('./services.js');

//------ Request Hendler Functions ----:

function home (req, res) {
    res.render('home.hbs');
};


async function register (req, res) {
    
    console.log('>>> REQUEST Body:', req.body);
    // const DataBaseErrReport = [];
    let {email, username, password} = req.body;

    const DataBaseErrReport = await useBackService.userCreation(email, username, password);

    // const userInstance = new UserModel({
    //     email,
    //     username,
    //     password
    // });

    // try {
    //     await userInstance.save();
    // } catch (err) {
    //     console.log('>>> DATABASE ERRORS STRUCTURES:', err.errors);
    //     console.log('>>> DATABASE ERRORS FIELDS:', Object.keys(err.errors));
    //     Object.keys(err.errors).forEach( field => {
    //         const dataBaseErr = {
    //             value: err.errors[field].properties.value,
    //             msg: err.errors[field].properties.message,
    //             param: err.errors[field].properties.path,
    //             location: 'body'
    //         };
    //         DataBaseErrReport.push(dataBaseErr);
    //     });

    // };

    const [...ServerErrReport] = validationResult(req).errors;
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
    } else {
        res.json(req.body);
    };

};

//------ Hendler Registrations ----:
const useHandler = {
    home,
    register
};

module.exports = useHandler;