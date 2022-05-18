const {Schema, model} = require("mongoose");


// Schema:
const catCollectionSchema = new Schema({
    name: String,
    color: String,
    food: [{type: Schema.Types.ObjectId, ref: "Food"}]
});

// Model = Collection creation:
const CatModel = model("Cat", catCollectionSchema);

module.exports = CatModel;