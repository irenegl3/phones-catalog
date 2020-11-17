'use strict';

// Start the postgres database with ORM sequelize
let Sequelize = require('sequelize');
let sequelize;
sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/phoneCatalogue', {logging: false});

let Phone = require('./Phone')(sequelize, Sequelize);

(async () => {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log("Connected to the database")
        // extension unaccent
        try {
            await sequelize.query('CREATE EXTENSION unaccent;')
        } catch (error) {
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
})();

//exports models
exports.Phone = Phone;

exports.sequelize = sequelize;
