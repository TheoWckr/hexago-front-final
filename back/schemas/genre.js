let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let genresSchema = new Schema({
    genre: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-_]+$/ }
}, {
    collection: 'genres',
    categories: Array,
    timestamps: true
});

genresSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = genresSchema;
