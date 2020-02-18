let mongoose = require('mongoose')
// connect to Mongo daemon
mongoose.connect('mongodb://localhost:27017/hexago', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

let db = mongoose.connection
let articleSchema = require('../schemas/users')

module.exports = db.model('Article', articleSchema)
