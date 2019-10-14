const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false })); // we can now accept info from req.body

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));

if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (res, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Dev Code Below
//app.get('/', (req, res) => res.json({msg: 'Welcome to Connected Cars'}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));