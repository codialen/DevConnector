const express = require('express'); // imports express & gets a very simple express server running
const connectDB = require ('./config/db');

const app = express(); // initialize our app variable w/ express

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'));
// creates a single endpoint "/" to test if our API works
// the user makes a get request to (go into) this page & we'll put in a callback function => res.send()
// which sends data to the browser

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
// this process.env.PORT will look for an environemtn variable called PORT to use & when we deploy to heroku
// that's where it's going to get that port number; in the case there's no env var set, listen on default 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // used a template literal