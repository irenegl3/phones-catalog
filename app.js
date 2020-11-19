let express = require('express');
let path = require('path');
let cors = require("cors");
require('dotenv').config({ path: './phone-catalogue.env' })

// Instantiate to create the server
let app = express();

// Import routes
let routes = require('./routers/router');


app.use(cors());
// Configure routes to path
app.use('/', routes);


// separate views
if (process.env.OPTION === "1") {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
}
else {
    console.log('2');
    // use react view
    app.use(express.static(path.join(__dirname, 'build')));
}


module.exports = app;