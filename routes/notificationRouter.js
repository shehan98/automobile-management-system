const router = require("express").Router();
const notificationCtrl = require("../controllers/notificationCtrl")

router.post('/create', notificationCtrl.createNotification)

router.get('/getAll', notificationCtrl.getAllNotification)

router.post('/setStep', notificationCtrl.setStep)

router.get('/getStep', notificationCtrl.getStep)

router.get('/getStep/:id', notificationCtrl.getOneStep)

router.put('/updateStep/:id', notificationCtrl.updateStep)

module.exports = router