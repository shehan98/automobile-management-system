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
        type: String,
        trim:true
    },
    amount: {
        type: Number,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    image1:{
        type: Object
    },
    image2:{
        type: Object
    },
    images:{
        type: Object
    },
    data: {
        type: Array,
        default: []
    },
    vehicle: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Payments", paymentSchema)