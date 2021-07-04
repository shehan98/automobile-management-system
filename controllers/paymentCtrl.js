const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Vehicles = require('../models/vehicleModel')

const paymentCtrl = {

    getPayment: async(req, res) =>{
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createPayment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('firstName email')
            if(!user){
                return res.status(400).json({msg: "User does not exist"})
            }
            const {paymentID, address} = req.body;
            const {_id, firstName, email} = user;

            const newPayment = new Payments({
                user_id: _id, firstName,  email, paymentID, address
            })

            await newPayment.save()
            console.log(newPayment)
            res.json({newPayment})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createBankPayment: async(req, res) => {
        console.log(req.body)
        try {
            const user = await Users.findById(req.user.id).select('firstName email')
            if(!user){
                return res.status(400).json({msg: "User does not exist"})
            }
            const {image1, image2} = req.body;
            const {_id, firstName, email} = user;

            const newPayment = new Payments({
                user_id: _id, firstName, email, image1, image2
            })

            await newPayment.save()
            console.log(newPayment)
            res.json({newPayment})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    /*
    addPayment: async (req, res) =>{
        try {
            const {method, amount, status, image1, image2, images} = req.body;
            

            const newPayment = new Payment({
                method, amount, status, image1, image2, images
            })

            await newPayment.save()

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    */

    paypal: async (req, res) =>{
        let transactionData = {};

        transactionData.user = {
            id: req.user._id
        }

        transactionData.data = req.body.paymentData;

        Users.findOneAndUpdate(
            {_id: req.user._id}
        )
    },
/*
    success: async (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.send('Success');
            }
        });
    },

    cancel: async (req, res) => {
        res.send('Cancelled')
    }

    */
}

module.exports = paymentCtrl