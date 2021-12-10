const express = require('express');
const router = express.Router();

const ProvinceController = require('../controller/cekOngkir/provinces');
const CityController = require('../controller/cekOngkir/cities');
const CostController = require('../controller/cekOngkir/cost');

router.get('/province', ProvinceController.all_provinces);
router.get('/province/:id', ProvinceController.province);
router.get('/city/', CityController.all_cities);
router.get('/city/:id/', CityController.city);
router.get('/city/:id/province/:province', CityController.city);
router.post('/cost', CostController.cost);

module.exports = router;
