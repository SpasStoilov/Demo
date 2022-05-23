const {Schema, model} = require("mongoose");


// Schema:
const userSchema = new Schema({
    email: {
        type: String,
        validate:{
            validator: function(value){
                return value.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            },
            message: `Not a valid email!`
        }
    },
    username: {
        type: String,
        minLength: [4, "Min length of Username: 4 char!"],
    },
    password: {
        type: String, 
        minLength: [1, "Min length of pass: 1 char!"],
    }
});

// Model = Collection creation:
const UserModel = model("User", userSchema);

module.exports = UserModel;