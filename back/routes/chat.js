let async = require('async/waterfall');

let express = require('express');
let router = express.Router();
let Chat = require('../models/chat');

router.post('/create', async (req, res) => {
    const chat = await Chat.find({userIdList: req.body.userIdList});
    if (chat != []) {
        return res.status(400).json({
            msg: "Chat Already Exists"
        });
    }
    Chat.create(req.body, (err, content) => {
        if (err) res.json({err: err});
        else {
            if (content) {
                res.json({content: content, msg: 'Chat created successfully.'})
            } else {
                res.json({err: 'Unable to create this chat.'})
            }
        }
    })
});

router.get('/', (req, res) => {
    Chat.find({}, function (err, content) {
        if (err) res.json({
            err: err
        });
        else res.json({content})
    })  
});

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({err: 'Please provide an id param.'})
        res.end()
    } else if (req.params.id.length !== 24) {
        res.status(422).send({err: 'Please provide a valid id param.'})
        res.end()
    }
    Chat.find({userIdList: {$in: [req.params.id]}}, function (err, content) {
        if (err) res.json({
            err: err
        });
        else res.json({content})
    })  
});




module.exports = router;
