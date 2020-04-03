let mongoose = require('mongoose')
// connect to Mongo daemon
mongoose.connect('mongodb://localhost:27017/hexago', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

let db = mongoose.connection
let BadgeSchema = require('../schemas/badge')

module.exports = db.model('Badge', BadgeSchema)
