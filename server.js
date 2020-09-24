const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

// we can now accept info from req.body and limit incoming file size to 5mb
app.use(express.json({ extended: false, limit: '5mb' })); 

// GOOGLE CLOUD DEPLOY
app.use(express.static(path.join(__dirname, "/client/build")))


//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));

//HEROKU DEPLOY
// if(process.env.NODE_ENV === 'production') {
//     //Set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
// }

//GOOGLE CLOUD DEPLOY PART 2
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Tim\dev\node\GoogleAPIs\secrets\creds.json" node secrets.js