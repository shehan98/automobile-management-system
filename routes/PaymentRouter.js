const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')

router.route('/payment')
    .get(paymentCtrl.getPayment)
    .post(auth, paymentCtrl.createPayment)

router.route('/bankpayment')
    .post(auth, paymentCtrl.createBankPayment)

//router.post('/payment', paymentCtrl.addPayment)

router.post('/payment/paypal', auth, paymentCtrl.paypal)

//router.get('/payment/paypal/sucess', auth, paymentCtrl.success)

//router.get('/payment/paypal/cancel', auth, paymentCtrl.cancel)

module.exports = router