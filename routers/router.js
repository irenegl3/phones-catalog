let express = require('express');
let router = express.Router();
const path = require('path');
let controller = require('../controllers/controller')
require('dotenv').config({ path: '../phone-catalogue.env' })

router.get(`/`, async function (req, res, next) {
   if(process.env.OPTION === "1"){ res.render('index'); //server on
    } else {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
}
});

router.get('/phones', controller.getAllPhones);
router.post('/phones', controller.configureMultiPartFormData, controller.updateOrCreatePhone)
router.delete('/phones/:id', controller.deletePhone);

module.exports = router;