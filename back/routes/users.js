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
/**
 * @api {post} /users/create Request User information
 * @apiName Create User
 * @apiGroup Users
 *
 * @apiParam {boolean} isActive User account is active or not
 * @apiParam {String} _id User unique ID
 * @apiParam {String} username User nickname for the service
 * @apiParam {String} firstName User first name
 * @apiParam {String} lastName User last name
 * @apiParam {String} password User's password
 * @apiParam {String} salt Password encryption key
 * @apiParam {String} email User email
 * @apiParam {date} dateCreation User account creation date
 * @apiParam {date} dateLastConnection User last connection to account date
 * @apiParam {date} dateOfBirth User date of birth
 * @apiParam {String} userProfileId Id which links to user profile table entry
 * @apiParam {String} roleId Id which determines what roles user has
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "user": {
        "isActive": true,
        "_id": "5e6654ecdb12dc2e340f7680",
        "username": "Pip",
        "phone": "000000000",
        "firstName": "bob",
        "lastName": "Bobby",
        "password": "baboulinet",
        "salt": "jjjj",
        "email": "bob@bob.fr",
        "dateCreation": "2020-03-09T14:37:56.192Z",
        "dateLastConnection": "2020-03-09T14:37:56.192Z",
        "userProfileId": 12345,
        "roleId": 123456,
        "birthdate": "2020-03-09T14:38:36.495Z",
        "createdAt": "2020-03-09T14:38:36.497Z",
        "updatedAt": "2020-03-09T14:38:36.497Z",
        "__v": 0
    },
    "msg": "User created successfully."
}
 */
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

//get a user
router.get('/:id', function (req, res, next) {
  if (!req.params.id) res.json({
    err: 'Please provide an id param.'
  })
  else {
    Users.findById(
        req.params.id, (err, user) => {
          if (err) res.json({
            err: err
          })
          else {
            if (user) {
              res.json({
                user
              })
            } else {
              res.json({
                err: 'No user found with this id.'
              })
            }
          }
        })
  }
})

//delete a user
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({
    err: 'Please provide an id param.'
  })
  else if (req.params.id.length !== 24)
    res.json({
      err: 'Please provide a valid id param.'
    })
  else
    Users.findByIdAndDelete(req.params.id, (err, user) => {
      if (err) res.json({
        err: err
      })
      else
      if (user) {
        res.json({
          _id: req.params.id,
          msg: 'User deleted successfully.'
        })
      } else {
        res.json({
          err: 'No user found with this id.'
        })
      }
    })
})

module.exports = router;