const express = require('express'); // imports express & gets a very simple express server running

const app = express(); // initialize our app variable w/ express

app.get('/', (req, res) => res.send('API Running'));
// creates a single endpoint "/" to test if our API works
// the user makes a get request to (go into) this page & we'll put in a callback function => res.send()
// which sends data to the browser

const PORT = process.env.PORT || 5000;
// this process.env.PORT will look for an environemtn variable called PORT to use & when we deploy to heroku
// that's where it's going to get that port number; in the case there's no env var set, listen on default 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // used a template literal