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
        minLength: [3, "Min length of Username: 3 char!"],
    },
    password: {
        type: String,
        minLength: [1, "Min length of Password: 1 char!"],
    },

    vrs: [{type: Schema.Types.ObjectId, ref: "VR"}]

});

// Model = Collection creation:
const UserModel = model("User", userSchema);

module.exports = UserModel;