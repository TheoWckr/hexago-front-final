let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let BadgeSchema = new Schema({
    name:String,
    description:String,
    image:String
});
BadgeSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = BadgeSchema;