let express = require('express');
let path = require('path');
let cors = require("cors");

// Instantiate to create the server
let app = express();

 // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Import routes
let routes = require('./routers/router');


app.use(cors());
// Configure routes to path
app.use('/',routes);


module.exports = app;