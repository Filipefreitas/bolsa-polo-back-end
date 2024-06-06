const  mongoose = require("mongoose");
const { Schema } = mongoose;

const voucherSchema = new Schema({
    percDiscount: 
    {
        type: Number,
        required: true
    },
    status: 
    { 
        type: String, 
        default: 'available' 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    studentVouchers:
    {
        type: Schema.Types.ObjectId,
        ref: 'Student'    
    },
    requestedBy: {
        type: String
    },
    requestedAt: {
        type: Date
    },
    evaluatedBy: {
        type: String
    },
    evaluatedAt: {
        type: Date
    }
 
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;