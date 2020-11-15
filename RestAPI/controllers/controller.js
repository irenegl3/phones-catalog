// Import model
let Sequelize = require('sequelize');
var models = require('../models');
var Busboy = require('busboy');


const createNewPhone = async function (name, manufacturer, description, color, price, imageFileName, screen, processor, ram) {
    try {
        let res = {};
        let phone = await models.Phone.findOne({
            where: {
                name: name
            }
        });
        if (phone === null) {
            res = await models.Phone.create({
                name: name,
                manufacturer: manufacturer,
                description: description,
                color: color,
                price: parseInt(price),
                imageFileName: imageFileName,
                screen: screen,
                processor: processor,
                ram: parseInt(ram)
            })
        } else {
            res = null;
        }
        return res
    } catch (error) {
        throw error;
    }
}

const updatePhone = async function (phoneId, paramsToUpdate) {
    try {
        let res = await models.Phone.update(paramsToUpdate, {
            where: {
                id: phoneId
            },
            returning: true,
        });
        return res
    } catch (error) {
        throw error;
    }
}

exports.getAllPhones = async function (req, res, next) {
    try {
        let phones = await models.Phone.findAll({
            order: [
                ['name', 'ASC'],
            ],
        });
        res.json(phones)
    } catch (error) {
        console.log(error)
        return error;
    }
}

exports.configureMultiPartFormData = async function (req, res, next) {
    error = false;
    var busboy = new Busboy({
        headers: req.headers
    });

    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        req.body = JSON.parse(val);
    });
    busboy.on('finish', function () {
        if (error) {
            res.status(500).json({ error: error });
        }
        else {
            next()
        }
    });
    req.pipe(busboy);
}


exports.updateOrCreatePhone = async function (req, res, next) {
    try {
        let respuesta = {};
        if (req.body.phoneId === "") {
            respuesta = await createNewPhone(req.body.paramsToUpdate.name, req.body.paramsToUpdate.manufacturer, req.body.paramsToUpdate.description, req.body.paramsToUpdate.color, req.body.paramsToUpdate.price, req.body.paramsToUpdate.imageFileName, req.body.paramsToUpdate.screen, req.body.paramsToUpdate.processor, req.body.paramsToUpdate.ram);
        } else {
            respuesta = await updatePhone(req.body.phoneId, req.body.paramsToUpdate);
        }
        res.json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}