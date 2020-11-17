let express = require('express');
let path = require('path');
let cors = require("cors");

// Instantiate to create the server
let app = express();

// Import routes
let routes = require('./routers/router');


app.use(cors());
// Configure routes to path
app.use('/',routes);

// use react view
app.use(express.static(path.join(__dirname, 'build')));

module.exports = app;