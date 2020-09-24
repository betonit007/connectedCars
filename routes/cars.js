const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary')
const config = require('config');
const auth = require('../middleware/auth'); //bring in to verify token

const { check, validationResult } = require('express-validator');

const Car = require('../models/Car');

router.get('/', async (req, res) => {
    try {
        const allCars = await Car.find({}).sort('-stockNo') //sort by highest stock number first (newest cars)
        res.json(allCars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/', auth, async (req, res) => {
     
    const { fullDesc, stockNo, year, make, model, color, cylinder, displacement, mileage, bodyType, secondDesc, options, photos, trim} = req.body;
    

    
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
        photos,
        trim
    })

    try {
        const newCarAdded = await newCar.save();
        res.json(newCarAdded);
    } catch(err) {
        console.error(err.message);
        res.status(500).send(`Server Error, Unable to add car to inventory, ${err.message}`);
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

cloudinary.config({
    cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
    api_key: config.get("CLOUDINARY_API_KEY"),
    api_secret: config.get("CLOUDINARY_SECRET")
})

//upload endpoint
router.post('/uploadimages', auth, (req, res) => {
    cloudinary.uploader.upload(
        req.body.image,
        (result) => {
            res.send({
                //url: result.url,
                url: result.secure_url,
                public_id: result.public_id
            });
        },
        {
            public_id: `${Date.now()}`, // public name
            resource_type: 'auto' // JPEG, PNG
        }
    );
});

// remove image
router.post('/removeimage', auth, (req, res) => {
    let image_id = req.body.public_id
    console.log(image_id)
    cloudinary.uploader.destroy(image_id, (error, result) => {
        if (error) {
            console.log(error)
            res.json({ success: false, error })
        } else {
        res.json(result)
        }
    })
})

module.exports = router;