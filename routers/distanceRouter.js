const router = require('express').Router();
const controller = require('../controller/distanceController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');


router.route('/')
    .get(authentication, authorization(['user']),controller.getAll)
    // .get(controller.getDistance)
    .post(controller.post)

router.route('/v1')
    .get(controller.getDistance)


router.route('/:id')
    .patch(controller.patch);

module.exports = router