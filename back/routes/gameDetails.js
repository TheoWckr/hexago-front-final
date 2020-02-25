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

//get all games
router.get('/', (req, res, next) => {
    GameDetails.find({}, function (err, result) {
        console.log(result);
        if (err) res.json({
            err: err
        });
        else res.json({result})
    })

});

//post create a game

router.post('/create', (req, res, next) => {
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
});

//get a game
router.get('/:id', function (req, res, next) {
    if (!req.params.id) res.json({
        err: 'Please provide an id param.'
    });
    else {
        GameDetails.findById(
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
            })
    }
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