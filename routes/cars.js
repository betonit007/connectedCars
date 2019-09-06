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
    
    const newCar = new Car({
        fullDesc: '2008 Honda Accord EX V6 4D Sedan',
        stockNo: 0000002,
        year: 2008,
        make: 'Honda',
        model: 'Accord',
        color: 'Silver',
        cylinder: 6,
        displacement: 3.5,
        mileage: 141000,
        bodyType: '4d Sedan',
        secondDesc: 'A very nice car!',
        options: ['leather', 'roof', 'wheels']
    })

    console.log(newCar);
    try {
        const newCarAdded = await newCar.save();
        res.json(newCarAdded);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error, Unable to add car to inventory. Possibly a dupilicate stock number.');
    }
})  

module.exports = router;