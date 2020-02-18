let async = require('async/waterfall')

let express = require('express')
let router = express.Router()
let Users = require('../models/users')

// let axios = require('axios')
// axios.defaults.baseURL = `${process.env.AUTH0_AUDIENCE}`

function handleError(err) {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {err: err.response.data}
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {err: err.request}
  } else {
    // Something happened in setting up the request that triggered an Error
    return {err: err.message}
  }
}

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

//get all user
router.get('/', (req, res, next) => {
  Users.find({}, function (err, result) {
    console.log(result)
    if (err) res.json({
      err: err
    })
    else res.json({result})
  })

})

//post create a user

router.post('/create', (req, res, next) => {
  Users.create(req.body, (err, user) => {
    if (err) res.json({err: err})
    else {
      if (user) {
        res.json({user: user, msg: 'User created successfully.'})
      } else {
        res.json({err: 'Unable to create this User.'})
      }
    }
  })
  })


module.exports = router
