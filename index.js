require('dotenv').config({ path: './phone-catalogue.env' })

// Start database
var models = require('./models');
// Start the app
var app = require('./app');
var port = process.env.SERVER_PORT;

// Create the server 
try {
    app.listen(port, () => {
        console.log("Server running on http://localhost:",port);
    })
}
catch (error) {
    console.log(errror);
}