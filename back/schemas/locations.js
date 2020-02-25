let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let locationsSchema = new Schema({
    openedHours: Date,
    locationType: {
        type: Number,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    adress2: String,
    postCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "France"
    }
})
locationsSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = locationsSchema