const {Schema, model} = require("mongoose")

const vrSchema = new Schema({
    RadioBtnVrForm: String,
    TypeApartmentVrForm: String,
    LocationVrForm: String,
    propertyfloorVrForm: Number,
    areaCommonPartsVrForm: Number,
    areaNoneCommonPartsVrForm: Number,
    priceVrForm: Number,
    yearConstructionVrForm: Number,
    buildingSizeVrForm: Number,
    furnitureVrForm: String,
    constructionVrForm: String,
    heatingVrForm: String,
    moreInfoVrForm: String,
    ComplexVrForm: String,
    imgs: Array,
    //filesForSale: Array,
})

const vrModel = model('VR', vrSchema);

module.exports = vrModel;