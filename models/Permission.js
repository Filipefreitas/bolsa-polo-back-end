const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;