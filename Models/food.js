const {Schema, model} = require("mongoose");


// Schema:
const foodCollectionSchema = new Schema({
    name: String,
});

// Model = Collection creation:
const foodModel = model('Food', foodCollectionSchema);

module.exports = foodModel;