let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validator = require('validator');

let usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-_]+$/ },
    phone: String,
    firstName: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-_]+$/ },
    lastName: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-_]+$/ },
    password: String,
    salt: String,
    email: {
        type:String,
        required:true,
        validator:validator.isEmail
    },
    isActive: {
        type: Boolean,
        default: true
    },
    dateCreation: {
        type:Date,
        default:Date.now
    },
    dateLastConnection: Date,
    dateOfBirth: {
        type:Date,
        default:Date.now},
    userProfileId: Number,
    roleId: Number,
}, {
    collection: 'users',
    categories: Array,
    timestamps: true
});

usersSchema.index({title: 'text', content: 'text', "content:encoded": 'text'});

module.exports = usersSchema;