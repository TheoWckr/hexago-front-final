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

    if (req.query.name) {
        data['name'] = { '$regex': /req.query.name*/i};
    }
    if (req.query.author) {
        data['author'] = req.query.author;
    }
    if (req.query.author) {
        data['editor'] = req.query.editor;
    }
    if (req.query.distributor) {
        data['distributor'] = req.query.distributor;
    }
    if (req.query.releaseDate) {
        data['releaseDate'] = req.query.releaseDate;
    }
    if (req.query.popularity) {
        data['popularity'] = req.query.popularity;
    }
    if (req.query.nbPlayer) {
        data['playerMin'] = { '$gte': req.query.nbPlayer };
        data['playerMax'] = { '$lte': req.query.nbPlayer };
    }
    if (req.query.gameLengthMin) {
        data['gameLengthMin'] = req.query.gameLengthMin;
    }
    if (req.query.gameLengthMax) {
        data['gameLengthMax'] = req.query.gameLengthMax;
    }
    if (req.query.minAge) {
        data['minAge'] = req.query.minAge;
    }
    console.log(data);
    GameDetails.find(data, function (err, result) {
        if (err) res.json({
            err: err
        });
        else {
            if (result) {
                res.json({
                    result
                })
            }
        }
    })

});

//post create a game

router.post('/create', (req, res, next) => {
    // check if game already exists
    GameDetails.findOne({ 'name':req.body.name}, function(error, gameExists) {
        if (gameExists) {
            res.json({msg: 'Game already exists by this name: ' + req.body.name})
        }
        // create the game
        else {
            GameDetails.create(req.body, (err, location) => {
                if (err) res.json({err: err});
                else {
                    if (location) {
                        res.json({user: location, msg: 'Game created successfully.'})
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
                req.params.id, (err, location) => {
                    if (err) res.json({
                        err: err
                    });
                    else {
                        if (location) {
                            res.json({
                                location
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
        GameDetails.findByIdAndDelete(req.params.id, (err, location) => {
            if (err) res.json({
                err: err
            });
            else if (req.params.id.length !== 24)
                res.json({
                    err: 'Please provide a valid id param.'
                });
            else
            if (location) {
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
