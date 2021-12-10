const router = require('express').Router();
const controller = require('../controller/pickupController');
const { route } = require('./distanceRouter');


router.route('/')
    .get(controller.getAll)
router.route('/pick')
    .post(controller.pickup)
router.route('/accept/:id')
    .patch(controller.getOrder)

module.exports=router;