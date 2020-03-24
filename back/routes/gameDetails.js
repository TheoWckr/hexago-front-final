let async = require('async/waterfall');

let express = require('express');
let router = express.Router();
let GameDetails = require('../models/gameDetails');

// let axios = require('axios')
// axios.defaults.baseURL = `${process.env.AUTH0_AUDIENCE}`

function logHandleError(err) {
    if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(err.response.data)
    } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(err.request)
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error(err.message)
    }
}

// GET method http://localhost:3000/gamedetails?name=xxxx&distributor=yyyyy&author=aaaaaa or get all if empty
router.get('/', (req, res, next) => {
    let data = {};

    // search by name
    if (req.query.name) {
        let toRegexp= req.query.name;
        data['name'] = new RegExp(".*"+toRegexp+".*",'i');
    }
    if (req.query.author) {
        let toRegexp= req.query.author;
        data['author'] = new RegExp(".*"+toRegexp+".*",'i');
    }
    if (req.query.editor) {
        let toRegexp= req.query.editor;
        data['editor'] = new RegExp(".*"+toRegexp+".*",'i');
    }
    if (req.query.distributor) {
        let toRegexp= req.query.distributor;
        data['distributor'] = new RegExp(".*"+toRegexp+".*",'i');
    }
    if (req.query.releaseDate) {
        data['releaseDate'] = req.query.releaseDate;
    }
    if (req.query.popularity) {
        data['popularity'] = {'$gte':req.query.popularity};
    }
    if (req.query.nbPlayer) {
        data['playerMin'] = { '$lte': req.query.nbPlayer };
        data['playerMax'] = { '$gte': req.query.nbPlayer };
    }
    if (req.query.gameLengthDesired){
        data['gameLengthMin'] = { '$lte':req.query.gameLengthMin};
        data['gameLengthMax'] = { '$gte':req.query.gameLengthMax};
    }
    if (req.query.minAge) {
        data['minAge'] = { '$gte': req.query.minAge};
    }
    console.log(data);
    GameDetails.find(data, function (err, content) {
        if (err) res.json({
            err: err
        });
        else {
            if (content) {
                res.json({
                    content
                })
            }
        }
    })

});

// TODO get hall of fame best game


//post create a game

router.post('/create', (req, res, next) => {
    // check if game already exists
    GameDetails.findOne({ 'name':req.body.name}, function(error, gameExists) {
        if (gameExists) {
            res.json({msg: 'Game already exists by this name: ' + req.body.name})
        }
        // create the game
        else {
            GameDetails.create(req.body, (err, content) => {
                if (err) res.json({err: err});
                else {
                    if (content) {
                        res.json({gameDetails: content, msg: 'Game created successfully.'})
                    } else {
                        res.json({err: 'Unable to create this game.'})
                    }
                }
            })
        }
    });
});

//get a game
router.get('/:id', function (req, res, next) {
    // find a game by it id
    if (req.params.id.length !== 24){
        res.json({
            err: 'Please provide a valid id param.'
        })}
    else {GameDetails.findById(
                req.params.id, (err, content) => {
                    if (err) res.json({
                        err: err
                    });
                    else {
                        if (content) {
                            res.json({
                                content
                            })
                        } else {
                            res.json({
                                err: 'No game found with this id.'
                            })
                        }
                    }
                })}


});

//delete a game
router.delete('/:id', (req, res, next) => {
    if (!req.params.id) res.json({
        err: 'Please provide an id param.'
    });
    else if (req.params.id.length !== 24)
        res.json({
            err: 'Please provide a valid id param.'
        });
    else
        GameDetails.findByIdAndDelete(req.params.id, (err, content) => {
            if (err) res.json({
                err: err
            });
            else if (req.params.id.length !== 24)
                res.json({
                    err: 'Please provide a valid id param.'
                });
            else
            if (content) {
                res.json({
                    _id: req.params.id,
                    msg: 'Game deleted successfully.'
                })
            } else {
                res.json({
                    err: 'No game found with this id.'
                })
            }
        })
});

module.exports = router;
