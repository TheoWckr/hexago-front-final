let async = require('async/waterfall');
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let express = require('express');
let router = express.Router();
let User = require('../models/users');
const auth = require("../middleware/auth");


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
  User.find({}, function (err, content) {
    console.log(content);
    if (err) res.json({
      err: err
    });
    else res.json({content})
  })

});

//post create a user
/**
 * @api {post} /users/create Request User information
 * @apiName Create User
 * @apiGroup User
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
router.post(
  "/signup",
  [
      check("username", "Please Enter a Valid Firstname").not().isEmpty(),
      check("firstname", "Please Enter a Valid Firstname").not().isEmpty(),
      check("lastname", "Please Enter a Valid Lastname").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({ min: 6 })
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({
              errors: errors.array()
          });
      }

      const {
          username,
          firstname,
          lastname,
          email,
          password
      } = req.body;
      try {
          let user = await User.findOne({
              email
          });
          if (user) {
              return res.status(400).json({
                  msg: "User Already Exists"
              });
          }

          user = new User({
              username,
              firstname,
              lastname,
              email,
              password
          });

          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);

          await user.save();

          const payload = {
              user: {
                  id: user.id
              }
          };

          jwt.sign(
              payload,
              "randomString", {
                  expiresIn: 10000
              },
              (err, token) => {
                  if (err) throw err;
                  res.status(200).json({
                      token
                  });
              }
          );
      } catch (err) {
          console.log(err.message);
          res.status(500).send("Error in Saving");
      }
  }
);


router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.patch("/update", 
  [
    check("username", "Please Enter a Valid Firstname").not().isEmpty(),
    check("firstname", "Please Enter a Valid Firstname").not().isEmpty(),
    check("lastname", "Please Enter a Valid Lastname").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 })
  ], auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);

    if (req.body.username) {
      user.username = req.body.username
    }

    if (req.body.firstname) {
      user.firstname = req.body.firstname
    }
    if (req.body.lastname) {
      user.lastname = req.body.lastname
    }

    if (req.body.email) {
      user.email = req.body.email
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();

    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        "randomString", {
            expiresIn: 10000
        },
        (err, token) => {
            if (err) throw err;
            res.status(200).json({
                token
            });
        }
    );
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});



//delete a user
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({
    err: 'Please provide an id param.'
  });
  else if (req.params.id.length !== 24)
    res.json({
      err: 'Please provide a valid id param.'
    });
  else
    User.findByIdAndDelete(req.params.id, (err, content) => {
      if (err) res.json({
        err: err
      });
      else
      if (content) {
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
});

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
