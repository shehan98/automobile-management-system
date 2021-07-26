const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    user_id:{
        type: String
    },
    firstName:{
        type: String
    },
    email: {
        type: String
    },
    paymentID:{
        type: String
    },
    address:{
        type: Object
    },
    method: {
        type: String
    },
    amount: {
        type: Number
    },
    image1: {
        type: Object
    },
    image2: {
        type: Object
    },
    vehicle: {
        type: Object,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Payments", paymentSchema)