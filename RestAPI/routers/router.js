let express = require('express');
let router = express.Router();

let controller = require('../controllers/controller')

router.get(`/`, async function (req, res, next) {
    let phones = await controller.getAllPhones();
    res.render('index', {
        phones: JSON.stringify(phones)
    });
});

router.get('/phones', controller.getAllPhones);
router.post('/phones', controller.configureMultiPartFormData, controller.updateOrCreatePhone)

// router.delete('/deletePhone', controller.deletePhone);

module.exports = router;