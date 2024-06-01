const mongoose = require('mongoose');
const { Schema } = mongoose;
require('./Permission');

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["admin", "approver", "partner"]
  },
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  }]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;