let async = require('async/waterfall');

let express = require('express');
let router = express.Router();
let Event = require('../models/event');

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
    Event.find({}, function (err, result) {
        console.log(result);
        if (err) res.json({
            err: err
        });
        else res.json({result})
    })

});

//post create a game

router.post('/create', (req, res, next) => {
    Event.create(req.body, (err, location) => {
        if (err) res.json({err: err});
        else {
            if (location) {
                res.json({user: location, msg: 'Event created successfully.'})
            } else {
                res.json({err: 'Unable to create this event.'})
            }
        }
    })
});

//get a game
router.get('/:id', function (req, res, next) {
    if (!req.params.id) res.json({
        err: 'Please provide an id param.'
    });
    else if (req.params.id.length !== 24)
        res.json({
            err: 'Please provide a valid id param.'
        });
    else {
        Event.findById(
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
                            err: 'No event found with this id.'
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
        Event.findByIdAndDelete(req.params.id, (err, location) => {
            if (err) res.json({
                err: err
            });
            else
            if (location) {
                res.json({
                    _id: req.params.id,
                    msg: 'Event deleted successfully.'
                })
            } else {
                res.json({
                    err: 'No event found with this id.'
                })
            }
        })
});

module.exports = router;