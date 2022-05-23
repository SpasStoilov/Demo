const { validationResult } = require("express-validator");

//------ Request Hendler Functions ----:

function home (req, res) {
    res.render('home.hbs');
};


function register (req, res) {
    
    console.log('>>> ERRORS:', validationResult(req).errors);
    if (JSON.stringify(validationResult(req).errors) == '[]') {
        res.json(req.body);
    } 
    else {
        res.json(validationResult(req).errors)
    };

};

//------ Hendler Registrations ----:
const useHandler = {
    home,
    register
};

module.exports = useHandler;