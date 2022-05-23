async function validateCreation (userInstance) {
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

    return DataBaseErrReport;
};


module.exports = {
    validateCreation
};