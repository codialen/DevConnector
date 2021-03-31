const mongoose = require('mongoose'); // we'll be using Mongoose to connect to mongoDB
const config = require('config'); // grab the string in default.json => this requires the config package => require
const db = config.get('mongoURI'); // get the string in a var called db & go to the config file & get the mongoURI value

// connect to mongoDB
// since mongoose.connect returns a promse, we'll put an await before it and pass in the (db) as a parameter

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected...'); // So we know that Mongoose is connected to MongoDB
    } catch(err) {
        console.error(err.message); // pass on the error which has a message property on it
        // Exit process with failure
        process.exit(1); // Then escape the process with a failure; basically makes the application fail
    }
}

module.exports = connectDB; // export connectDB function to use in the server.js