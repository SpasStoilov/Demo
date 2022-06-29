const UserModel = require("./Models/users.js");
const vrModel = require("./Models/vrform.js");
const useBackValidator = require('./validations.js');
const bcrypt = require('bcrypt');


// async function hashPassword (pass) {
//     const salt = 8;
//     const hashed = await bcrypt.hash(pass, salt);
//     return hashed;
// };

// async function comparePasswords (pass, hash) {
//     const result = await bcrypt.compare(pass, hash);
//     return result;
// };


async function checkForUser (email, logPassword, flag) {
    console.log('S:>>> Service checkForUser acting...');
    console.log('S:>>> Service checkForUser: Chek in UserModel for User?');

    let foundUser = await UserModel.findOne({email: email});
    console.log('S:>>> Service checkForUser: Result:', foundUser);

    if (!foundUser) {
        foundUser = {errmsg: 'Wrong Email!'};
        console.log('S:>>> Service checkForUser: Message:', foundUser.errmsg);
    };
       
    if (!foundUser.hasOwnProperty('errmsg') && flag === 'login') {

        if (logPassword !== foundUser.password){
            foundUser = {errmsg: 'Wrong password!'};
            console.log('>>> S:>>> Service checkForUser: ERROR:', foundUser.errmsg);
        };

    }

    console.log('S:>>> Service checkForUser: Return foundUser!');
    return foundUser;
};


async function userCreation (email, username, password) {
    console.log('S:>>> Service userCreation acting...');

    console.log('S:>>> Service userCreation: Creating userInstance form UserModel!');
    const userInstance = new UserModel({
        email,
        username,
        password
    });

    console.log('S:>>> Service userCreation: Return Validations Creation Report');
    return useBackValidator.validateCreation(userInstance);
}


async function updateUserSettings (oldUser, newUser) {
    console.log('S:>>> updateUserSettings acting...');
    try {
        let foundUser = await UserModel.findOne({email: oldUser.email, username: oldUser.username, password: oldUser.password});
        foundUser.email = newUser.email
        foundUser.username = newUser.username
        foundUser.password = newUser.password
        await  foundUser.save();
        return foundUser;

    } catch (err) {
        console.log(err.message)
    };
};

async function creatVrAndAppendToUser(email, username, imgsNewPaths, fields){

    let objVr = fields
    objVr.imgs = imgsNewPaths
    
    console.log('S:>>> creatVrAndAppendToUser -> Fields', objVr)

    try {

        let vr = new vrModel(objVr)
        vr.save()

        let user = await UserModel.findOne({email, username})
        user.vrs.push(vr)
        user.save()

        console.log('S:>>> creatVrAndAppendToUser -> Return User:', user)
        return user
        
    } catch (err){
        console.log(err.message)
    }

}



//------ Service Registrations ----:
module.exports = {
    userCreation,
    checkForUser,
    updateUserSettings,
    creatVrAndAppendToUser,
};



        // RadioBtnVrForm: ,
        // TypeApartmentVrForm: ,
        // LocationVrForm: ,
        // propertyfloorVrForm: ,
        // areaCommonPartsVrForm: ,
        // areaNoneCommonPartsVrForm: ,
        // priceVrForm: ,
        // yearConstructionVrForm: ,
        // buildingSizeVrForm: ,
        // furnitureVrForm: ,
        // constructionVrForm: ,
        // heatingVrForm: ,
        // moreInfoVrForm: ,
        // ComplexVrForm: ,
        // imgs: imgsNewPaths