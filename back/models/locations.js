let mongoose = require('mongoose');
// connect to Mongo daemon
mongoose.connect('mongodb://localhost:27017/hexago', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

let db = mongoose.connection;
let locationsSchema = require('../schemas/locations');

module.exports = db.model('Locations', locationsSchema);
