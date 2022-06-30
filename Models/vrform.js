const {Schema, model} = require("mongoose")

const vrSchema = new Schema({
    RadioBtnVrForm: String,
    TypeApartmentVrForm: String,
    LocationVrForm: String,
    propertyfloorVrForm: Number,
    areaCommonPartsVrForm: Number,
    areaNoneCommonPartsVrForm: Number,
    priceVrForm: Number,
    curuncyVrForm: String,
    yearConstructionVrForm: Number,
    buildingSizeVrForm: Number,
    furnitureVrForm: String,
    constructionVrForm: String,
    heatingVrForm: String,
    moreInfoVrForm: String,
    imgs: Array,
})

const vrModel = model('VR', vrSchema);

module.exports = vrModel;