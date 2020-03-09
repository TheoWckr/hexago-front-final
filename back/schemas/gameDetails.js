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
        required: true,
        min:1
    },
    playerMax: {
        type: Number,
        required: true,
        min:1
    },
    gameLengthMin: Number,
    gameLengthMax: Number,
    minAge: {
        type:Number,
        min:0
    },
    description: String,
    playedAtEvent: {
        type:Number,
        min:0
    }
});
GameDetailsSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = GameDetailsSchema