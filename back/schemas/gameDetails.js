let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let GameDetailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: String,
    editor: String,
    distributor: String,
    releaseDate: Date,
    popularity: Number,
    playerMin: {
        type: Number,
        required: true
    },
    playerMax: {
        type: Number,
        required: true
    },
    gameLengthMin: Number,
    gameLengthMax: Number,
    minAge: Number
});
GameDetailsSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = GameDetailsSchema