const mongoose = require('mongoose')

const notificationStepperSchema = new mongoose.Schema({
    customer: {
        type: String,
    },
    step: {
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('NotificationStepper', notificationStepperSchema)