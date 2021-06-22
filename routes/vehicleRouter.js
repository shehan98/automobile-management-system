const router = require('express').Router()
const vehicleCtrl = require('../controllers/vehicleCtrl')

router.route('/vehicles')
    .get(vehicleCtrl.getVehicles)
    .post(vehicleCtrl.createVehicle)

router.route('/vehicles/:id')
    .delete(vehicleCtrl.deleteVehicle)
    .put(vehicleCtrl.updateVehicle)


module.exports = router