
// Start database
var models = require('./models');

// Start the app
var app = require('./app');
var port = 3001;

// Create the server 
try {
    app.listen(port, () => {
        console.log("Server running on http://localhost:3001");
    })
}
catch (error) {
    console.log(errror);
}