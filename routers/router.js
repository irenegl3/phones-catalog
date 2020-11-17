let express = require('express');
let router = express.Router();
const path = require('path');

let controller = require('../controllers/controller')

router.get(`/`, async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

router.get('/phones', controller.getAllPhones);
router.post('/phones', controller.configureMultiPartFormData, controller.updateOrCreatePhone)
router.delete('/phones/:id', controller.deletePhone);

module.exports = router;