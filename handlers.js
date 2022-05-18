const { validationResult } = require("express-validator");


//------ Request Hendler Functions ----:

function home (req, res) {
    res.render('home.hbs');
};




//------ Hendler Registrations ----:
const useHandler = {
    home,
};

module.exports = useHandler;