const { validationResult } = require("express-validator");


//------ Request Hendler Functions ----:

function home (req, res) {
    res.render('home.hbs');
};


function register (req, res) {
    console.log(">>> Register income:");
    console.log(req.body);
    res.json(req.body)
};

//------ Hendler Registrations ----:
const useHandler = {
    home,
    register
};

module.exports = useHandler;