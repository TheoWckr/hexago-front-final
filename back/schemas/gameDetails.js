let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let GameDetailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    editor: {
        type: String
    },
    distributor: {
        type: String
    },
    releaseDate: Date,
    popularity: Number,
    playerMin: {
        type: Number,
        required: true,
        min:1
    },
    nbPlayer:{
        type:Number,
        required: false,
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
    },
    genre: {
        type:Array,
        required:true
    }
});
GameDetailsSchema.index({name: 'text', author: 'text', editor: 'text', distributor: 'text'});

module.exports = GameDetailsSchema