let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: String,
    firstName: String,
    lastName: String,
    password: String,
    salt: Date,
    email: String,
    isActive: {
        type: Boolean,
        default: true
    },
    dateCreation: Date,
    dateLastConnection: Date,
    birthdate: Date,
    userProfileId: Number,
    roleId: Number,
}, {
    collection: 'users',
    categories: Array,
    timestamps: true
});

usersSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = usersSchema