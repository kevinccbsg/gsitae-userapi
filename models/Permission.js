const mongoose = require('mongoose');

const { Schema } = mongoose;

const permissionSchema = new Schema({
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
}, { versionKey: false, collection: 'permissions' });

const Permission = mongoose.model('Permissions', permissionSchema);

module.exports = Permission;
