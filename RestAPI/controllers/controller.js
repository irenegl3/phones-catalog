// Import model
let Sequelize = require('sequelize');
var models = require('../models');

exports.getAllPhones = async function (req, res, next) {
    try {
        let phones = await models.Phone.findAll({
            order: [
                ['name', 'ASC'],
            ],
        });
       // console.log(JSON.stringify(phones));
        res.json(phones)
        //return phones;
    } catch (error) {
        console.log(error)
        return error;
    }
}