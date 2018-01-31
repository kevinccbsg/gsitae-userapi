const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  redirect_uri: String,
}, { versionKey: false, collection: 'roles' });

const Roles = mongoose.model('Roles', roleSchema);

module.exports = Roles;
