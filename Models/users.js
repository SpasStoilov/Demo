const validate = require()
const {Schema, model} = require("mongoose");


// Schema:
const userSchema = new Schema({
    email: String,
    username: String,
    password: String
});

// Model = Collection creation:
const UserModel = model("User", userSchema);

module.exports = UserModel;