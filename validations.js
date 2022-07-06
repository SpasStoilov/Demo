async function validateCreation (userInstance) {
    console.log('S:>>> Validations validateCreation acting...');
    
    const DataBaseErrReport = [];

    try {
        await userInstance.save();
    } catch (err) {
        console.log('>>> DATABASE ERRORS STRUCTURES:', err.errors);
        console.log('>>> DATABASE ERRORS FIELDS:', Object.keys(err.errors));
        Object.keys(err.errors).forEach( field => {
            const dataBaseErr = {
                value: err.errors[field].properties.value,
                msg: err.errors[field].properties.message,
                param: err.errors[field].properties.path,
                location: 'body'
            };
            DataBaseErrReport.push(dataBaseErr);
        });

    };

    console.log('S:>>> Validations validateCreation: Return DataBaseErros Report (List)');
    return DataBaseErrReport;
};



function verifyVrUserFormData (fields, files, flag=false){

    console.log('S:>>> validations -> verifyVrUserFormData -> acting...');

    let requiredFields = [
        'LocationVrForm', 
        'propertyfloorVrForm', 
        'areaCommonPartsVrForm', 
        'areaNoneCommonPartsVrForm', 
        'priceVrForm', 
    ]

    let errorMessenger = {};
  
    for (let field of Object.entries(fields)){
        let [name, value] = field;
       
        if (requiredFields.includes(name) && (value === "" || value === 'Задължително поле!')){
            errorMessenger[name] = value;
            console.log('S:>>> validations -> verifyVrUserFormData: Задължително поле!');
        }
        else if (requiredFields.includes(name) && name !== 'LocationVrForm' && !Number(value)){
            errorMessenger[name] = value;
            console.log('S:>>> validations -> verifyVrUserFormData: Трябва да е число!');
        }

    }

    for (let Img of Object.keys(files)){

        const originalName = files[Img].originalFilename;

        if (flag !== 'edit'){
            if (!originalName){
                errorMessenger[Img] = {name: 'Img Required!'};
                console.log('S:>>> validations -> verifyVrUserFormData: Img Required! (NO edit)');
            }
            else if (!originalName.endsWith('.jpg') && !originalName.endsWith('.png')){
                errorMessenger[Img] = {name: '.JPG or .PNG!'};
                console.log('S:>>> validations -> verifyVrUserFormData: .JPG or .PNG! (NO edit)');
            }
        }
        else if (flag === 'edit'){
            if ( originalName && !originalName.endsWith('.jpg') && !originalName.endsWith('.png') ){
                errorMessenger[Img] = {name: 'Img Required!'};
                console.log('S:>>> validations -> verifyVrUserFormData: .JPG or .PNG! (edit)');
            }
        } 
    };

    return errorMessenger
}

function validatorFilterForm(value){
    if (value === "" || Number(value)){
       return true
    }
    throw new Error(field)
}


//------ Validator Registrations ----:
module.exports = {
    validateCreation,
    verifyVrUserFormData,
    validatorFilterForm
};