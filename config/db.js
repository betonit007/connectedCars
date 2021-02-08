const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
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