const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator'); // now can use second parameter in route to verify info

const auth = require('../middleware/auth');
const User = require('../models/User');
const Car = require('../models/Car');

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post('/', [
    check('name', 'Please include name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
    ], 
    async (req, res) => {
      const errors = validationResult(req) // validationResult check for errors in req
      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() }) //method that will send an error of errors
      }
      
      const { name, email, password } = req.body;

      try {
          let user = await User.findOne({ email });  //check to see if username is already taken
          if(user) {
              
              return res.status(400).json({ msg: 'User already exists' });
          }

          user = new User({ //create new user in DB since above came back false
              name: name,
              email: email,
              password: password
          });
          
          const salt = await bcrypt.genSalt(10) //create salt (used to encrypt password with bcrypt) with method genSalt 10 is encryption level

          user.password = await bcrypt.hash(password, salt); //reassign user.password with bcrypt.hash to a hash version of password.

          await user.save(); // save incrypted user info to mongo db

          jwt.sign({ user: {id: user.id }}, config.get('jwtSecret'), { //pass in an object with user id to create webtoken with jsonwebtoken
            expiresIn: 360000                                         // a secret must also be passed into sign (it can be whatever you want (store in config.get() from config npm))
          }, (err, token) => {
              if (err) throw err;
              res.json({ token })
          })                                        
      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
    });


    // @route    PUT api/users
    // @desc     Add saved vehicle to inventory
    // @access   Private

router.put('/:id', auth, async (req, res) => {   //PUT route since we're just updating the users saved cars

    try {
        let car = await Car.findById(req.params.id); // make sure that the car actually exists
        console.log(car);
        if(!car) return res.status(400).json({ msg: "car not found" });
        let saved = await User.findById(req.user.id);
        if(saved.savedCars.includes(req.params.id)) return res.status(400).json({msg: "Car already exists in your inventory"}); //check to make sure its not already in customer inventory

        car = await User.findByIdAndUpdate(req.user.id, 
            { "$push": { savedCars: req.params.id } })//update fields with object that we created above (contactFields) lines: 60-65
            res.json(car);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    // Example Code from Study Buddy***********************************
    // handleQuestion=(currentId)=> {
    //     const sendIt = {
    //       question: this.state.question,
    //       answer: this.state.answer
    //     };
   
    //     API.saveQuestion(sendIt)
    //     .then(res=>API.updateUserQuestion(currentId, { "$push": {questions:res.data._id}}))
    //     .then(res=>API.getUser(this.context.currentId))
    //     .then(res=>this.setState({allQuestions:res.data.questions, answer:"", question:""}))
    //    }


})


module.exports = router;
