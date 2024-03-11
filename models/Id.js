const mongoose = require('mongoose');

const idSchema = new mongoose.Schema({
  refModel: {
    type: String,
    required: true,
    enum: ['Enfants', 'Stuff']
  }
}, { discriminatorKey: 'refModel' });

module.exports = mongoose.model("Id", idSchema)