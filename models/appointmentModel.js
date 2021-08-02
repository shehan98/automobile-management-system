const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  email: { 
    type: String, 
    require: true 
  },
  name: { 
    type: String, 
    require: true 
  },
  nic: {
    type: String,
    require: true
  },
  tel: { 
    type: Number, 
    require: true 
  },
  slot: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'slot'
  }
}, { versionKey: false })

const appointmentModel = mongoose.model('appointment', appointmentSchema);

module.exports = appointmentModel;