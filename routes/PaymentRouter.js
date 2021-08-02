const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')

router.route('/payment')
    .get(paymentCtrl.getPayment)
    .post(auth, paymentCtrl.createPayment)

router.route('/onepayment/:id')
    .get(paymentCtrl.getOnePayment)

router.route('/bankpayment')
    .post(paymentCtrl.createBankPayment)


router.post('/payment/paypal', auth, paymentCtrl.paypal)

router.delete('/payment/:id', paymentCtrl.deletePayment);

module.exports = router