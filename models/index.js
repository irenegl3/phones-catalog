'use strict';

// Start the postgres database with ORM sequelize
let Sequelize = require('sequelize');
let sequelize;
sequelize = new Sequelize('postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':'+process.env.DB_PORT+'/' + process.env.POSTGRES_DB, {logging: false});
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
