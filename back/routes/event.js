let async = require('async/waterfall');
var unirest = require('unirest');
let express = require('express');
let router = express.Router();
let Event = require('../models/event');
let GameDetails = require('../models/gameDetails');
let Users = require ('../models/users');
let moment = require('moment');
moment().format();

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

//get all events
router.get('/', (req, res, next) => {
    Event.find({}, function (err, content) {
        console.log(content);
        if (err) res.json({
            err: err
        });
        else res.json({content})
    })

});

//post create an event http://localhost:3100/event/create?token=xxxxxxx

router.post('/create', async (req, res, next) => {
    const errorCheck = [];
    let eventToCreate = req.body;
    let eventToCreateGameDetailsId = [];
    // TODO in the future, check agenda conflict
    // check if games within listGames exist
    if (req.body.listGames.length !== 0) {
        const listGamesPromise = await req.body.listGames.map(async (game, res,next ) =>
            GameDetails.findOne( {_id: game}, async function (err, result){
                if (!result){
                    errorCheck.push(game);
                }
                else {eventToCreateGameDetailsId.push(result._id)}
            } )

        );
        const resultGameDetails = await Promise.all(listGamesPromise);
    if (errorCheck.length === 0) {
        // put game id list with event to create
        eventToCreate.listGames = eventToCreateGameDetailsId;
        // TODO changer le localhost:3100 par url en production
        var me_req = unirest('GET', 'https://localhost:3100/users/me')
        .headers({
            'token': me_req.params.token
        })
        .end(function (res) { 
            if (res.error) throw new Error(res.error); 
            console.log(res);
            eventToCreate.owner = res.body._id //check le console log de res peut etre raw_body à la place de body
        });
        eventToCreate.owner = "5e78ab08122bd31750df8c90" ;
        // create event in bdd
        Event.create(eventToCreate, (err, content) => {
            if (err) res.json({err: err});
            else {
                if (content) {
                    res.json({content: content, msg: 'Event created successfully.'})
                } else {
                    res.json({err: 'Unable to create this event.'})
                }
            }
        })
    } else {
        res.json({error: 'the following games ' + errorCheck + ' do no exist.'});
    }
    } else {
        res.json({error: 'listGames is required.'})
    }
});



//--------------------------------------------------
//get events and return display list required field /gamedetails/quicksearch?date=xxxx&locationId=xxxx&listGames=xxxxx&limit=20&offset=xxxx&showEventFull=xxxx
router.get('/searchlist', async (req, res, next) => {
    let data= {};
    let query= {};
    let offset= 0;
    let limit = 0;
    let whatToSort= {};

    //search by event date and up to 7 days later
    if (req.query.date){
        let laterDate= new Date(moment(req.query.date).add(7,'days').format());
        let date = new Date( req.query.date);
        data['date'] = {
            $gte: new Date(date),
            $lt: new Date(laterDate)
        }
        console.log(data);
    }
    //search by localisation
    if (req.query.locationId){
        let toRegexp= req.query.locationId;
        data['locationId'] = new RegExp(".*"+toRegexp+".*",'i');
    }
    //search by game within list
    if (req.query.listGames){
        data['listGames']= { '$all': req.query.listGames.split(",")}
    }
    // return full event or not
    if (req.query.showEventFull){
        if (req.query.showEventFull===false){
            data['maxPlayers']= { '$ne': this.listPlayers.length};
        }
    }
    query= Event.find(data).populate('owner', 'username').populate('listGames', 'name').select('listGames date owner maxPlayers locationId listPlayers');


    //pagination handling

    if (req.query.limit) {
        limit = parseInt(req.query.limit);
        query = query.limit(limit)
    }
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
        query = query.skip(offset*limit)
    }

        query.exec(function (err, content){
            let data = [];
            for (let current=0; current < content.length; current++)
            {
                data.push({
                    listPlayers: content[current].listPlayers.length,
                    listGames: content[current].listGames,
                    maxPlayers: content[current].maxPlayers,
                    locationId: content[current].locationId,
                    owner: content[current].owner,
                    date: content[current].date
                });
                console.log(data);
            }
            res.send({content:data});
        });
});




//------------------------------------------------------------
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
        Event.findByIdAndDelete(req.params.id, (err, content) => {
            if (err) res.json({
                err: err
            });
            else
            if (content) {
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
