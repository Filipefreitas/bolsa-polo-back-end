const  mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
    cdRa: 
    {
        type: String
    },
    nmAluno: 
    { 
        type: String 
    },
    dsEspecialidade: 
    { 
        type: String
    },
    cdUnidade: 
    { 
        type: String
    },
    dsUnidade: 
    { 
        type: String
    },
    dsSituacaoAcademica: 
    { 
        type: String
    },
    studentVouchers:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Voucher'    
    }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;