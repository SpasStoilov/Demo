const { validationResult } = require("express-validator");
const UserModel = require("./Models/users.js");

//------ Request Hendler Functions ----:

function home (req, res) {
    res.render('home.hbs');
};


async function register (req, res) {
    
    console.log('>>> REQUEST Body:', req.body);

    let {email, username, password} = req.body;

    const userInstance = new UserModel({
        email,
        username,
        password
    });

    const resultDataBaseErrs = [];

    try {
        await userInstance.save();
    } catch (err) {
        console.log('>>>ERRORS DATABase:', err.errors);
        console.log('>>>ERRORS FIELDS DATABase:', Object.keys(err.errors));
        Object.keys(err.errors).forEach(field => {
            const dataBaseErr = {
                value: err.errors[field].properties.value,
                msg: err.errors[field].properties.message,
                param: err.errors[field].properties.path,
                location: 'body'
            };
            resultDataBaseErrs.push(dataBaseErr);
        });

    };
    
    console.log('>>> SEVER ERRORS:', validationResult(req).errors);
    console.log('>>>ERRORS RESULT DATABASE:', resultDataBaseErrs);

    if (JSON.stringify(validationResult(req).errors) !== '[]') {
        res.json(validationResult(req).errors);
    } else if (JSON.stringify(resultDataBaseErrs) !== '[]') {
        res.json(resultDataBaseErrs);
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