const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth'); //bring in to verify token

const { check, validationResult } = require('express-validator');

const Car = require('../models/Car');

router.get('/', async (req, res) => {
    try {
        const allCars = await Car.find({}) 
        res.json(allCars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/', async (req, res) => {
     
    const { fullDesc, stockNo, year, make, model, color, cylinder, displacement, mileage, bodyType, secondDesc, options, photos} = req.body;
    
    
    const newCar = new Car({
        fullDesc,
        stockNo,
        year,
        make,
        model,
        color,
        cylinder,
        displacement,
        mileage,
        bodyType,
        secondDesc,
        options,
        photos 
    })

    try {
        const newCarAdded = await newCar.save();
        res.json(newCarAdded);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error, Unable to add car to inventory. Possibly a dupilicate stock number.');
    }
})  

router.put('/', async (req, res) => {   //PUT route since we're just updating the users saved cars

    try {
        
        let findCar = await Car.findById(req.body._id); // make sure that the car actually exists
        if(!findCar) return res.status(400).json({ msg: "car not found" });
        
        updatedCar = await Car.findByIdAndUpdate(req.body._id, 
            { photos: req.body.photos }, {new: true})// new:true sends back updated value
            res.json(updatedCar);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;