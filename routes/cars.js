const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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

module.exports = router;