const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Vehicles = require('../models/vehicleModel')

const paymentCtrl = {

    getOnePayment: async(req, res) =>{
        // try {
        //     const payments = await Payments.findById(req.payments.user_id)
        //     res.json(payments)
        // } catch (err) {
        //     return res.status(500).json({msg: err.message})
        // }
        try {
            const payments = await Payments.findOne({user_id: req.params.id})
                res.json(payments)
                console.log(payments)
                // payments.email = req.body.newemail
                // payments.save()
                // res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getPayment: async(req, res) =>{
        try {
            var sortType = {createdAt: -1}
            const payments = await Payments.find().sort(sortType)
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
            const {paymentID, address, amount, method, image1, image2} = req.body;
            const vehicle = req.body.selectedVehicle;
            const {_id, firstName, email} = user;

            const newPayment = new Payments({
                user_id: _id, firstName,  email, paymentID, address, amount, vehicle, method, image1, image2
            })

            await newPayment.save()
            res.json({newPayment})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createBankPayment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('firstName email')
            if(!user){
                return res.status(400).json({msg: "User does not exist"})
            }
            const {amount, image1, image2} = req.body;
            const {_id, firstName, email} = user;

            const newPayment = new Payments({
                user_id: _id, firstName, email, amount, image1, image2
            })

            await newPayment.save()
            res.json({newPayment})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

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

    deletePayment: async(req, res) => {
        const id = req.params.id;
    
        Payments.findOneAndRemove({ _id: id }, (error, data) => {
            if (error) {
                res.status(500).json({ 
                message: 'error deleting payment',
                error: error
                });
            } else if (!data) {
                res.status(404).json('no payment of such id exists')
            } else {
                res.status(200).json({ removed: data });    
            }
            })
        }
}

module.exports = paymentCtrl