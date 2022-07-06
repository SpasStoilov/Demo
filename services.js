const UserModel = require("./Models/users.js");
const vrModel = require("./Models/vrform.js");
const useBackValidator = require('./validations.js');
const bcrypt = require('bcrypt');
const { ConnectionStates } = require("mongoose");


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

async function updateVrAndAppendToUser(user, imgsNewPaths, fields, fs){

    const id = fields.editObjId
    delete fields.editObjId

    console.log('S:>>> Service -> updateVrAndAppendToUser -> fields (Before):', fields)

    let picPathToRemove = Object.keys(fields).filter( (el) => el.startsWith('./static'));

    fields = Object.entries(fields).filter((el) => !el[0].startsWith('./static'));
    fields = Object.fromEntries(fields);
    
    console.log('S:>>> Service -> updateVrAndAppendToUser -> fields:', fields)
    console.log('S:>>> Service -> updateVrAndAppendToUser -> picPathToRemove:', picPathToRemove)

    try {

        // delete img from useruploads:
        for (let adr of picPathToRemove){
            await fs.unlink(adr)
        }
        //----------------------------------------------------------------------------------

        // selections:
        let vr = await vrModel.findById(id)
        //---------------------------------------------------------------------------------
        
        // delete img adress from vr.imgs array
        vr['imgs'] = vr.imgs.filter((adrs) => !picPathToRemove.includes(adrs))
        //----------------------------------------------------------------------------------

        // updating vr.imgs array:
        vr['imgs'] = vr['imgs'].concat(imgsNewPaths);
        // ----------------------------------------------------------------------------------

        await vr.save();

        await vrModel.findByIdAndUpdate(id, {
            $set: fields
        })

        console.log('S:>>> Service -> updateVrAndAppendToUser -> Update User:', user)

        return await getUser(user);

    } 
    catch (err) {
        console.log(err)
    }

}

async function getAllvrsFromDataBase(){
    console.log('S:>>> Service -> getAllvrsFromDataBase acting...')
    try {
        let allVrs = await vrModel.find({})
        console.log('S:>>> Service -> getAllvrsFromDataBase -> all VRS:', allVrs);
        return allVrs
    }
    catch (err) {
        console.log(err.message)
        return []
    }
}

async function getFilteredVrs(data) {
    console.log('S:>>> Service -> getFilteredVrs')
    try {

        let requiredObj = {
            'City': data['City-filter'],
            'TypeApartmentVrForm': data['TypeApartmentVrForm-filter'],
            'curuncyVrForm':data['curuncyVrForm-filter'],
            'priceVrForm': {$gte: data['priceVrForm-filter-min'], $lte: data['priceVrForm-filter-max']},
            'propertyfloorVrForm': {$gte: data['propertyfloorVrForm-filter-min'], $lte: data['propertyfloorVrForm-filter-max']},
            'areaNoneCommonPartsVrForm': {$gte: data['areaNoneCommonPartsVrForm-filter-min'], $lte: data['areaNoneCommonPartsVrForm-filter-max']}
        };

        for (let [field, value] of Object.entries(requiredObj)){
            if (!value){
                delete requiredObj[field]
            }
            if (!value.$gte){
                delete value.$gte
            }
            if (!value.$lte){
                delete value.$lte
            }
            if ( JSON.stringify(value) == '{}' && Object.keys(value).length === 0){
                delete requiredObj[field]
            }
        }

        let RadioBtnVrFormValues = Object.entries(data).filter((el) => {
            if (el[0].startsWith('RadioBtnHolderVrForm')){
                return el[1]
            }
        })

        if (RadioBtnVrFormValues.length !== 0){
            requiredObj['RadioBtnHolderVrForm'] = {$eq: RadioBtnVrFormValues}
        }

        console.log('S:>>> Service -> getFilteredVrs -> requiredObj:', requiredObj)

        let requiredVrs = await vrModel.find(requiredObj)
        console.log('S:>>> Service -> getFilteredVrs -> Required VRS:', requiredVrs);
        return requiredVrs
    }
    catch (err) {
        console.log(err.message)
        return []
    }
}



//------ Service Registrations ----:
module.exports = {
    userCreation,
    checkForUser,
    updateUserSettings,
    creatVrAndAppendToUser,
    getUser,
    deleteVrFormalForm,
    updateVrAndAppendToUser,
    getAllvrsFromDataBase,
    getFilteredVrs
};