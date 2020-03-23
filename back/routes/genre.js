let async = require('async/waterfall')

let express = require('express')
let router = express.Router()
let genres = require('../models/genre')

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

//get all genre
router.get('/', (req, res, next) => {
    genres.find({}, function (err, result) {
      console.log(result)
      if (err) res.json({
        err: err
      })
      else res.json({result})
    })
  
  })
  
  //post create a genre
  /**
   * @api {post} /genres/create Request genre information
   * @apiName Create genre
   * @apiGroup genres
   * 
   * @apiParam {string} genre name
   *
   * @apiSuccessExample {json} Success-Response:
   * {
      "genre": {
          "gameGenreId": "5e6654ecdb12dc2e340f7680",
          "genre": "TEST"
      },
      "msg": "genre created successfully."
  }
   */
  router.post('/create', (req, res, next) => {
    genres.create(req.body, (err, genre) => {
      if (err) res.json({err: err})
      else {
        if (genre) {
          res.json({genre: genre, msg: 'genre created successfully.'})
        } else {
          res.json({err: 'Unable to create this genre.'})
        }
      }
    })
    })

    router.put('/:id', (req, res, next) => {
        genres.update(req.body, (err, genre) => {
          if (err) res.json({err: err})
          else {
            if (genre) {
              res.json({genre: genre, msg: 'genre updated successfully.'})
            } else {
              res.json({err: 'Unable to create this genre.'})
            }
          }
        })
    })
  
  //get a genre
  router.get('/:id', function (req, res, next) {
    if (!req.params.id) res.json({
      err: 'Please provide an id param.'
    })
    else {
      genres.findById(
          req.params.id, (err, genre) => {
            if (err) res.json({
              err: err
            })
            else {
              if (genre) {
                res.json({
                  genre
                })
              } else {
                res.json({
                  err: 'No genre found with this id.'
                })
              }
            }
          })
    }
  })
  
  //delete a genre
  router.delete('/:id', (req, res, next) => {
    if (!req.params.id) res.json({
      err: 'Please provide an id param.'
    })
    else if (req.params.id.length !== 24)
      res.json({
        err: 'Please provide a valid id param.'
      })
    else
      genres.findByIdAndDelete(req.params.id, (err, genre) => {
        if (err) res.json({
          err: err
        })
        else
        if (genre) {
          res.json({
            _id: req.params.id,
            msg: 'Genre deleted successfully.'
          })
        } else {
          res.json({
            err: 'No genre found with this id.'
          })
        }
      })
  })
  
  module.exports = router;