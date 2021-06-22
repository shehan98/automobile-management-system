const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    vehicle_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        trim: true,
        required: true
    },
    color:{
        type: String,
        trim: true,
        required: true
    },
    grade:{
        type: String,
        trim: true,
        required: true
    },
    gear:{
        type: String,
        trim: true,
        required: true
    },
    manu_yr:{
        type: Number,
        trim: true,
        required: true
    },
    origin_country:{
        type: String,
        trim: true,
        required: true
    },
    cylinder_cap:{
        type: Number,
        trim: true,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Vehicles", vehicleSchema)