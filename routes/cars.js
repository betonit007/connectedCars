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
        fullDesc: '2019 Chevrelot Corvette 2D Coupe',
        stockNo: 1000017,
        year: 2019,
        make: 'Chevrolet',
        model: 'Corvette',
        color: 'Black',
        cylinder: 8,
        displacement: 7.0,
        mileage: 3200,
        bodyType: 'Coupe',
        secondDesc: 'A very nice Truck!',
        options: ['Leather', 'Automatic', 'cruise control', 'sunroof'],
        photos : [ 
            "https://www.cstatic-images.com/car-pictures/xl/usc90chc065a021001.png", 
            "https://www.priorityauto.com/assets/stock/colormatched/white/640/cc_2010hon011b_640/cc_2010hon011b_640_wh.jpg?height=400", 
            "https://www.vehiclehistory.com/evox_compressed/honda/pilot/2011/7132/honda-pilot-2011-159-7132-640.jpg"
        ]
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