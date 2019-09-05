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
        fullDesc: '2011 Honda Pilot Touring AWD',
        stockNo: 0000001,
        year: 2011,
        make: 'Honda',
        model: 'Pilot',
        color: 'White',
        cylinder: 6,
        mileage: 151000,
        bodyType: 'Medium SUV',
        secondDesc: 'A very nice suv!',
        options: ['leather', 'roof', 'wheels']
    })

    console.log(newCar);
    try {
        const newCarAdded = await newCar.save();
        res.json(newCarAdded);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})  

module.exports = router;