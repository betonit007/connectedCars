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
            expiresIn: 36000                                       // a secret must also be passed into sign (it can be whatever you want (store in config.get() from config npm))
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

router.put('/', auth, async (req, res) => {   //PUT route since we're just updating the users saved cars
    const { vehicleId, userId } = req.body
    try {
        
        let car = await Car.findById(vehicleId); // make sure that the car actually exists
        if(!car) return res.status(400).json({ msg: "car not found" });
        let saved = await User.findById(userId);
        if(saved.savedCars.includes(vehicleId)) return res.status(400).json({msg: "Car already exists in your inventory"}); //check to make sure its not already in customer inventory

        user = await User.findByIdAndUpdate(userId, 
            { "$push": { savedCars: vehicleId } }, {new: true})// new:true sends back updated value
            res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

    // @route    UPDATE api/users
    // @desc     Remove saved vehicle to inventory
    // @access   Private

    router.patch('/', auth, async (req, res) => {   //PATCH route since we're just removing car id from savedcars array
    const { vehicleId, userId } = req.body
    try {
        
        let saved = await User.findById(userId);
        if(!saved.savedCars.includes(vehicleId)) return res.status(400).json({msg: "Car does not exist in user inventory"}); //check to make sure car is in inventory

        user = await User.updateOne({_id: userId}, 
            { "$pullAll": { savedCars: [vehicleId] } }, {new: true})// new:true sends back updated value
            res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;
