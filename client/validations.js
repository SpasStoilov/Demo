function register(formData){
    console.log('C:>>> Validation Register acting...');

    let {email, username, password, reppassword} = Object.fromEntries(formData);
    let bodyInfo = {
        'email': email,
        'username': username,
        'password': password,
        'reppassword': reppassword
    };

    console.log('C:>>> Validation Register: Render Body Data: ', bodyInfo)

    let message = "ok";
    let value = true;
    
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const bodyNotEmpty = Object.values(bodyInfo).every(value => value);
    
    if (!bodyNotEmpty) {
        message = "Fields Must Not be empty!";
    } else if (!validateEmail(email)) {
        message = "Email is Not Valid!";
    } else if (username.length < 3) {
        message = "Username is too short!";
    } else if (password.length < 2) {
        message = "Password is too short!";
    } else if (reppassword != reppassword) {
        const reppasswordField = document.querySelector('input[name=reppassword]');
        reppasswordField.style.borderColor = "red";
        message = "Passwords do not match!";
    }

    if (message != "ok"){
        value = false;
    };

    console.log('C:>>> Validation Register: Return Obj Info')
    return {value, message, bodyInfo}
};


function vrFormCreationValidation(vrFormCreationDATA, flag=false){

    console.log('C:>>> vrFormCreationValidation actings...')
    console.log('C:>>> vrFormCreationValidation -> VR formData:', vrFormCreationDATA)
    console.log('C:>>> vrFormCreationValidation -> FLAG:', flag)

    let requiredFields = [
        'LocationVrForm', 
        'propertyfloorVrForm', 
        'areaCommonPartsVrForm', 
        'areaNoneCommonPartsVrForm', 
        'priceVrForm', 
    ]

    let errorMessenger = {};
  
    for (let field of vrFormCreationDATA){
        let [name, value] = field;
 
        if (requiredFields.includes(name) || ( name.startsWith('inputImageVrForm') ) ){
            console.log('C:>>> vrFormCreationValidation -> Required field:', name);
            document.querySelector(`input[name=${name}]`).style.borderColor = '#ECECEC';
        }

        if (requiredFields.includes(name) && (value === "" || value === 'Задължително поле!')){
            errorMessenger[name] = 'Задължително поле!';
            document.querySelector(`input[name=${name}]`).style.borderColor = 'red';
            document.querySelector(`input[name=${name}]`).value = 'Задължително поле!';
            console.log('C:>>> vrFormCreationValidation -> Required field:', 'Задължително поле!');
        }

        else if (name.startsWith('inputImageVrForm') && value.name === "" && flag !== "edit"){
            errorMessenger[name] = 'Липсва снимка!';
            document.querySelector(`input[name=${name}]`).style.borderColor = 'red';
            console.log('C:>>> vrFormCreationValidation -> Required field:', 'Липсва снимка!');
        } 

        else if (name.startsWith('inputImageVrForm') && value.name !== ""  && !value.name.endsWith('.jpg') && !value.name.endsWith('.png') ){
            errorMessenger[name] = 'Файлове с разширение .JPG или .PNG!';
            document.querySelector(`input[name=${name}]`).style.borderColor = 'red';
            console.log('C:>>> vrFormCreationValidation -> Required field:', 'Файлове с разширение .JPG или .PNG!');   
        }

        else if (requiredFields.includes(name) && name !== 'LocationVrForm' && !Number(value)){
            errorMessenger[name] = 'Въведете число!';
            document.querySelector(`input[name=${name}]`).style.borderColor = 'red';
            document.querySelector(`input[name=${name}]`).value = 'Въведете число!';
            console.log('C:>>> vrFormCreationValidation -> Required field:', 'Въведете число!'); 
        }

    };

    return errorMessenger;

}

function forFilterform(objectData){

    console.log("C:>>> Validations -> forFilterform")

    const filterFieldToCheck = [
        'areaNoneCommonPartsVrForm-filter-max',
        'areaNoneCommonPartsVrForm-filter-min',
        'priceVrForm-filter-max',
        'priceVrForm-filter-min',
        'propertyfloorVrForm-filter-max',
        'propertyfloorVrForm-filter-min',
    ];

    for (let field of filterFieldToCheck){
        if (objectData[field] === "" || Number(objectData[field])){
            objectData[field] = Number(objectData[field])
            document.querySelector(`[name=${field}]`).style.borderColor = '';
            continue
        }
        throw new Error(field)
    }

}

export const useValidator = {
    register,
    vrFormCreationValidation,
    forFilterform
}