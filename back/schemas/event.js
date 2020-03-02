let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let EventSchema = new Schema({
    duration:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    minParticipant:{
        type: Number,
        required: true
    },
    maxParticipant:{
        type: Number,
        required: true
    },
    phone:String,
    details:String
});
EventSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = EventSchema