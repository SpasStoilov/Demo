const { validationResult } = require("express-validator");

//------ Request Hendler Functions ----:

function home (req, res) {
    res.render('home.hbs');
};


function register (req, res) {
    
    const listOfErrors = validationResult(req).errors
    if (JSON.stringify(listOfErrors) === '[]') {
        res.json(req.body);
    } 
    else {
        res.json(validationResult(req))
    };

};

//------ Hendler Registrations ----:
const useHandler = {
    home,
    register
};

module.exports = useHandler;