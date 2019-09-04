const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false })); // we can now accept info from req.body

//Define Routes
app.use('/api/cars', require('./routes/cars'));

app.get('/', (req, res) => res.json({msg: 'Welcome to Connected Cars'}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));