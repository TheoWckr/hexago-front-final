let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let EventSchema = new Schema({
    duration:{
        type: Number,
        required: true,
        min:0
    },
    date:{
        type: Date,
        required: true
    },
    minParticipant:{
        type: Number,
        required: true,
        min:2
    },
    maxParticipant:{
        type: Number,
        required: true,
        min:2
    },
    phone:String,
    details:String,
    locationID:String,
});
EventSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = EventSchema