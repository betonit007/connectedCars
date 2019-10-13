const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // get connet info from global vars stored in default.json or productions.json
console.log(db);
const connectDB = async () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(() => console.log('Car Database Connected!'))
    .catch(err => {
        console.log(err.message);
        process.exit(1);
    })
}

module.exports = connectDB;