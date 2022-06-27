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



function verifyVrUserFormData (fields, files){

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
        }

        else if (requiredFields.includes(name) && name !== 'LocationVrForm' && !Number(value)){
            errorMessenger[name] = value;
        }

    }

    for (let Img of Object.keys(files)){

        const originalName = files[Img].originalFilename;

        if (!originalName || (!originalName.endsWith('.jpg') && !originalName.endsWith('.png'))){
            errorMessenger[Img] = {name: 'Img Required!'};
        }
       
    };

    return errorMessenger
}


//------ Validator Registrations ----:
module.exports = {
    validateCreation,
    verifyVrUserFormData
};