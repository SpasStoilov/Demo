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
    
    console.log('S:>>> Service -> creatVrAndAppendToUser -> Fields', objVr)

    try {

        let vr = new vrModel(objVr)
        vr.save()

        let user = await UserModel.findOne({email, username})
        user.vrs.push(vr)
        user.save()

        console.log('S:>>> Service -> creatVrAndAppendToUser -> Return User:', user.populate('vrs'))
        return user.populate('vrs')
        
    } catch (err){
        console.log(err.message)
    }

}

async function getUser(user){
    let obj = {email: user.email, username: user.username}
    try {
        let user = await UserModel.findOne(obj).populate('vrs')
        console.log('S:>>> Service -> getUser -> Return User:', user)
        return user
        
    } catch (err){
        console.log('S:>>> Service -> getUser -> ERROR:', err.message)
    }
}

async function deleteVrFormalForm(req, fs){

    console.log("S:>>> Service -> deleteVrFormalForm actingg...");

    try {

        // get user:
        let user = await UserModel.findOne(
            {email: req.session.user.email, username: req.session.user.username}
        ).populate("vrs")

        console.log('S:>>> Service -> deleteVrFormalForm -> Curent User:', user)
        //------------------------------------------------------------------------------

        // extracting img paths:
        let imgPathsToRemove = []

        user.vrs = user.vrs.filter((vr) => {
            if (vr["_id"] == req.body['_id']){
                imgPathsToRemove = vr['imgs'];
            };
            return vr["_id"] != req.body['_id'];
        });

        console.log("S:>>> Service -> deleteVrFormalForm -> imgPathsToRemove:", imgPathsToRemove)
        //--------------------------------------------------------------------------------

        await user.save();

        // delete img from useruploads:
        for (let imgAdress of imgPathsToRemove){
            await fs.unlink(imgAdress)
        }
        //----------------------------------------------------------------------------------

        console.log("S:>>> Service -> deleteVrFormalForm -> Updated User Vrs List", user)

        //----------------------------------------------------------------------------------

        // deleting vr form data base:
        await vrModel.findByIdAndDelete(req.body['_id']);
        //----------------------------------------------------------------------------------

        return { _id: req.body['_id'] };

    } catch (err){
        console.log("S:>>> Service -> deleteVrFormalForm -> ERROR:", err.message);
        return {}
    }
}

//------ Service Registrations ----:
module.exports = {
    userCreation,
    checkForUser,
    updateUserSettings,
    creatVrAndAppendToUser,
    getUser,
    deleteVrFormalForm
};