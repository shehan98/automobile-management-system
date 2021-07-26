const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    customer: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    document1: {
        type: Object
    },
    document2: {
        type: Object
    },
    document3: {
        type: Object
    },
    document4: {
        type: Object
    },
    document5: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Notifications2', notificationSchema)