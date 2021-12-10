const router = require('express').router();
const controller = require('../controllers/pickup');
const { route } = require('./provinces');

router.route('/').get(controller.getUser);
router.route('/:id').get(controller.getUserById);
router.route('/updateResi/:id').patch(controller.updateResi);
router.route('/deleteResi/:id').delete(controller.deleteResi);